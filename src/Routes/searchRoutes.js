import express from "express";
import { searchUserController } from "../Controller/searchController.js";

const searchRouter = express.Router();

searchRouter.get('/user', searchUserController);

export default searchRouter; 