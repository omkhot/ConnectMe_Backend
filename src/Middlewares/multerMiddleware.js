import multer from "multer";
import path from "path";


const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, next) => {
        next(null, `${Date.now()} -${path.extname(file.originalname)}`);
    }
})

const uploader = multer({storage : storageConfig});

// For multiple post images
export const uploadPostImages = uploader.array("postImages", 10); // max 10 images

export const uploadStories = uploader.array("stories", 10);

export default uploader; 