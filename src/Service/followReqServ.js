import { 
    acceptFollowRequestRepo, 
    deleteFollowRequestRepo, 
    getAllFollowersRepo, 
    getAllFollowingRepo, 
    getAllFollowRequestsRepo, 
    getAllSentFollowRequestsRepo, 
    sendFollowRequestRepo, 
    suggestUsersRepo,
    UnfollowUser} from "../Repository/followReqReop.js";

async function sendNewFollowRequestServ(senderId, receiverId) {
    try {
        const followRequest = await sendFollowRequestRepo(senderId, receiverId);
        return followRequest;
    }
    catch (error) {
        console.error("Error in createNewFollowRequestServ:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

async function acceptFollowRequestServ(senderId, receiverId) {
    try {
        const followRequest = await acceptFollowRequestRepo(senderId, receiverId);
        return followRequest;
    }
    catch (error) {
        console.error("Error in acceptFollowRequestServ:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

async function deleteFollowRequestServ(senderId, receiverId) {
    try {
        const followRequest = await deleteFollowRequestRepo(senderId, receiverId);
        return followRequest;
    }
    catch (error) {
        console.error("Error in deleteFollowRequestServ:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

async function getAllFollowRequestsServ(receiverId) {
    try {
        const followRequests = await getAllFollowRequestsRepo(receiverId);
        return followRequests;
    }
    catch (error) {
        console.error("Error in getAllFollowRequestsServ:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

async function getAllSentFollowReqServ(receiverId) {
    try {
        const sentFollowRequests = await getAllSentFollowRequestsRepo(receiverId);
        return sentFollowRequests;
    }
    catch (error) {
        console.error("Error in getAllSentFollowReqServ:", error);
    }
}

async function getAllFollowingServ(receiverId) {
    try {
        const following = await getAllFollowingRepo(receiverId);
        return following;
    }
    catch (error) {
        console.error("Error in getAllFollowingServ:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

async function getAllFollowersServ(receiverId) {
    try {
        const followers = await getAllFollowersRepo(receiverId);
        return followers;
    }
    catch (error) {
        console.error("Error in getAllFollowersServ:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

async function suggestUsersServ(userId){
    try {
        const suggestions = await suggestUsersRepo(userId);
        return suggestions;
    }
    catch (error) {
        console.error("Error in getSuggestionsServ:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

async function UnfollowUserServ(userId, unfollowId) {
    try {
        const unfollowUser = await UnfollowUser(userId, unfollowId);
        return unfollowUser;
    }
    catch (error) {
        console.error("Error in unfollowUserServ:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

export { 
    sendNewFollowRequestServ,
    acceptFollowRequestServ,
    deleteFollowRequestServ,
    getAllFollowRequestsServ,
    getAllSentFollowReqServ,
    getAllFollowingServ,
    getAllFollowersServ,
    suggestUsersServ,
    UnfollowUserServ
};