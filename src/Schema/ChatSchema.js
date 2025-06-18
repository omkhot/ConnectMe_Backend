import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    chats:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }],
}, { 
    timestamps: true 
});
 
export default mongoose.model("Chat", ChatSchema);
