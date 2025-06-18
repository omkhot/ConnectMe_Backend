import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    media:[
        {
            type: String,
            required: true
        }
    ],
    views:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
    }
},{
    timestamps: true
});

storySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Expire stories after 24 hours

const Story = mongoose.model("Story", storySchema);
export default Story; 