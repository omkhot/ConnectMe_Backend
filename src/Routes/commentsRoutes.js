import express from "express";
import { 
    createNewCommetentController, 
    deleteCommentController, 
    getAllCommentsController,
    getAllCommentsOfUserController
} from "../Controller/commentsController.js";

const commentsRouter = express.Router();

commentsRouter.post('/create', createNewCommetentController);
commentsRouter.get('/:postId', getAllCommentsController);
commentsRouter.delete('/:commentId', deleteCommentController);

commentsRouter.get('/user/all/:userId', getAllCommentsOfUserController);

export default commentsRouter;