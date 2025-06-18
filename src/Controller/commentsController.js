import { 
    createNewCommentServ, 
    deleteCommentDetailsServ, 
    getAllCommentsServ,
    getAllCommnetsByUserServ
} from "../Service/commentsService.js";

async function createNewCommetentController(req, res) {
    try {
        const comment = await createNewCommentServ(req.body);
        res.status(201).json({
            success: true,
            data: comment
        });
    }
    catch (error) {
        console.error("Error in createNewCommentController:", error);
        res.status(error.statusCode).json({ 
            success: false,
            message: error.message
        });
    }
}

async function getAllCommentsController(req, res) {
    try {
        const comments = await getAllCommentsServ(req.params.postId);
        res.status(200).json({
            success: true,
            data: comments
        });
    }
    catch (error) {
        console.error("Error in getAllCommentsController:", error);
        res.status(error.statusCode).json({ 
            success: false,
            message: error.message
        });
    }
}

async function deleteCommentController(req, res) {
    try {
        const comment = await deleteCommentDetailsServ(req.params.commentId);
        res.status(200).json({
            success: true,
            data: comment
        });
    }
    catch (error) {
        console.error("Error in deleteCommentController:", error);
        res.status(error.statusCode).json({ 
            success: false,
            message: error.message
        });
    }
}

async function getAllCommentsOfUserController(req, res) {
    console.log("getAllCommentsOfUserController is called with req.params.userId:", req.params.userId);
    try {
        const comments = await getAllCommnetsByUserServ(req.params.userId);
        res.status(200).json({
            success: true,
            data: comments
        });
    }
    catch (error) {
        console.error("Error in getAllCommentsOfUserController:", error);
        res.status(error.statusCode).json({ 
            success: false,
            message: error.message
        });
    }
}

export { 
    createNewCommetentController, 
    getAllCommentsController, 
    deleteCommentController,
    getAllCommentsOfUserController
};
