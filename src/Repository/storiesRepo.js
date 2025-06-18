import Story from "../Schema/storySchema.js";
import User from "../Schema/userSchema.js";
import InternalServerError from "../Utils/internalServerError.js";

async function createNewStoryRepo(storyDetails) {
    try {
        const story = await Story.create(storyDetails);
        return story;
    }
    catch (error) {
        console.error("Error in createNewStoryRepo:", error);
        throw new InternalServerError();
    }
}

async function viewStoriesRepo(storyId, userId) {
    try {
        const story = await Story.findById(storyId).lean();
        if (!story) {
            throw new Error("Story not found");
        }        

        if(!story.views.includes(userId)){
            await Story.findByIdAndUpdate(storyId, { $push: { views: userId } });
        }
       
        return story;
    }
    catch (error) {
        console.error("Error in viewStoriesRepo:", error);
        throw new InternalServerError();
    }
}

async function deleteStoryRepo(storyId) {
    try {
        const story = await Story.findByIdAndDelete(storyId);
        return story;
    }
    catch (error) {
        console.error("Error in deleteStoryRepo:", error);
        throw new InternalServerError();
    }
}

async function fetchAllStoriesRepo(userId) {
    try {
        const userFollowings = await User.findById(userId).populate("following", "_id").lean();

        const followingIds = userFollowings?.following?.map(f => f._id.toString()) || [];
        followingIds.push(userId.toString()); // Include user's own ID

        const stories = await Story.find({
            user: { $in: followingIds },
            expiresAt: { $gt: new Date() }
        })
        .populate("user", "socialId profileImage")
        .sort({ createdAt: 1 })
        .lean();

        const groupedStories = {};

        stories.forEach(story => {
            const uId = story.user._id.toString(); // ensure key is a string
            if (!groupedStories[uId]) {
                groupedStories[uId] = {
                    userId: uId,
                    socialId: story.user.socialId,
                    profileImage: story.user.profileImage,
                    stories: []
                };
            }

            groupedStories[uId].stories.push({
                _id: story._id,
                media: story.media,
                createdAt: story.createdAt,
                isViewed: story.views?.includes(userId) || false // Optional
            });
        });

        return Object.values(groupedStories);
    } catch (error) {
        console.error("Error in fetchAllStoriesRepo:", error);
        throw new InternalServerError();
    }
}



export { 
    createNewStoryRepo,
    viewStoriesRepo,
    deleteStoryRepo,
    fetchAllStoriesRepo
};