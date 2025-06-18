import cloudinary from "../Config/cloudinaryConfig.js";
import { 
    bookMarkThePostRepo,
    createNewPostRepo, 
    deletePostDetailsRepo, 
    getAllLikedPostsOfUserRepo, 
    getAllLikesRepo, 
    getAllPostsOfUserRepo, 
    getAllRelatedPostsOfUserRepo, 
    getAllSavedPostsOfUserRepo, 
    getPostDetailsRepo, 
    like_unlike_PostRepo, 
    updatePostDetailsRepo } from "../Repository/postsRepo.js";
import cleanObject from "../Utils/cleanObject.js";
import InternalServerError from "../Utils/internalServerError.js";
import fs from 'fs/promises';

async function createNewPostServ(postDetails) {

    // Images will come compolsory so upload all of them on cloudinary:
    try {
        for(let i = 0; i < postDetails.postImages.length; i++){
            var result = await cloudinary.uploader.upload(postDetails.postImages[i]);
            var resultLink = result.secure_url;
            await fs.unlink(process.cwd() + '/' + postDetails.postImages[i]);
            postDetails.postImages[i] = resultLink;            
        }
        
    } catch (error) {
        console.error("Error in createNewPostServ from cloudinary:", error);
        throw new InternalServerError();
    }

    console.log("postDetails from service:", postDetails);
    try { 
        const post = await createNewPostRepo(postDetails);
        return post;
    }
    catch (error) {
        console.error("Error in createNewPostServ:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}


async function getPostDetailsServ(postId) {
    try {
        const post = await getPostDetailsRepo(postId);
        return post;
    }
    catch (error) {
        // console.error("Error in getPostDetailsServ:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}


async function updatePostDetailsServ(postId, postDetails) {

    // For update only caption will come as if img has to change then user has to delete the post and create one!
    // so remove undefined fields:
    postDetails = cleanObject(postDetails);
    console.log("Postdetails from service:", postDetails);

    try {
        const post = await updatePostDetailsRepo(postId, postDetails);
        return post;
    }
    catch (error) {
        console.error("Error in updatePostDetailsServ:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

async function deletePostDetailsServ(postId, userId) {
    try {
        const post = await deletePostDetailsRepo(postId, userId);
        return post;
    }
    catch (error) {
        console.error("Error in deletePostDetailsServ:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

async function like_unlike_PostServ(postId, userId) {
    try {
        const post = await like_unlike_PostRepo(postId, userId);
        return post;
    }
    catch (error) {
        console.error("Error in likePostServ:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

async function getAllLikesServ(postId) {
    try {
        const post = await getAllLikesRepo(postId);
        return post;
    }
    catch (error) {
        console.error("Error in getAllLikesServ:", error);
    }
}

async function getAllPostsOfUserServ(userId) {
    try {
        const user = await getAllPostsOfUserRepo(userId);
        return user;
    }
    catch (error) {
        console.error("Error in getAllPostsOfUserServ:", error);
    }
}


async function getAllRelatedPostsOfUserServ(userId) {
    try {
        const res = await getAllRelatedPostsOfUserRepo(userId);
        return res;
    } catch (error) {
        console.error("Error in getAllRelatedPostsOfUserServ:", error);
        throw error;
    }
}

async function getAllLikedPostsOfUserServ(userId) {
    try {
        const res = await getAllLikedPostsOfUserRepo(userId);
        return res;
    } catch (error) {
        console.error("Error in getAllLikedPostsOfUserServ:", error);
        throw error;
    }
}

async function bookMarkPostServ(postId, userId) {
    try {
        const res = await bookMarkThePostRepo(postId, userId);
        return res;
    } catch (error) {
        console.error("Error in bookMarkPostServ:", error);
        throw error;
    }
}

async function getAllSavedPostsOfUserServ(userId) {
    try {
        const res = await getAllSavedPostsOfUserRepo(userId);
        return res;
    } catch (error) {
        console.error("Error in getAllSavedPostsOfUserServ:", error);
        throw error;
    }
}

export { 
    createNewPostServ,
    getPostDetailsServ,
    updatePostDetailsServ,
    deletePostDetailsServ,
    like_unlike_PostServ,
    getAllLikesServ,
    getAllPostsOfUserServ,
    getAllRelatedPostsOfUserServ,
    getAllLikedPostsOfUserServ,
    bookMarkPostServ,
    getAllSavedPostsOfUserServ
};