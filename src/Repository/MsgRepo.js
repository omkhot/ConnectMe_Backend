import { io } from "../index.js";
import Message from "../Schema/MessageSchema.js";
import InternalServerError from "../Utils/internalServerError.js";

async function createNewmessageRepo(messageDetails) {
    try {
        const message = await Message.create(messageDetails);
        const createdMessage = await Message.findById(message._id)
            .populate("sender", "firstName lastName profileImage socialId")
            .populate("receiver", "firstName lastName profileImage socialId");
        
        io.to(messageDetails.receiver).emit("newMsg", createdMessage);
        io.to(messageDetails.sender).emit("newMsg", createdMessage);

        return createdMessage;
    } catch (error) {
        console.error("Error in createNewmessageRepo:", error);
        throw new InternalServerError();
    }
}

async function getAllMessagesRepo(chatId) {
    try {
        const messages = await Message.find({ chatId })
            .populate("sender", "firstName lastName profileImage socialId")
            .populate("receiver", "firstName lastName profileImage socialId");
        return messages;
    } catch (error) {
        console.error("Error in getAllMessagesRepo:", error);
        throw new InternalServerError();
    }
}

export {
    createNewmessageRepo,
    getAllMessagesRepo
}