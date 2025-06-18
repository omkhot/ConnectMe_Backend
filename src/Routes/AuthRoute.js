import express from "express";
import passport from "passport";
import {authUser, 
  createNewUserManually, 
  getCurrentUser, 
  isAuthenticated, 
  logOutUser, 
  manualLogin} from "../Controller/AuthController.js";
import { createNewUserServ } from "../Service/userServ.js";
import { JWT_SECRET } from "../Config/serverConfig.js";
import jwt from "jsonwebtoken";
import socialIdChecker from "../Middlewares/SocialIdChecker.js";

const authRouter = express.Router();

authRouter.get('/google', passport.authenticate('google', { 
    scope: ['profile', 'email']
})); 

authRouter.get('/google/callback',passport.authenticate('google', {
    session: false,
    failureRedirect: '/login'
}),authUser);

 

authRouter.post('/manualLogin', manualLogin);
authRouter.post('/manualSignup', createNewUserManually);

authRouter.post('/completeProfile', socialIdChecker, createNewUserServ);

authRouter.get('/user', getCurrentUser);


authRouter.get('/getTempUser', (req, res) => {
    const token = req.cookies.temp_token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return res.json(decoded);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
});

authRouter.get('/validate', isAuthenticated);

authRouter.get('/logout', logOutUser);

export default authRouter; 