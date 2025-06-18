import express from "express";
import { deleteUserController, getUserDetailsController, updateUserDetailsController } from "../Controller/userController.js";
import uploader from "../Middlewares/multerMiddleware.js";

const userRouter = express.Router();

userRouter.get('/details/:socialId', getUserDetailsController);
userRouter.put('/details/:socialId', uploader.single('profileImage'), updateUserDetailsController);

userRouter.delete('/delete/:userId', deleteUserController);

export default userRouter;