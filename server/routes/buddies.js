const express = require("express");
const router = express.Router();

const { connect } = require("../dbContext");

router.get("/", (req, res) => {
	res.send("Buddies route");
});

router.post("/add", async (req, res) => {
	const buddy = req.body;
	const result = await addBuddy(buddy);
	res.send(result);
});

const addBuddy = async (buddy) => {
	const query = `INSERT INTO Buddies (user_id, buddy_id) VALUES (${buddy.user_id}, ${buddy.buddy_id})`;
	const connection = await connect();
	const result = await connection.query(query);
	return result;
};
