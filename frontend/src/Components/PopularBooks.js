import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PopularBooks.css";

const API_URL = process.env.REACT_APP_API_URL;

function PopularBooks() {
	const [books, setbooks] = useState([]);

	useEffect(() => {
		const getallBooks = async () => {
			const response = await axios.get(API_URL + "api/books/popular");
			setbooks(response.data);
		};
		getallBooks();
	}, []);

	return (
		<div className="popularbooks-container">
			<h className="popularbooks-title">Popular Books</h>
			<div className="popularbooks">
				<div className="popularbook-images">
					{books.map((v) => (
						<img
							key={v._id}
							className="popular-book"
							src={API_URL + v.filename}
							alt=""></img>
					))}
					{/* <img
						className="popular-book"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS34iIDoKVXOhKhdwsiGSLc9RJmtq_lSQDig&usqp=CAU"
						alt=""></img>
					<img
						className="popular-book"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRHNwRyPkTxnMOzOvv5dOK4OS_lq4-2Yugg&usqp=CAU"
						alt=""></img>
					<img
						className="popular-book"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
						alt=""></img>
					<img
						className="popular-book"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS34iIDoKVXOhKhdwsiGSLc9RJmtq_lSQDig&usqp=CAU"
						alt=""></img>
					<img
						className="popular-book"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRHNwRyPkTxnMOzOvv5dOK4OS_lq4-2Yugg&usqp=CAU"
						alt=""></img>
					<img
						className="popular-book"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
						alt=""></img> */}
				</div>
				{/* <div className="popularbook-images">
					<img
						className="popular-book"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS34iIDoKVXOhKhdwsiGSLc9RJmtq_lSQDig&usqp=CAU"
						alt=""></img>
					<img
						className="popular-book"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRHNwRyPkTxnMOzOvv5dOK4OS_lq4-2Yugg&usqp=CAU"
						alt=""></img>
					<img
						className="popular-book"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
						alt=""></img>
					<img
						className="popular-book"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS34iIDoKVXOhKhdwsiGSLc9RJmtq_lSQDig&usqp=CAU"
						alt=""></img>
					<img
						className="popular-book"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRHNwRyPkTxnMOzOvv5dOK4OS_lq4-2Yugg&usqp=CAU"
						alt=""></img>
					<img
						className="popular-book"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
						alt=""></img>
				</div> */}
			</div>
		</div>
	);
}

export default PopularBooks;
