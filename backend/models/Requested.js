import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Types.ObjectId,
        ref: "Book"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamps: true
    })

export default mongoose.model("Request", RequestSchema)