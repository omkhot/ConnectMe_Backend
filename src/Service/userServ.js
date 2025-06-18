import jwt from 'jsonwebtoken';
import User from '../Schema/userSchema.js';
import { createNewUserManuallyRepo, createNewUserRepo, deleteUserRepo, getUserDetailsRepo, updateUserDetailsRepo } from '../Repository/userRepo.js';
import { JWT_SECRET } from '../Config/serverConfig.js';
import cleanObject from '../Utils/cleanObject.js';
import cloudinary from '../Config/cloudinaryConfig.js';
import InternalServerError from '../Utils/internalServerError.js';
import fs from 'fs/promises';

async function createNewUserServ(req, res) {
  try {
    console.log("🔥 createNewUserServ hit with:", req.body);

    const { googleId, email, firstName, lastName, profileImage, socialId, password } = req.body;

    // ✅ Create the user
    const newUser = await createNewUserRepo({
      googleId,
      email,
      firstName,
      lastName,
      profileImage,
      socialId,
      password,
    });

    // ✅ Generate login token
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "7d" });

    // ✅ Set cookie with proper flags
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // ❗Set to true in production (requires HTTPS)
      sameSite: "Lax", // Lax works for localhost redirects
    });

    console.log("✅ Token set in cookie, redirecting to frontend home");
    return res.status(201).json({
        success: true,
        message: "User created successfully",
    });
  } catch (error) {
    console.error("❌ Error in createNewUserServ:", error);

    // If the error is something else (e.g., DB crash)
    return res.redirect(`http://localhost:5173/completeProfile?error=InternalServerError`);
  }
}


async function createNewUserManullyServ(userDetails){
   try {
      const newUser = await createNewUserManuallyRepo(userDetails);
      return newUser;
   } catch (error) {
     console.log(error);
     throw error;
   }
} 

async function getUserDetailsServ(socialId){
    try{
      const user = await getUserDetailsRepo(socialId);
      return user;
    }
    catch(error){
      console.error(error);
      throw error;
    }
}

async function updateUserDetailsServ(socialId, userDetails){

    console.log("userDetails from service:", userDetails);
  
    // Remove all undefined fields
    userDetails = cleanObject(userDetails);

    // if profile image is provided then update it on cloudinary:
    if(userDetails.profileImage){
      try {
        var result = await cloudinary.uploader.upload(userDetails.profileImage);
        var resultLink = result.secure_url;        
        await fs.unlink(process.cwd() + '/' + userDetails.profileImage);
        userDetails.profileImage = resultLink;
      } catch (error) {
        console.error("Error in updateUserDetailsServ from cloudinary:", error);
        throw new InternalServerError();
      }
    }

    try {      
      const user = await updateUserDetailsRepo(socialId, userDetails);
      return user;
    } 
    catch (error) {
      throw error;
    }
}

async function deleteUserServ(userId){
    try {
        const result = await deleteUserRepo(userId);
        return result;
    } catch (error) {
       throw error;
    }
}


export { 
  getUserDetailsServ,
  createNewUserServ,
  updateUserDetailsServ,
  createNewUserManullyServ,
  deleteUserServ
};