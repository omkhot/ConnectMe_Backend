import mongoose from "mongoose";
import User from "../Schema/userSchema.js";
import ConflictError from "../Utils/conflictError.js";
import InternalServerError from "../Utils/internalServerError.js";
import { io } from "../index.js";

async function sendFollowRequestRepo(senderId, receiverId) {

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if(sender.following.includes(receiverId)){
        throw new ConflictError("You are already following this user!");
    }

    if(receiver.accountType === 'public'){
        await acceptFollowRequestRepo(senderId, receiverId);
        return {
            message: "Follow request accepted successfully!"
        };
    }

    // If account type is private, then send follow request:
    try {
        const senderUser = await  User.findOneAndUpdate({ _id: senderId }, { $addToSet: { sentFollowRequests: receiverId } }, { new: true });
        const receiverUser = await User.findOneAndUpdate({ _id: receiverId }, { $addToSet: { followRequests: senderId } }, { new: true });  
        
        io.to(receiverId.toString()).emit("newFollowRequest", receiverUser);
        io.to(senderId.toString()).emit("newFollowRequest", senderUser);
        return {
            message: "Follow request sent successfully!"
        }
    }
    catch (error) {
        console.error("Error in sendFollowRequestRepo:", error);
        if(error instanceof ConflictError){
            throw error;
        }
        else throw new InternalServerError(); // Rethrow the error for further handling if needed
    }
}

async function acceptFollowRequestRepo(senderId, receiverId) {

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    try {
        await sender.updateOne({ $pull: { sentFollowRequests: receiverId } });
        await receiver.updateOne({ $pull: { followRequests: senderId } });
        const receiverUser = await User.findOneAndUpdate({ _id: receiverId }, { $addToSet: { followers: senderId } }, { new: true }); // Update receiver's following list({ $addToSet: { followers: senderId } });
        const senderUser = await User.findOneAndUpdate({ _id: senderId }, { $addToSet: { following: receiverId } }, { new: true }); // Update sender's following list{ $addToSet: { following: receiverId } });

        io.to(receiverId.toString()).emit("newFollowRequest", receiverUser);
        io.to(senderId.toString()).emit("newFollowRequest", senderUser);

        return {
            success: true,            
            message: "Follow request accepted successfully!"
        }
    }
    catch (error) {
        console.error("Error in acceptFollowRequestRepo:", error);
        throw new InternalServerError(); 
    }
}

async function deleteFollowRequestRepo(senderId, receiverId) {

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    try {
        const receiverUser = await User.findOneAndUpdate({ _id: receiverId }, { $pull: { followRequests: senderId } }, { new: true }); // Update receiver's following list({ $addToSet: { followers: senderId } });
        const senderUser = await User.findOneAndUpdate({ _id: senderId }, { $pull: { sentFollowRequests: receiverId } }, { new: true }); // Update sender's following list{ $addToSet: { following: receiverId } });

        io.to(receiverId.toString()).emit("newFollowRequest", receiverUser);
        io.to(senderId.toString()).emit("newFollowRequest", senderUser);

        return {
            success: true,
            message: "Follow request deleted successfully!"
        }
    }
    catch (error) {
        console.error("Error in deleteFollowRequestRepo:", error);
        throw new InternalServerError(); 
    }
}

async function getAllFollowRequestsRepo(receiverId) {
    try {
        const user = await User.findById(receiverId).populate("followRequests","socialId profileImage firstName lastName");
        return user;
    } 
    catch (error) {
        console.error("Error in getAllFollowRequestsRepo:", error);
        throw new InternalServerError(); // Rethrow the error for further handling if needed
    }
}

async function getAllSentFollowRequestsRepo(receiverId) {
    try {
        const user = await User.findById(receiverId).populate("sentFollowRequests","socialId profileImage firstName lastName");
        return user;
    }
    catch (error) {
        console.error("Error in getAllSentFollowRequestsRepo:", error);
        throw new InternalServerError(); // Rethrow the error for further handling if needed
    }
}

async function getAllFollowersRepo(receiverId) {
    try {
        const user = await User.findById(receiverId).populate("followers","socialId profileImage");
        return user;
    }
    catch (error) {
        console.error("Error in getAllFollowersRepo:", error);
        throw new InternalServerError(); // Rethrow the error for further handling if needed
    }
}

async function getAllFollowingRepo(receiverId) {
    try {
        const user = await User.findById(receiverId).populate("following","socialId profileImage");
        return user;
    }
    catch (error) {
        console.error("Error in getAllFollowingRepo:", error);
        throw new InternalServerError(); // Rethrow the error for further handling if needed
    }
}

async function UnfollowUser(requester, other){
    try {
        const reqUser = await User.findOneAndUpdate({ _id: requester }, { $pull: { following: other } }, { new: true });
        const otherUser = await User.findOneAndUpdate({ _id: other }, { $pull: { followers: requester } }, { new: true });
        io.to(requester.toString()).emit("newFollowRequest", reqUser);
        io.to(other.toString()).emit("newFollowRequest", otherUser);
        return {
            success: true,
            message: "Unfollowed successfully!"
        }
    } catch (error) {
        console.error("Error in UnfollowUser:", error);
        throw new InternalServerError();
    }
}


async function suggestUsersRepo(userId) {
    try {
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Get current user with followers & following
        const currentUser = await User.findById(userObjectId).select('followers following');

        const followingSet = new Set(currentUser.following.map(id => id.toString()));
        const followersSet = new Set(currentUser.followers.map(id => id.toString()));

        // Set to avoid suggesting duplicates
        const suggestedSet = new Set();
        const suggestions = [];

        // 1️⃣ FOLLOW-BACK: users who follow you but you haven't followed yet
        const notFollowedBackIds = currentUser.followers.filter(
            id => !followingSet.has(id.toString())
        );

        if (notFollowedBackIds.length > 0) {
            const followBackUsers = await User.find({
                _id: { $in: notFollowedBackIds }
            }).select('_id firstName lastName profileImage socialId');

            for (const user of followBackUsers) {
                if (!suggestedSet.has(user._id.toString()) && suggestions.length < 5) {
                    suggestions.push(user);
                    suggestedSet.add(user._id.toString());
                }
            }
        }

        // 2️⃣ MUTUAL CONNECTIONS: users followed by people you follow
        if (suggestions.length < 5 && followingSet.size > 0) {
            const mutuals = await User.aggregate([
                { $match: { _id: { $in: Array.from(followingSet, id => new mongoose.Types.ObjectId(id)) } } },
                { $unwind: "$following" },
                {
                    $group: {
                        _id: "$following",
                        count: { $sum: 1 }
                    }
                },
                {
                    $match: {
                        _id: {
                            $nin: [
                                ...Array.from(followingSet, id => new mongoose.Types.ObjectId(id)),
                                userObjectId,
                                ...Array.from(suggestedSet, id => new mongoose.Types.ObjectId(id))
                            ]
                        }
                    }
                },
                { $sort: { count: -1 } },
                { $limit: 10 },
                {
                    $lookup: {
                        from: "users",
                        localField: "_id",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                { $unwind: "$user" },
                {
                    $project: {
                        _id: "$user._id",
                        firstName: "$user.firstName",
                        lastName: "$user.lastName",
                        profileImage: "$user.profileImage",
                        socialId: "$user.socialId"
                    }
                }
            ]);

            for (const user of mutuals) {
                if (!suggestedSet.has(user._id.toString()) && suggestions.length < 5) {
                    suggestions.push(user);
                    suggestedSet.add(user._id.toString());
                }
            }
        }

        // 3️⃣ POPULAR USERS: fallback
        if (suggestions.length < 5) {
            const populars = await User.aggregate([
                {
                    $match: {
                        _id: {
                            $nin: [
                                userObjectId,
                                ...Array.from(followingSet, id => new mongoose.Types.ObjectId(id)),
                                ...Array.from(suggestedSet, id => new mongoose.Types.ObjectId(id))
                            ]
                        }
                    }
                },
                {
                    $addFields: {
                        followerCount: { $size: "$followers" }
                    }
                },
                { $sort: { followerCount: -1 } },
                { $limit: 10 },
                {
                    $project: {
                        _id: 1,
                        firstName: 1,
                        lastName: 1,
                        profileImage: 1,
                        socialId: 1
                    }
                }
            ]);

            for (const user of populars) {
                if (!suggestedSet.has(user._id.toString()) && suggestions.length < 5) {
                    suggestions.push(user);
                    suggestedSet.add(user._id.toString());
                }
            }
        }

        return suggestions;

    } catch (error) {
        console.error("❌ Error in suggestUsersRepo:", error);
        throw new Error("Internal Server Error");
    }
}



export {
    sendFollowRequestRepo,
    acceptFollowRequestRepo,
    deleteFollowRequestRepo,
    getAllFollowRequestsRepo,
    getAllSentFollowRequestsRepo,
    getAllFollowersRepo,
    getAllFollowingRepo,
    suggestUsersRepo,
    UnfollowUser
}