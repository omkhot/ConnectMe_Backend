import { createNewmessageRepo, getAllMessagesRepo } from "../Repository/MsgRepo.js";

async function createNewMsgService(messageDetails) {
    try {
        const message = await createNewmessageRepo(messageDetails);
        return message;
    } catch (error) {
        console.error("Error in createNewMsgService:", error);
        throw error;
    }
}

async function getAllMessagesService(chatId) {
    try {
        const messages = await getAllMessagesRepo(chatId);
        return messages;
    } catch (error) {
        console.error("Error in getAllMessagesService:", error);
        throw error;
    }
}

export { 
    createNewMsgService,
    getAllMessagesService
};