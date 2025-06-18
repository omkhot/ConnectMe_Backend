import { 
    createNewStoryServ, 
    deleteStoryServ, 
    fetchAllStoriesServ, 
    viewStoriesServ } from "../Service/storiesServ.js";

async function createNewStoryController(req, res) {

    const storyMedia = req.files?.map(file => file.path);
    const storyDetails = {
        user : req.body.userId,
        media : storyMedia,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
    }

    try {
        const story = await createNewStoryServ(storyDetails);
        return res.status(201).json({
            success: true,
            data: story
        });
    }
    catch (error) {
        console.error("Error in createNewStoryController:", error);
        return res.status(error.statusCode).json({ 
            success: false,
            error: error.message
        });         
    }
}

async function viewStoryController(req, res) {
    try {
        const story = await viewStoriesServ(req.body.storyId, req.body.userId);
        return res.status(201).json({
            success: true,
            data: story
        });
    }
    catch (error) {
        console.error("Error in createNewStoryController:", error);
        return res.status(error.statusCode).json({ 
            success: false,
            error: error.message
        });             
    }
}

async function deleteStoryController(req, res) {
    try {
        const story = await deleteStoryServ(req.params.storyId);
        return res.status(201).json({
            success: true,
            data: story
        });
    }
    catch (error) {
        console.error("Error in createNewStoryController:", error);
        return res.status(error.statusCode).json({ 
            success: false,
            error: error.message
        });            
    }
}

async function fetchAllStoriesController(req, res) {
    try {
        const stories = await fetchAllStoriesServ(req.params.userId);
        return res.status(200).json({
            success: true,
            data: stories
        });
    }
    catch (error) {
        console.error("Error in createNewStoryController:", error);
        return res.status(error.statusCode).json({ 
            success: false,
            error: error.message
        });            
    }
}
 
export { 
    createNewStoryController, 
    viewStoryController, 
    deleteStoryController, 
    fetchAllStoriesController 
};