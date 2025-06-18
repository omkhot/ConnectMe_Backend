import { 
    createNewCommentRepo, 
    deleteCommentDetailsRepo, 
    getAllCommentsRepo, 
    getAllCommnetsByUserRepo} from "../Repository/commentsRepo.js";

async function createNewCommentServ(commentDetails) {
    try {
        const comment = await createNewCommentRepo(commentDetails);
        return comment;
    }
    catch (error) {
        console.error("Error in createNewCommentServ:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

async function getAllCommentsServ(postId) {
    try {
        const comments = await getAllCommentsRepo(postId);
        return comments;
    }
    catch (error) {
        console.error("Error in getAllCommentsServ:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

async function deleteCommentDetailsServ(commentId) {
    try {
        const comment = await deleteCommentDetailsRepo(commentId);
        return comment;
    }
    catch (error) {
        console.error("Error in deleteCommentDetailsServ:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

async function getAllCommnetsByUserServ(userId) {
    try {
        const comments = await getAllCommnetsByUserRepo(userId);
        return comments;
    }
    catch (error) {
        console.error("Error in getAllCommnetsByUserServ:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

export {
    createNewCommentServ,
    getAllCommentsServ,
    deleteCommentDetailsServ,
    getAllCommnetsByUserServ
}