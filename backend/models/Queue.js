import mongoose from "mongoose";

const QueueSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    bookId: {
        type: mongoose.Types.ObjectId,
        ref: "Book"
    }
},
    {
        timestamps: true
    });

export default mongoose.model("Queue", QueueSchema);