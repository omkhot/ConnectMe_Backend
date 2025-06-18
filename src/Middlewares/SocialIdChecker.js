import User from "../Schema/userSchema.js";

async function socialIdChecker(req, res, next) {

    console.log("socialIdChecker middleware hit with req body:", req.body);

    const { socialId } = req.body;
    if (!socialId) {
        return res.status(400).json({ 
            message: "socialId is required" 
        }); 
    }
    else {
        const existing = await User.findOne({ socialId });
        if (existing) {
            console.log("User with this socialId already exists");
            return res.status(409).json({ 
                success: false,
                error: "UserAlreadyExists", 
                message: "User with this socialId already exists" 
            });
        }
    }
    
    next(); 
}

export default socialIdChecker; 