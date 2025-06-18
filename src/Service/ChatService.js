import { createNewChatRepo, getAllChatsRepo, getChatRepo } from "../Repository/ChatsRepo.js";
import InternalServerError from "../Utils/internalServerError.js";

async function createNewChatService(chatDetails) {

    // Check if the chat already exists
    const user1Id = chatDetails[0];
    const user2Id = chatDetails[1];

    try {
        const existingChat = await getChatRepo(user1Id, user2Id);
        if (existingChat) {
            return existingChat;
        }
    } catch (error) {
        console.error("Error in createNewChatService:", error);
        throw new InternalServerError();        
    }

    try {
        const chat = await createNewChatRepo(chatDetails);
        return chat;
    }
    catch (error) {
        console.error("Error in createNewChatService:", error);
        throw new InternalServerError();
    }
}

async function getAllChatsService(userId) {
    try {
        const chats = await getAllChatsRepo(userId);
        return chats;
    }
    catch (error) {
        console.error("Error in getAllChatsService:", error);
        throw new InternalServerError();
    }
}

export {
    createNewChatService,
    getAllChatsService
}

