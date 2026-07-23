import express from "express";
import Leaderboard from "../models/leaderboard.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const scores = await Leaderboard.find()
            .sort({ score: -1 })
            .limit(10);

        res.json(scores);
    } catch (err) {
        console.error("GET /leaderboard error:", err);
        res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, score } = req.body;

        if (!name?.trim() || score == null) {
            return res.status(400).json({ error: "Name and score are required" });
        }

        const entry = new Leaderboard({
            name: name.trim(),
            score: Number(score),
        });

        await entry.save();

        res.status(201).json(entry);
    } catch (err) {
        console.error("POST /leaderboard error:", err);
        res.status(500).json({ error: "Failed to save score" });
    }
});

export default router;
