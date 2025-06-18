import express from "express";
import { 
    createNewStoryController, 
    viewStoryController, 
    deleteStoryController, 
    fetchAllStoriesController
} from "../Controller/storiesController.js";
import { uploadStories } from "../Middlewares/multerMiddleware.js";

const storiesRouter = express.Router();

storiesRouter.post('/upload', uploadStories,createNewStoryController);
storiesRouter.put('/view', viewStoryController);
storiesRouter.delete('/:storyId', deleteStoryController);
storiesRouter.get('/all/:userId', fetchAllStoriesController);

export default storiesRouter;