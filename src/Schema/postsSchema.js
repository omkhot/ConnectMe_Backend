import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    caption: {
        type: String,
    },
    postImages:[
        {
            type: String,
            required: true
        } 
    ],
    likes:[ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }        
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ],
    bookMarkedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }        
    ]
},{
    timestamps: true
})

export default mongoose.model('Post', postSchema);