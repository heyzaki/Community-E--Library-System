import express from "express";
import BookCategory from "../models/BookCategory.js";

const router = express.Router();

router.get("/allcategories", async (req, res) => {
	try {
		const categories = await BookCategory.find({});
		res.status(200).json(categories);
	} catch (err) {
		return res.status(504).json(err);
	}
});

router.post("/addcategory", async (req, res) => {
	try {
		const newcategory = await new BookCategory({
			categoryName: req.body.categoryName,
		});

		await newcategory.save();

		const categories = await BookCategory.find({});
		res.status(200).json(categories);
	} catch (err) {
		return res.status(504).json(err);
	}
});

router.delete("/deletecategory", async (req, res) => {
	try {
		await BookCategory.deleteOne({ _id: req.query.id });
		const categories = await BookCategory.find({});
		res.status(200).json(categories);
	} catch (err) {
		return res.status(504).json(err);
	}
});

export default router;
