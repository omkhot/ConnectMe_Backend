import AppError from "./appError.js";

class InternalServerError extends AppError {
    constructor(message) {
        super("Something went wrong on the server side, please try again", 500);
    }
}

export default InternalServerError;