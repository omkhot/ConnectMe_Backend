import { deleteUserServ, getUserDetailsServ, updateUserDetailsServ } from "../Service/userServ.js";

async function getUserDetailsController(req, res) {
    console.log("get user details controller hits with req.params.socialId:", req.params);
    try {
        const result = await getUserDetailsServ(req.params.socialId);
        if(result === null){
            return res.status(404).json({
                message: "User not found"
            })
        } 
        return res.json({
            data: result
        });
    }
    catch (error) {
        console.error("Error in getUserDetailsController:", error);
        return res.status(error.statusCode).json({ 
           success: false,
           message: error.message
        });        
    }
} 

async function updateUserDetailsController(req, res) {

    console.log("update user controller hits with req body", req.params.socialId,req.file?.path);

    const userDetails = {
        ...req.body,
        profileImage: req.file?.path 
    }    

    try {        
        const result = await updateUserDetailsServ(req.params.socialId, userDetails);
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Error in updateUserDetailsController:", error);
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        })
    } 
}

async function deleteUserController(req, res) {
    console.log("delete user controller hits with req.params.userId:", req.params.userId);
    try {
        const result = await deleteUserServ(req.params.userId);
        return res.status(200).json({
            success: true,
            data: result,
            result: "Deletion successful"
        })
    } catch (error) {
        console.error("Error in deleteUserController:", error);
        return res.status(error.statusCode).json({ 
            success: false,
            message: error.message,
            result: "Deletion failed"
        });        
    }
}

export { 
    updateUserDetailsController, 
    getUserDetailsController,
    deleteUserController
};