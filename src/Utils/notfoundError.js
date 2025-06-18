import AppError from "./appError.js";

class NotFoundError extends AppError {
    constructor(properties,resource){
        // propertiers are array which are not found

        let notFoundProps = "";
        properties.forEach(prop => {
            notFoundProps += `${prop}, `;
        });

        super(`These properties are not found: ${notFoundProps} for resource: ${resource}`,404);
    }
}

export default NotFoundError;