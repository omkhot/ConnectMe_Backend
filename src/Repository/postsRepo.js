import Post from "../Schema/postsSchema.js";
import User from "../Schema/userSchema.js";
import InternalServerError from "../Utils/internalServerError.js";

async function createNewPostRepo(postDetails) {
    try {
        const post = await Post.create(postDetails);
        // Now also update the user schema:
        await User.findOneAndUpdate({ _id: postDetails.user }, { $addToSet: { posts: post._id } });
        return post;
    }
    catch (error) {
        console.error("Error in createNewPostRepo:", error);
        throw new InternalServerError(); // Rethrow the error for further handling if needed
    }
} 

async function getPostDetailsRepo(postId) {
    try {
        const post = await Post.findById(postId).populate("user")
        return post;
    }
    catch (error) {
        console.error("Error in getPostDetailsRepo:", error);
        throw new InternalServerError(); // Rethrow the error for further handling if needed
    }
}

async function updatePostDetailsRepo(postId, postDetails) {
    try {
        const post = await Post.findOneAndUpdate({ _id: postId }, { $set: postDetails }, { new: true });
        return post;
    }
    catch (error) {
        console.error("Error in updatePostDetailsRepo:", error);
        throw new InternalServerError(); // Rethrow the error for further handling if needed
    }
}

async function deletePostDetailsRepo(postId, userId) {
    try {
        const post = await Post.findByIdAndDelete(postId);
        // Now also update the user schema:
        await User.findOneAndUpdate({ _id: userId }, { $pull: { posts: postId } });
        return post;
    }
    catch (error) {
        console.error("Error in deletePostDetailsRepo:", error);
        throw new InternalServerError(); // Rethrow the error for further handling if needed
    }
}

async function like_unlike_PostRepo(postId, userId) {

    // Now check if the user has already liked the post or not:
    const post = await Post.findById(postId);
    if (post.likes.includes(userId)) {
        // Already liked, so remove like:
        try {
            const updated_post = await Post.findOneAndUpdate({ _id: postId }, { $pull: { likes: userId } }, { new: true });
            return updated_post;            
        } catch (error) {
            console.error("Error in unlike the post:", error);
            throw new InternalServerError();
        }        
    }
    else {
        // Not liked, so add like:
        try {
            const post = await Post.findOneAndUpdate({ _id: postId }, { $addToSet: { likes: userId } }, { new: true });
            return post;
        }
        catch (error) {
            console.error("Error in likePostRepo:", error);
            throw new InternalServerError(); // Rethrow the error for further handling if needed
        }
    }
    
}

async function getAllLikesRepo(postId) {
    try {
        const post = await Post.findById(postId).populate("likes","socialId profileImage");
        return post;
    }
    catch (error) {
        console.error("Error in getAllLikesRepo:", error);
        throw new InternalServerError(); // Rethrow the error for further handling if needed
    }
}

async function getAllPostsOfUserRepo(userId) {
    try {
        const user = await User.findById(userId).populate("posts");
        return user;
    }
    catch (error) {
        console.error("Error in getAllPostsOfUserRepo:", error);
        throw new InternalServerError(); // Rethrow the error for further handling if needed
    }
}

async function getAllRelatedPostsOfUserRepo(userId) {
    try {
        const user = await User.findById(userId).populate("following","_id").lean();
        const followingIds = user.following.map(f => f._id);
        // Now get all the posts of the following users:
        const posts = await Post.find({ user: { $in: followingIds } }).populate("user","socialId profileImage").sort({ createdAt: -1 }).lean();
        return posts;
    } catch (error) {
        console.error("Error in getAllRelatedPostsOfUserRepo:", error);
        throw new InternalServerError();
    }
}

async function getAllLikedPostsOfUserRepo(userId) {
    try {
        const posts = await Post.find({ likes: { $in: userId }}).populate("user","socialId profileImage").sort({ createdAt: -1 }).lean();
        return posts;
    } catch (error) {
        console.error("Error in getAllLikedPostsOfUserRepo:", error);
        throw new InternalServerError();
    }
}


async function bookMarkThePostRepo(postId, userId) {

    const post = await Post.findById(postId);
    if (post.bookMarkedBy.includes(userId)) {
        // Already bookmarked, so remove bookmark:
        try {
            const updated_post = await Post.findOneAndUpdate({ _id: postId }, { $pull: { bookMarkedBy: userId } }, { new: true });
            return updated_post;            
        } catch (error) {
            console.error("Error in unlike the post:", error);
            throw new InternalServerError();
        }        
    }
    else{
        try {
            const res = await Post.findOneAndUpdate({ _id: postId }, { $addToSet: { bookMarkedBy: userId } }, { new: true });
            return res;
        } catch (error) {
            console.error("Error in bookMarkThePostRepo:", error);
            throw new InternalServerError();
        }
    }
    
}

async function getAllSavedPostsOfUserRepo(userId) {
    try {
        const posts = await Post.find({ bookMarkedBy: { $in: userId }}).populate("user","socialId profileImage").sort({ createdAt: -1 }).lean();
        return posts;
    } catch (error) {
        console.error("Error in getAllSavedPostsOfUserRepo:", error);
        throw new InternalServerError();
    }
}

export { 
    getPostDetailsRepo, 
    createNewPostRepo,
    updatePostDetailsRepo,
    deletePostDetailsRepo,
    like_unlike_PostRepo,
    getAllLikesRepo,
    getAllPostsOfUserRepo,
    getAllRelatedPostsOfUserRepo,
    getAllLikedPostsOfUserRepo,
    bookMarkThePostRepo,
    getAllSavedPostsOfUserRepo
};