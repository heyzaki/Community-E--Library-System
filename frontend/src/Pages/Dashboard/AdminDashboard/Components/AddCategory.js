import React, { useEffect, useState } from "react";
import "../AdminDashboard.css";
import axios from "axios";

function AddCategory() {
	const API_URL = process.env.REACT_APP_API_URL;
	const [isLoading, setIsLoading] = useState(false);

	const [categoryName, setCategoryName] = useState("");
	const [allCategories, setAllCategories] = useState([]);

	/* Fetch all the Categories */
	useEffect(() => {
		const getAllCategories = async () => {
			try {
				const response = await axios.get(
					API_URL + "api/categories/allcategories"
				);

				setAllCategories(response.data);
			} catch (err) {
				console.log(err);
			}
		};
		getAllCategories();
	}, [API_URL]);

	/* Adding book function */
	const addCat = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const BookData = {
			categoryName,
		};
		try {
			const response = await axios.post(
				API_URL + "api/categories/addcategory",
				BookData
			);

			setAllCategories(response.data);

			alert("Category Added Successfully 🎉");
		} catch (err) {
			console.log(err);
		}
		setIsLoading(false);
	};

	const delCat = async (id = "") => {
		if (!window.confirm("Are you sure?")) {
			return;
		}

		try {
			setIsLoading(true);
			const response = await axios.delete(
				API_URL + "api/categories/deletecategory?id=" + encodeURIComponent(id)
			);

			setAllCategories(response.data);
		} catch (error) {
			alert("Something went wrong!");
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<p className="dashboard-option-title">Add Categories</p>
			<div className="dashboard-title-line"></div>
			<form className="addbook-form" onSubmit={addCat}>
				<label className="addbook-form-label" htmlFor="bookName">
					Category Name<span className="required-field">*</span>
				</label>
				<br />
				<input
					className="addbook-form-input"
					type="text"
					name="bookName"
					value={categoryName}
					onChange={(e) => {
						setCategoryName(e.target.value);
					}}
					required></input>
				<br />

				<input
					className="addbook-submit"
					type="submit"
					value="SUBMIT"
					disabled={isLoading}></input>
			</form>
			<div>
				<p className="dashboard-option-title">Recently Added Categories</p>
				<div className="dashboard-title-line"></div>
				<table className="admindashboard-table">
					<tr>
						<th>S.No</th>
						<th>Category Name</th>
						<th>Added Date</th>
						<th>Actions</th>
					</tr>
					{allCategories.map((cat, index) => {
						return (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{cat.categoryName}</td>
								<td>{cat.createdAt?.substring(0, 10)}</td>
								<td>
									<button onClick={() => delCat(cat._id)}>delete</button>
								</td>
							</tr>
						);
					})}
				</table>
			</div>
		</div>
	);
}

export default AddCategory;
