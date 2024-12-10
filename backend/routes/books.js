import express from "express";
import multer from "multer";
import XLSX from "xlsx";
import Book from "../models/Book.js";
import BookCategory from "../models/BookCategory.js";

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Specify the directory to store uploaded files

/* Get all books in the db */
router.get("/allbooks", async (req, res) => {
    try {
        const books = await Book.find({}).populate("transactions").sort({ _id: -1 });
        res.status(200).json(books);
    } catch (err) {
        return res.status(504).json(err);
    }
});

/* Get Book by book Id */
router.get("/getbook/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("transactions");
        res.status(200).json(book);
    } catch (err) {
        return res.status(500).json(err);
    }
});

/* Get books by category name */
router.get("/", async (req, res) => {
    const category = req.query.category;
    try {
        const books = await BookCategory.findOne({ categoryName: category }).populate("books");
        res.status(200).json(books);
    } catch (err) {
        return res.status(504).json(err);
    }
});

/* Adding book */
/* Adding book */
router.post("/addbook", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const newBook = await new Book({
                bookName: req.body.bookName,
                alternateTitle: req.body.alternateTitle,
                author: req.body.author,
                availableCount: req.body.availableCount,
                language: req.body.language,
                publisher: req.body.publisher,
                bookStatus: req.body.bookStatus,
                ISBN: req.body.ISBN,
                subjectCode: req.body.subjectCode,
                edition: req.body.edition,
                publication: req.body.publication,
                semester: req.body.semester,
                department: req.body.department,
                categories: req.body.categories
            });
            const book = await newBook.save();

            // Add book to the associated categories
            await BookCategory.updateMany(
                { '_id': book.categories },
                { $push: { books: book._id } }
            );

            res.status(200).json(book);
        } catch (err) {
            res.status(504).json(err);
        }
    } else {
        return res.status(403).json("You don't have permission to add a book!");
    }
});


/* Updating book details */
router.put("/updatebook/:id", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
                $set: {

                    availableCount: req.body.availableCount,

                }
            }, { new: true });

            res.status(200).json("Book details updated successfully");
        } catch (err) {
            res.status(504).json(err);
        }
    } else {
        return res.status(403).json("You don't have permission to update this book!");
    }
});

/* Remove book */
router.delete("/removebook/:id", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const _id = req.params.id;
            const book = await Book.findOne({ _id });

            // Remove the book
            await book.remove();

            // Remove book from associated categories
            await BookCategory.updateMany(
                { '_id': book.categories },
                { $pull: { books: book._id } }
            );

            res.status(200).json("Book has been deleted");
        } catch (err) {
            return res.status(504).json(err);
        }
    } else {
        return res.status(403).json("You don't have permission to delete this book!");
    }
});

/* Upload books from Excel file */
router.post("/uploadbooks", upload.single("file"), async (req, res) => {
    try {
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        const books = data.map(item => ({
            bookName: item.bookName || "",
            alternateTitle: item.alternateTitle || "",
            author: item.author || "",
            availableCount: item.availableCount || 0,
            language: item.language || "",
            publisher: item.publisher || "",
            categories: item.categories ? item.categories.split(",").map(cat => cat.trim()) : []
        }));

        // Insert all books into the database
        await Book.insertMany(books);

        // Optionally, you can remove the uploaded file after processing
        // fs.unlinkSync(req.file.path); // Uncomment to delete the file

        res.status(200).json({ message: "Books added successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to upload file" });
    }
});

export default router;
