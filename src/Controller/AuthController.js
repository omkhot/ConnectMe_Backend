import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../Config/serverConfig.js';
import User from '../Schema/userSchema.js';
import { manualLoginServ } from '../Service/AuthService.js';

async function authUser(req, res) {
    try {
        console.log("This is auth user and req is:", req.user);
        const { isNewUser, user, tempUser } = req.user;

        if (isNewUser) {
            // Redirect to React with temp user info for signup step
            const tempToken = jwt.sign(tempUser, JWT_SECRET, { expiresIn: '15m' });

            res.cookie('temp_token', tempToken, {
                httpOnly: true,
                sameSite: "None", // or "None" with HTTPS
                secure: true,   // set to true in production
                maxAge: 15 * 60 * 1000,
            });

            // Redirect to React page — React will read from the cookie
            return res.redirect("https://connect-me-frontend-6srt.vercel.app/completeProfile");

        }

         // Returning user → create JWT + set cookie
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "None",
            secure: true, // Set to true in production with HTTPS
        });

        return res.redirect("https://connect-me-frontend-6srt.vercel.app/home");

    } catch (error) {
        console.error("Error during authentication:", error);
        return res.status(500).json({  
            message: "Internal server error" 
        });        
    }
}

async function getCurrentUser(req, res) {
    try {
        const token = req.cookies.token;
        const tempToken = req.cookies.temp_token;

        if (tempToken && !token) {
            const decoded = jwt.verify(tempToken, JWT_SECRET);
            return res.status(200).json({
                message: "This is temp user",
                success: true,
                data: decoded
            })
        }
        
        if (!token) return res.status(401).json({ 
            message: "Not authenticated"  
        });

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded token:", decoded); 
        
        const user = await User.findById(decoded.id);

        if(user){
            console.log("Current user is:", user);
        }

        

        if (!user) return res.status(404).json({ 
            message: "User not found" 
        });

        return res.status(200).json({ 
            success: true,
            data: user
        });
    } catch (error) {
        console.error("Error during getting current user:", error);
        return res.status(500).json({ 
            success: false,
            message: "Internal server error" 
        });
    }
}

async function manualLogin(req, res) {
    console.log("login user controller hits with req body", req.body); 

    try {
        const response = await manualLoginServ(req.body);
        console.log("Response token is:", response.token);
        res.cookie("token", response.token, { 
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge : 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        return res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        console.log("Error in login user controller", error);
        return res.status(error.statusCode).json({ 
            success: false,
            error: error.message 
        });
    }
}

async function createNewUserManually(req,res){

    const userdetails = {
        firstName : req.body.firstName,
        email : req.body.email,
        password: req.body.password
    }

    // First check if the user with email already exists:
    const existingUser = await User.findOne({ email: userdetails.email });
    if (existingUser) return res.status(400).json({ 
        success: false,
        message: "User with this email Id already exists" 
    });

    const tempToken = jwt.sign(userdetails, JWT_SECRET, { expiresIn: '15m' });

    res.cookie('temp_token', tempToken, {
        httpOnly: true,
        sameSite: "Lax", // or "None" with HTTPS
        secure: false,   // set to true in production
        maxAge: 15 * 60 * 1000,
    });

    // Redirect to React page — React will read from the cookie
    return res.status(200).json({
        success: true,
        tempUser: userdetails
    });
}

async function isAuthenticated(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ 
            success: false,
            message: "Not authenticated" 
        });
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ 
            success: false,
            message: "User not found" 
        });
        return res.status(200).json({ 
            success: true,
            message: "Authenticated",
            data: user 
        });
    } catch (error) {
        console.error("Error during authentication:", error);
        return res.status(500).json({ 
            message: "Internal server error" 
        });
    }
}

async function logOutUser(req, res) {
    try {
        res.clearCookie("token");
        return res.status(200).json({ 
            success: true,
            message: "Logout successful" 
        });
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({ 
            success: false,
            message: "Internal server error" 
        });
    }
}

export {authUser , 
    isAuthenticated, 
    getCurrentUser, 
    manualLogin, 
    createNewUserManually,
    logOutUser
};