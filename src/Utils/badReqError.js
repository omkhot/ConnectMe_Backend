import AppError from "./appError.js";

class BadRequestError extends AppError {
    constructor(invalidParams) {
        
        let invalidParamsMessage = "";
        invalidParams.forEach(param => {
            invalidParamsMessage += `${param}, `;
        });

        super(`Invalid parameters: ${invalidParamsMessage}`, 400);
    }
}

export default BadRequestError;