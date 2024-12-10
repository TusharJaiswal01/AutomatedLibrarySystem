import express from "express";
import Requested from "../models/Requested.js";

const router = express.Router();

// Get all requests, limit to 10, sorted by latest (_id: -1)
router.get("/getAllRequest", async (req, res) => {
    try {
        const books = await Requested.find({})
            .limit(10)
            .populate("userId bookId")
            .sort({ _id: -1 });
        res.status(200).json(books);
    } catch (err) {
        console.error("Error fetching requests:", err); 
        res.status(500).json({ message: "Failed to fetch requests", error: err });
    }
});

// Post a new request
router.post("/postNewRequest", async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        if (!userId || !bookId) {
            return res.status(400).json({ message: "User ID and Book ID are required" });
        }

        const newRequest = await Requested.create({
            userId,
            bookId,
        });

        res.status(201).json(newRequest);
    } catch (err) {
        console.error("Error creating new request:", err);
        res.status(500).json({ message: "Failed to create new request", error: err });
    }
});

// Accept a request by ID
router.post("/accept/:id", async (req, res) => {
    try {
        const requestId = req.params.id;

        // Check if the request exists
        const request = await Requested.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        // Update the status to accepted (you can define a field like 'status' in your model)
        request.status = "accepted";
        await request.save();

        res.status(200).json({ message: "Request accepted successfully" });
    } catch (err) {
        console.error("Error accepting request:", err);
        res.status(500).json({ message: "Failed to accept request", error: err });
    }
});

// Delete a request by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const requestId = req.params.id;

        const request = await Requested.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        await Requested.findByIdAndDelete(requestId);
        res.status(200).json({ message: "Request deleted successfully" });
    } catch (err) {
        console.error("Error deleting request:", err);
        res.status(500).json({ message: "Failed to delete request", error: err });
    }
});

export default router;
