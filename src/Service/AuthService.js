import { JWT_SECRET } from "../Config/serverConfig.js";
import User from "../Schema/userSchema.js";
import BadRequestError from "../Utils/badReqError.js";
import NotFoundError from "../Utils/notFoundError.js";
import InternalServerError from "../Utils/internalServerError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function manualLoginServ(userCredentials) {
    console.log("userCredentials from service:", userCredentials);

    const user = await User.findOne({email: userCredentials.email});
    console.log("user from db:", user);
    // if(!user) {
    //     console.log("User not found");
    //     throw new NotFoundError([userCredentials.email], "user");
    // }

    try {
        const isPasswordValid = await bcrypt.compare(userCredentials.password, user.password);
        console.log("isPasswordValid:", isPasswordValid);
        if(!isPasswordValid) {
            console.log("Invalid password");
            throw new BadRequestError(["password"]);
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: '1d',
        });
        return {
            token,
            user 
        }
    } catch (error) {
        console.error("Error during manual login:", error);
        if(error instanceof BadRequestError) throw error;
        throw new InternalServerError();
    }
}

export { manualLoginServ };