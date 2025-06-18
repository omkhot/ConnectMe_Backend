import { 
    acceptFollowRequestServ,
    deleteFollowRequestServ,
    getAllFollowersServ,
    getAllFollowingServ,
    getAllFollowRequestsServ,
    getAllSentFollowReqServ,
    sendNewFollowRequestServ,
    suggestUsersServ,
    UnfollowUserServ,

} from "../Service/followReqServ.js";

async function sendNewFollowReqController(req, res) {
    try {
        const { senderId, receiverId } = req.body;
        const followRequest = await sendNewFollowRequestServ(senderId, receiverId);
        return res.status(200).json({
            success: true,
            data: followRequest
        });
    }
    catch (error) {
        console.error("Error in sendNewFollowReqController:", error);
        return res.status(error.statusCode).json({ 
            success: false, 
            error: error.message
        });
    }
}

async function acceptFollowReqController(req, res) {
    console.log("accept follow req controller hits", req.body);
    try {
        const { senderId, receiverId } = req.body;
        const followRequest = await acceptFollowRequestServ(senderId, receiverId);
        return res.status(200).json({
            success: true,
            data: followRequest
        });
    }
    catch (error) {
        console.error("Error in acceptFollowReqController:", error);
        return res.status(error.statusCode).json({ 
            success: false, 
            error: "Internal server error" 
        });
    }
}

async function deleteFollowReqController(req, res) {
    try {
        const { senderId, receiverId } = req.body;
        const followRequest = await deleteFollowRequestServ(senderId, receiverId);
        return res.status(200).json({
            success: true,
            data: followRequest
        });
    }
    catch (error) {
        console.error("Error in deleteFollowReqController:", error);
        return res.status(error.statusCode).json({ 
            success: false, 
            error: "Internal server error" 
        });
    }
}

async function getAllFollowRequestsController(req, res) {
    try {
        const receiverId = req.params.userId;
        const followRequests = await getAllFollowRequestsServ(receiverId);
        return res.status(200).json({
            success: true,
            data: followRequests
        });
    }
    catch (error) {
        console.error("Error in getAllFollowRequestsController:", error);
        return res.status(error.statusCode).json({ 
            success: false, 
            error: "Internal server error" 
        });
    }
}

async function getAllSentFollowReqController(req, res) {
    try {
        const receiverId = req.params.userId;
        const sentFollowRequests = await getAllSentFollowReqServ(receiverId);
        return res.status(200).json({
            success: true,
            data: sentFollowRequests
        });
    }
    catch (error) {
        console.error("Error in getAllSentFollowReqController:", error);
        return res.status(error.statusCode).json({ 
            success: false, 
            error: "Internal server error" 
        });
    }
}

async function getAllFollowersController(req, res) {
    try {
        const receiverId = req.params.userId;
        const followers = await getAllFollowersServ(receiverId);
        return res.status(200).json({
            success: true,
            data: followers
        }); 
    }
    catch (error) {
        console.error("Error in getAllFollowersController:", error);
        return res.status(error.statusCode).json({ 
            success: false, 
            error: "Internal server error" 
        });
    }
}

async function getAllFollowingController(req, res) {
    try {
        const receiverId = req.params.userId;
        const following = await getAllFollowingServ(receiverId);
        return res.status(200).json({
            success: true,
            data: following
        });
    }
    catch (error) {
        console.error("Error in getAllFollowingController:", error);
        return res.status(error.statusCode).json({ 
            success: false, 
            error: "Internal server error" 
        });
    }
}

async function suggestUsersController(req, res){
    console.log("suggest users controller hits", req.params.userId);
    try {
        const result = await suggestUsersServ(req.params.userId);
        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        console.error("Error in suggestUsersController:", error);
        return res.status(error.statusCode).json({ 
            success: false, 
            error: error.message
        });
    }
}

async function UnFollowUserController(req, res) {
    console.log("Unfollow controller hits,", req.body);

    try {
        const result = await UnfollowUserServ(req.body.userId, req.body.unfollowUserId);
        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        console.error("Error in UnFollowUserController:", error);
        return res.status(error.statusCode).json({ 
            success: false, 
            error: error.message
        });
    }    
}



export { 
    sendNewFollowReqController, 
    acceptFollowReqController, 
    deleteFollowReqController, 
    getAllFollowRequestsController, 
    getAllSentFollowReqController,
    getAllFollowersController,
    getAllFollowingController,
    suggestUsersController,
    UnFollowUserController
};