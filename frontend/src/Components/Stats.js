import React, { useEffect, useState } from "react";
import "./Stats.css";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import BookIcon from "@material-ui/icons/Book";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function Stats() {
	const [stats, setstats] = useState({
		totalBooks: 0,
		totalUsers: 0,
		totalReservedBooks: 0,
	});

	useEffect(() => {
		const getallBooks = async () => {
			const response = await axios.get(API_URL + "api/books/stats");
			setstats(response.data);
		};
		getallBooks();
	}, []);

	return (
		<div className="stats">
			<div className="stats-block">
				<LibraryBooksIcon className="stats-icon" style={{ fontSize: 80 }} />
				<p className="stats-title">Total Books</p>
				<p className="stats-count">{stats.totalBooks}</p>
			</div>
			<div className="stats-block">
				<LocalLibraryIcon className="stats-icon" style={{ fontSize: 80 }} />
				<p className="stats-title">Total Members</p>
				<p className="stats-count">{stats.totalUsers}</p>
			</div>
			<div className="stats-block">
				<BookIcon className="stats-icon" style={{ fontSize: 80 }} />
				<p className="stats-title">Reservations</p>
				<p className="stats-count">{stats.totalReservedBooks}</p>
			</div>
		</div>
	);
}

export default Stats;
