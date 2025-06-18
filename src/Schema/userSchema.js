import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    googleId: { 
        type: String, 
        unique: true,
        sparse: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    profileImage:{
        type: String,
        default: null
    },
    socialId:{
        type: String,
        unique: true,
        required: true
    },
    accountType: {
        type: String,
        enum: ['public', 'private'],
        default: 'public',
    },
    socialType:{
        type: String,
        enum: ['google', 'facebook', 'twitter', 'manual'],
        default: 'manual',
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    dateOfBirth: {
        type: Date,
    },
    bio: {
        type: String,
    },
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            default: []
        }        
    ],
    stories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Story',
            default: []
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }        
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }        
    ],
    followRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }        
    ],
    sentFollowRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }        
    ]
},{
    timestamps: true,
});

userSchema.index({socialId:1 , firstName:1, lastName:1});
userSchema.index({ firstName: 'text', lastName: 'text', socialId: 'text' });

userSchema.pre('save', async function () {
    // Only hash if password is set and has been modified
    if (this.isModified('password') && this.password) {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        } catch (err) {
            return next(err);
        }
    }
});

const User = mongoose.model("User", userSchema);
export default User;