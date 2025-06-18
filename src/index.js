import express from "express";
import connectDB from "./Config/dbConfig.js";
import { PORT } from "./Config/serverConfig.js";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/AuthRoute.js";
import passport from "passport";
import "./Config/passport.js";
import userRouter from "./Routes/userRoutes.js";
import postsRouter from "./Routes/postsRoutes.js";
import commentsRouter from "./Routes/commentsRoutes.js";
import followRequestRouter from "./Routes/followRequestRoutes.js";
import searchRouter from "./Routes/searchRoutes.js";
import storiesRouter from "./Routes/storiesRoutes.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import ChatRouter from "./Routes/ChatRoute.js";
import MsgRouter from "./Routes/MsgRoute.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(passport.initialize());

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"];

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/followRequests', followRequestRouter);
app.use('/search', searchRouter);
app.use('/stories', storiesRouter);
app.use('/chats', ChatRouter);
app.use('/msg', MsgRouter);

io.on("connection", (socket) => {
    console.log("a user connected with socket id: ", socket.id);
    
    socket.on("setUp", (userId) =>{
        socket.join(userId);
        console.log(`user ${userId} joined the room`);
    })

    socket.on("disconnect", () => {
        console.log("a user disconnected with socket id: ", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connectDB();
});

export {io};