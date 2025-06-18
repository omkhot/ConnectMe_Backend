import cloudinary from "../Config/cloudinaryConfig.js";
import { 
    createNewStoryRepo, 
    deleteStoryRepo, 
    fetchAllStoriesRepo, 
    viewStoriesRepo } from "../Repository/storiesRepo.js";
import InternalServerError from "../Utils/internalServerError.js";
import fs from 'fs/promises';

async function createNewStoryServ(storyDetails) {

    console.log("storyDetails from service:", storyDetails);

    // Images or videos will come compolsory so upload all of them on cloudinary:
    try {
        for(let i = 0; i < storyDetails.media.length; i++){
            var result = await cloudinary.uploader.upload(storyDetails.media[i]);
            var resultLink = result.secure_url;
            await fs.unlink(process.cwd() + '/' + storyDetails.media[i]);
            storyDetails.media[i] = resultLink;            
        }
    } catch (error) {
        console.error("Error in createNewStoryServ from cloudinary:", error);
        throw new InternalServerError();
    }
 
    try {
        const story = await createNewStoryRepo(storyDetails);
        return story;
    }
    catch (error) {
        console.error("Error in createNewStoryServ:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

async function viewStoriesServ(storyId, userId) {
    try {
        const story = await viewStoriesRepo(storyId, userId);
        return story;
    }
    catch (error) {
        console.error("Error in viewStoriesServ:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

async function deleteStoryServ(storyId) {
    try {
        const story = await deleteStoryRepo(storyId);
        return story;
    }
    catch (error) {
        console.error("Error in deleteStoryServ:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

async function fetchAllStoriesServ(userId) {
    try {
        const stories = await fetchAllStoriesRepo(userId);
        return stories;
    }
    catch (error) {
        console.error("Error in fetchAllStoriesServ:", error);
        throw error; // Rethrow the error for further handling if needed        
    }
}

export { createNewStoryServ, viewStoriesServ, deleteStoryServ, fetchAllStoriesServ };