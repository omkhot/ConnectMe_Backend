import User from "../Schema/userSchema.js";
import InternalServerError from "../Utils/internalServerError.js";

async function searchUserRepo(userDetailsQuery){
    try {
        if(!userDetailsQuery){
            return null;
        }

        // Now first check the exact match of the userDetailsQuery:
        let user = await User.find(
            {$text: {$search: userDetailsQuery}},
            {score: {$meta: "textScore"}}
        )
        .sort({score: {$meta: "textScore"}})
        .limit(10)
        .lean() 
        .select("socialId firstName lastName profileImage");       

        // If exact match not found then check for partial match:
        if(user.length === 0){
            user = await User.find(
                {$text: {$search: userDetailsQuery}},
                {score: {$meta: "textScore"}}
            )
            .sort({score: {$meta: "textScore"}})
            .limit(10)
            .lean()
            .select("socialId firstName lastName profileImage");            
        }

        return user;

    } catch (error) {
        console.error("Error in searchUserRepo:", error);
        throw new InternalServerError();
    }
}

export { searchUserRepo };