import { createNewChatService, getAllChatsService } from "../Service/ChatService.js";

async function creteNewChatController(req, res) {
    try {
        const chatDetails = req.body;
        console.log("Chat details:", chatDetails);
        const chat = await createNewChatService(chatDetails);
        return res.status(201).json({ 
            success: true,
            message: "Chat created successfully", 
            data: chat
        });
    } catch (error) {
        console.error("Error in creteNewChatController:", error);
        return res.status(error.statusCode).json({ 
            success: false,
            message: "Internal Server Error" 
        });
    }    
}
 
async function getAllChatsController(req, res) {
    try {
        const userId = req.params.userId;
        const chats = await getAllChatsService(userId);
        return res.status(200).json({ 
            success: true,
            data: chats
        });
    } catch (error) {
        console.error("Error in getAllChatsController:", error);
        return res.status(error.statusCode).json({ 
            success: false,
            message: "Internal Server Error" 
        });
    }
}

export { 
    creteNewChatController,
    getAllChatsController
};