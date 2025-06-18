import express from "express";
import { 
    acceptFollowReqController,
    deleteFollowReqController,
    getAllFollowersController,
    getAllFollowingController,
    getAllFollowRequestsController,
    getAllSentFollowReqController,
    sendNewFollowReqController,
    suggestUsersController,
    UnFollowUserController,

} from "../Controller/followReqController.js";

const followRequestRouter = express.Router();

followRequestRouter.post('/send', sendNewFollowReqController);
followRequestRouter.put('/accept', acceptFollowReqController);
followRequestRouter.delete('/delete', deleteFollowReqController);

followRequestRouter.post('/unFollow', UnFollowUserController);

followRequestRouter.get('/all/requests/:userId', getAllFollowRequestsController);
followRequestRouter.get('/all/sentRequests/:userId', getAllSentFollowReqController);

followRequestRouter.get('/all/followers/:userId', getAllFollowersController);
followRequestRouter.get('/all/following/:userId', getAllFollowingController);

followRequestRouter.get('/suggest/:userId', suggestUsersController);

export default followRequestRouter;