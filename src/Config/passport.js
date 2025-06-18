import passport from "passport";
import GoogleStrategy from 'passport-google-oauth20';
import User from "../Schema/userSchema.js";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET } from "./serverConfig.js";
import jwt from "jsonwebtoken";

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "https://connect-me-frontend-6srt.vercel.app/auth/google/callback",
        }, 
    async (accessToken, refreshToken, profile, done) => {

        try{
            // Check if user already exists by googleId
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                // Existing user → let client know
                return done(null, {
                    isNewUser: false,
                    user: existingUser,
                });
            }

            // If user doesn't exist, create temperory user
            return done(null, {
                isNewUser: true,
                tempUser: {
                  googleId: profile.id,
                  email: profile.emails[0].value,
                  firstName: profile.name.givenName,
                  lastName: profile.name.familyName,
                  profileImage: profile.photos[0].value,
                },
            });
        }   
        catch (error) {
            console.error("Error during Google authentication:", error);
            return done(error, null);
        }
}));