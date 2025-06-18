import Comment from "../Schema/commentsSchema.js";
import Post from "../Schema/postsSchema.js";
import InternalServerError from "../Utils/internalServerError.js";

async function createNewCommentRepo(commentDetails) {
    try {
        const comment = await Comment.create(commentDetails);
        // Now also update the post schema:
        const updatedPost = await Post.findOneAndUpdate({ _id: commentDetails.post }, { $addToSet: { comments: comment._id } }, { new: true });
        return {comment, updatedPost};
    }
    catch (error) {
        console.error("Error in createNewCommentRepo:", error);
        throw new InternalServerError(); // Rethrow the error for further handling if needed
    }
}

async function getAllCommentsRepo(postId) {
    try {
        const comments = await Comment.find({ post: postId }).populate("user","socialId profileImage").sort({ createdAt: -1 });
        return comments;
    } 
    catch (error) {
        console.error("Error in getAllCommentsRepo:", error);
        throw new InternalServerError(); // Rethrow the error for further handling if needed
    }
}

async function deleteCommentDetailsRepo(commentId) {
    try {
        const comment = await Comment.findByIdAndDelete(commentId);
        // Now also update the post schema:
        const updated_post = await Post.findOneAndUpdate({ _id: comment.post }, { $pull: { comments: comment._id } });
        return updated_post;
    }
    catch (error) {
        console.error("Error in deleteCommentDetailsRepo:", error);
        throw new InternalServerError(); // Rethrow the error for further handling if needed
    }
}

async function getAllCommnetsByUserRepo(userId) {
    try {
        const comments = await Comment
        .find({ user: userId })
        .populate("post")
        .sort({ createdAt: -1 });
        return comments;
    } 
    catch (error) {
        console.error("Error in getAllCommnetsByUserRepo:", error);
        throw new InternalServerError(); // Rethrow the error for further handling if needed
    }
}

export {
    createNewCommentRepo,
    deleteCommentDetailsRepo,
    getAllCommentsRepo,
    getAllCommnetsByUserRepo
    
}

