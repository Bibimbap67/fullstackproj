import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    score: {
        type: Number,
        required: true,
    },
});

export default mongoose.model("Leaderboard", leaderboardSchema);
