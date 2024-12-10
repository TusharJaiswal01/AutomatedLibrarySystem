import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    availableCount: {
        type: Number,
        required: true,
        default: 5
    },
    alternateTitle: {
        type: String,
        default: ""
    },
    author: {
        type: String,
        required: true
    },
    language: {
        type: String,
        default: ""
    },
    publisher: {
        type: String,
        default: ""
    },
    
    bookStatus: {
        type: String,
        default: "Available"
    },
    ISBN: {
        type: String,
        required: true  // ISBN number should be required for uniqueness
    },
    subjectCode: {
        type: String,
        default: ""  // Can be specific to the subject of the book
    },
    edition: {
        type: String,
        default: ""
    },
    publication: {
        type: String,
        default: ""
    },
    semester: {
        type: Number, // Assuming semester is a number
        default: null
    },
    department: {
        type: String,
        default: ""  // Department can be linked to a particular field of study
    },
    categories: [{
        type: mongoose.Types.ObjectId,
        ref: "BookCategory"
    }],
    transactions: [{
        type: mongoose.Types.ObjectId,
        ref: "BookTransaction"
    }]
}, {
    timestamps: true
});

export default mongoose.model("Book", BookSchema);
