import { searchUserServ } from "../Service/searchingServ.js";

async function searchUserController(req, res) {
    console.log("searchUserController is called with req.query:", req.query.query);
    try {
        const user = await searchUserServ(req.query.query);
        res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        console.error("Error in searchUserController:", error);
        return res.status(error.statusCode).json({
            success: false,
            message: error.message
        })
    }
}
 
export { searchUserController };