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

// ticket 3
app.get("/", function (req, res) {
	res.send("Welcome to the inspirational quotes API");
});

app.get("/quotes", async function (req, res) {
	const quotes = await getQuotes();
	res.json(quotes);
});

//ticket 4
app.get("/quotes/:id", async function (req, res) {
	const id = req.params.id;

	const quote = await getQuoteByID(id);

	if (quote === null) {
		res.status(404).json({ error: "quote not found" });
	} else {
		res.json(quote);
	}
	// get the id from params
	// used id in function call and save variable
	// if quote is null - respond with error message
	// else response with quote
});

// Ticket 5.
app.post("/quotes", async function (req, res) {
	// save body json data
	const reqQuote = req.body;
	// run post function
	const newQuote = await addQuote(reqQuote.quoteText, reqQuote.author);
	// respond with new quote
	res.json({ success: true, payload: newQuote });
});

app.patch("/quotes/:id", async function (req, res) {
	const reqBody = req.body;
	const id = req.params.id;
	// destructure body. see week 4 day 1: Destructuring
	const { quoteText, author } = reqBody;
	// call editQuote with the right info some of which may be null - see quotes.js
	const editedQuote = await editQuote(id, quoteText, author);
	// respond
	res.json({ success: true, payload: editedQuote });
});

app.delete("/quotes/:id", async function (req, res) {
	// save req id
	const id = req.params.id;
	// call delete function pass in id and save return value in variable
	const deletedQuote = await deleteQuote(id);
	// respond with deleted object returned from function
	res.json({ success: true, payload: deletedQuote });
});

app.listen(PORT, function () {
	console.log(`Server is now listening on http://localhost:${PORT}`);
});
