import User from "../Schema/userSchema.js";
import Post from "../Schema/postsSchema.js";
import Comment from "../Schema/commentsSchema.js";
import InternalServerError from "../Utils/internalServerError.js";

async function createNewUserRepo(userDetails) {
    try {
        const user = await User.create(userDetails);
        console.log("User created successfully:", user);
        return user;
    }
    catch (error) {
        console.log("Error in createNewUserRepo:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

async function createNewUserManuallyRepo(userDetails){
    try {
        const user = await User.create(userDetails);
        console.log("User created succefully:", user); 
        return user;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}

async function getUserDetailsRepo(socialId) {
    try {
        const user = await User.findOne({ socialId }).populate("posts");
        return user;
    }
    catch (error) { 
        console.error("Error in getUserDetailsRepo:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

async function updateUserDetailsRepo(socialId, userDetails) { 
    console.log("repo of update hits");
    console.log("userDetails from repo:", userDetails);
    try {
        const user = await User.findOneAndUpdate({ socialId }, { $set: userDetails }, { new: true });
        return user;
    }
    catch (error) {
        console.error("Error in updateUserDetailsRepo:", error);
        throw new InternalServerError(); // Rethrow the error for further handling if needed
    }
}

async function deleteUserRepo(userId){
    const session = await User.startSession();
    session.startTransaction();
    try {

        // 0. Remove user from all posts
        await Post.updateMany(
            { likes: userId },
            { $pull: { likes: userId } },
            { session }
        );
        // 1. Delete user's posts
        await Post.deleteMany({ user: userId }).session(session);

        // 2. Delete user's comments
        await Comment.deleteMany({ user: userId }).session(session);

        await User.updateMany(
            { followers: userId },
            { $pull: { followers: userId } },
            { session }
        );

        await User.updateMany(
            { following: userId },
            { $pull: { following: userId } },
            { session }
        );

        await User.updateMany(
            { followRequests: userId },
            { $pull: { followRequests: userId } },
            { session }
        );

        await User.updateMany(
            { sentFollowRequests: userId },
            { $pull: { sentFollowRequests: userId } },
            { session }
        );

        // 3. Delete user's account
        await User.findByIdAndDelete(userId).session(session);
        await session.commitTransaction();
        await session.endSession();

        return {
            success: true,
            message: "User deleted successfully!"
        };
    }
    catch (error) {
        console.error("Error in deleteUserRepo:", error);
        throw new InternalServerError(); // Rethrow the error for further handling if needed
    }
}

export { 
    createNewUserRepo,
    getUserDetailsRepo,
    updateUserDetailsRepo,
    createNewUserManuallyRepo,
    deleteUserRepo
};