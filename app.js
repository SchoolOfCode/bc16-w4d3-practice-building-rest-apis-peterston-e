import express from "express";
const app = express();
const PORT = 3000;

import {
	getQuotes,
	getQuoteByID,
	addQuote,
	editQuote,
	deleteQuote,
} from "./quote.js";

app.use(express.json());

app.get("/", function (req, res) {
	res.send("Welcome to the inspirational quotes API");
});

app.get("/quotes", async function (req, res) {
	const quotes = await getQuotes();
	res.json(quotes);
});

app.get("/quotes/:id", async function (req, res) {
	// get the id from params
	const id = req.params.id;
	// used id in function call and save variable
	const quote = await getQuoteByID(id);
	// if x is null - respond with error message
	if (quote === null) {
		res.status(404).json({ error: "quote not found" });
	}
	// else response with quote
	else {
		res.json(quote);
	}
});

app.listen(PORT, function () {
	console.log(`Server is now listening on http://localhost:${PORT}`);
});
