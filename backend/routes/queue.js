import Queue from "../models/Queue.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendmail.js";

import express from "express";

const router = express.Router();

router.post("/addToQueue", async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const data = await addToQueue(userId, bookId)
        res.status(201).json({
            success: true
        });
    } catch (err) {
        console.error("Error fetching requests:", err);
        res.status(500).json({ message: "Failed to fetch requests", error: err });
    }
});

export const sendMailToUser = async (bookId) => {
    try {
        const queue = await Queue.findOne({
            bookId
        }).sort({ createdAt: 1 })

        if (queue) {
            const user = await User.findById(queue.userId)
            console.log({ email: user.email });

            await sendEmail(user.email)
            await removeQueue(queue._id)
            return queue
        }

        return undefined
    } catch (error) {
        console.log(error)
        return undefined
    }
}

export const addToQueue = async (userId, bookId) => {
    try {

        const isAlreadyInQueue = await Queue.findOne({
            userId,
            bookId
        })

        if (!isAlreadyInQueue) {
            const queue = await Queue.create({
                userId,
                bookId
            })

            return queue
        }
    } catch (error) {
        console.log(error)
    }
}

export const removeQueue = async (id) => {
    try {
        const q = await Queue.findByIdAndDelete(id)
        return q;
    } catch (error) {
        console.log({ error });
    }
}

export default router;
