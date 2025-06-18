import { searchUserRepo } from "../Repository/searchingRepo.js";
// import NotFoundError from "../Utils/notFoundError.js";


async function searchUserServ(userDetailsQuery) {
    try {
        const user = await searchUserRepo(userDetailsQuery);
        if(user.length === 0){
            // throw new NotFoundError([userDetailsQuery], "user");
            throw new Error("User with the given query not found");
        }
        return user;
    } catch (error) {
        console.error("Error in searchUserServ:", error);
        throw error;
        // if (error instanceof NotFoundError) {
        //     throw error;
        // }
        // else throw error; // Rethrow the error for further handling if needed
    }
}

export { searchUserServ }; 