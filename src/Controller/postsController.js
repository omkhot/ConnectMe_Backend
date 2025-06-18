import { 
    bookMarkPostServ,
    createNewPostServ, 
    deletePostDetailsServ, 
    getAllLikedPostsOfUserServ, 
    getAllLikesServ, 
    getAllPostsOfUserServ, 
    getAllRelatedPostsOfUserServ, 
    getAllSavedPostsOfUserServ, 
    getPostDetailsServ, 
    like_unlike_PostServ, 
    updatePostDetailsServ } from "../Service/postsService.js";

async function createNewPostController(req, res) {
    const postImages = req.files?.map(file => file.path); 
    const postDetails = {
        caption: req.body?.caption || "",
        user: req.body._id, 
        postImages
    }
    try {
        const result = await createNewPostServ(postDetails);
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Error in createNewPostController:", error);
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        })
    }
}

async function getPostDetailsController(req, res) {
    console.log("req.params.postId: for postdetails is: ", req.params.postId);
    try {
        const result = await getPostDetailsServ(req.params.postId);
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Error in getPostDetailsController:", error);
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        })
    }
}

async function updatePostDetailsController(req, res) {
    const postId = req.params.postId;
    const postDetails = req.body;
    try {
        const result = await updatePostDetailsServ(postId, postDetails);
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Error in updatePostDetailsController:", error);
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        })
    }   
}

async function deletePostDetailsController(req, res) {
    console.log("req.params.postId: for postdetails is: ", req.params.postId, req.body);
    const postId = req.params.postId;
    const userId = req.body.userId;
    try {
        const result = await deletePostDetailsServ(postId, userId);
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Error in deletePostDetailsController:", error);
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        })
    }
}

async function like_unlike_PostController(req, res) {
    const postId = req.params.postId;
    const userId = req.body.userId;
    try {
        const result = await like_unlike_PostServ(postId, userId);
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Error in like_unlike_PostController:", error);
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        })
    }
}

async function getAllLikesController(req, res) {
    const postId = req.params.postId;
    try {
        const result = await getAllLikesServ(postId);
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Error in getAllLikesController:", error);
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        })
    }
}

async function getAllPostsOfUserController(req, res) {
    const userId = req.params.userId;
    try {
        const result = await getAllPostsOfUserServ(userId);
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Error in getAllPostsOfUserController:", error);
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        })
    }
}


async function getAllRelatedPostsOfUSerController(req, res) {
    console.log("getAllRelatedPostsOfUSerController is called with req.params.userId:", req.params.userId);

    try {
        const result = await getAllRelatedPostsOfUserServ(req.params.userId);
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Error in getAllRelatedPostsOfUSerController:", error);
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        })
    }
}

async function getAllLikedPostsOfUserController(req, res) {
    const userId = req.params.userId;
    try {
        const result = await getAllLikedPostsOfUserServ(userId);
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Error in getAllLikedPostsOfUserController:", error);
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        })
    }
}

async function bookMarkPostController(req, res) {
    console.log("book mark post controller hits with req.body", req.body);
    try {
        const result = await bookMarkPostServ(req.body.postId, req.body.userId);
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Error in bookMarkPostController:", error);
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        })
    }
}

async function getAllSavedPostOfUserController(req, res) {
    console.log("getAllSavedPostOfUserController is called", req.params.userId);
    try {
        const result = await getAllSavedPostsOfUserServ(req.params.userId);
        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        console.error("Error in getAllSavedPostOfUserController:", error);
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        })
    }
}

export { 
    createNewPostController,
    getPostDetailsController,
    updatePostDetailsController,
    deletePostDetailsController,
    like_unlike_PostController,
    getAllLikesController,
    getAllPostsOfUserController,
    getAllRelatedPostsOfUSerController,
    getAllLikedPostsOfUserController,
    bookMarkPostController,
    getAllSavedPostOfUserController
}; 