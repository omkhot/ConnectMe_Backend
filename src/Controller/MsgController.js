import { createNewMsgService, getAllMessagesService } from "../Service/MsgService.js";

async function createNewMsgController(req, res) {
    console.log("createNewMsgController his with body: ", req.body);
    try {
        const messageDetails = req.body;
        const message = await createNewMsgService(messageDetails);
        return res.status(201).json({ 
            success: true, 
            data: message 
        });
    } catch (error) {
        console.error("Error in createNewMsgController:", error);
        return res.status(error.statusCode).json({ 
            success: false, 
            error: error.message
        });
    }
}

async function getAllMessagesController(req, res) {
    const chatId = req.params.chatId;
    try {
        const messages = await getAllMessagesService(chatId);
        return res.status(200).json({ 
            success: true, 
            data: messages 
        });
    } catch (error) {
        console.error("Error in getAllMessagesController:", error);
        return res.status(error.statusCode).json({ 
            success: false, 
            error: error.message
        });
    }
}


export { 
    createNewMsgController,
    getAllMessagesController
}