import Chat from "../Schema/ChatSchema.js";
import InternalServerError from "../Utils/internalServerError.js";

async function createNewChatRepo(chatDetails) {
    try {
        const chat = await Chat.create({
            members: chatDetails
        });
        return chat;
    }
    catch (error) {
        console.error("Error in createNewChatRepo:", error);
        throw new InternalServerError();
    }
}

async function getChatRepo(user1Id, user2Id) {
    try {
        const chat = await Chat.findOne({
            members: { $all: [user1Id, user2Id] }
        }).populate("members", "firstName lastName profileImage socialId");
        return chat;
    }
    catch (error) {
        console.error("Error in getChatRepo:", error);
        throw new InternalServerError();
    }
}

async function getAllChatsRepo(userId) {
    try {
        const chats = await Chat.find({ members: userId }).populate("members", "firstName lastName profileImage socialId");
        return chats;
    }
    catch (error) {
        console.error("Error in getAllChatsRepo:", error);
        throw new InternalServerError();
    }
}

export { 
    createNewChatRepo,
    getAllChatsRepo,
    getChatRepo
};