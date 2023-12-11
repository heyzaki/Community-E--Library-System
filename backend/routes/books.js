import express from "express";
import multer from "multer";
import fs from "fs";

import Book from "../models/Book.js";
import BookCategory from "../models/BookCategory.js";
import User from "../models/User.js";

const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if (!fs.existsSync("./uploads/")) {
			fs.mkdirSync("./uploads/");
		}
		cb(null, "./uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const upload = multer({ storage: storage });

/* Get all books in the db */
router.get("/allbooks", async (req, res) => {
	try {
		const books = await Book.find({})
			.populate("transactions")
			.sort({ _id: -1 });
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

/* Get books by category name*/
router.get("/", async (req, res) => {
	const category = req.query.category;
	try {
		const books = await BookCategory.findOne({
			categoryName: category,
		}).populate("books");
		res.status(200).json(books);
	} catch (err) {
		return res.status(504).json(err);
	}
});

/* Adding book */
router.post("/addbook", upload.single("image"), async (req, res) => {
	if (req.body.isAdmin) {
		try {
			const newbook = await new Book({
				bookName: req.body.bookName,
				alternateTitle: req.body.alternateTitle,
				author: req.body.author,
				bookCountAvailable: req.body.bookCountAvailable,
				language: req.body.language,
				publisher: req.body.publisher,
				bookStatus: req.body.bookSatus,
				categories: req.body.categories,
				desc: req.body.desc,
				filename: req.file.filename,
			});
			const book = await newbook.save();
			await BookCategory.updateMany(
				{ _id: book.categories },
				{ $push: { books: book._id } }
			);
			res.status(200).json(book);
		} catch (err) {
			res.status(504).json(err);
		}
	} else {
		return res.status(403).json("You dont have permission to delete a book!");
	}
});

/* Addding book */
router.put("/updatebook/:id", async (req, res) => {
	if (req.body.isAdmin) {
		try {
			await Book.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			});
			res.status(200).json("Book details updated successfully");
		} catch (err) {
			res.status(504).json(err);
		}
	} else {
		return res.status(403).json("You dont have permission to delete a book!");
	}
});

/* Remove book  */
router.delete("/removebook/:id", async (req, res) => {
	if (req.body.isAdmin) {
		try {
			const _id = req.params.id;
			const book = await Book.findOne({ _id });
			await book.remove();
			await BookCategory.updateMany(
				{ _id: book.categories },
				{ $pull: { books: book._id } }
			);
			res.status(200).json("Book has been deleted");
		} catch (err) {
			return res.status(504).json(err);
		}
	} else {
		return res.status(403).json("You dont have permission to delete a book!");
	}
});

router.get("/stats", async (req, res) => {
	const totalBooks = await Book.countDocuments();
	const totalUsers = await User.countDocuments({ isAdmin: false });
	const totalReservedBooks = await Book.countDocuments({
		bookStatus: "Reserved",
	});

	res.json({
		totalBooks,
		totalUsers,
		totalReservedBooks,
	});
});

router.get("/popular", async (req, res) => {
	try {
		const books = await Book.find().sort({ transactions: -1 }).exec();

		const booksWithTransactionLength = books.map((book) => ({
			_id: book._id,
			bookName: book.bookName,
			author: book.author,
			filename: book.filename,
			desc: book.desc,
			transactions: {
				length: book.transactions.length,
				details: book.transactions,
			},
		}));

		res.json(booksWithTransactionLength);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
});

export default router;
