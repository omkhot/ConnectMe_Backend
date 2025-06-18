import express from "express";
import { 
    bookMarkPostController,
    createNewPostController, 
    deletePostDetailsController, 
    getAllLikedPostsOfUserController, 
    getAllLikesController, 
    getAllPostsOfUserController, 
    getAllRelatedPostsOfUSerController, 
    getAllSavedPostOfUserController, 
    getPostDetailsController, 
    like_unlike_PostController, 
    updatePostDetailsController
} from "../Controller/postsController.js";
import { uploadPostImages } from "../Middlewares/multerMiddleware.js";

const postsRouter = express.Router();

postsRouter.post('/create',uploadPostImages, createNewPostController);
postsRouter.get('/details/:postId', getPostDetailsController);
postsRouter.put('/details/:postId', updatePostDetailsController);
postsRouter.delete('/:postId', deletePostDetailsController);
postsRouter.put('/likes_unlikes/:postId', like_unlike_PostController);
postsRouter.get('/likes_unlikes/:postId', getAllLikesController);
postsRouter.get('/all/:userId', getAllPostsOfUserController);


postsRouter.get('/all/liked/:userId', getAllLikedPostsOfUserController);
postsRouter.get('/all/related/:userId', getAllRelatedPostsOfUSerController);

postsRouter.put('/bookmark', bookMarkPostController);
postsRouter.get('/bookMarked/:userId', getAllSavedPostOfUserController);

export default postsRouter;      