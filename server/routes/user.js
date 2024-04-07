const express = require("express");
const router = express.Router();

const { connect } = require("../dbContext");

router.get("/", (req, res) => {
	res.send("User route");
});

router.post("/register", async (req, res) => {
	console.log(req.body);
	const user = req.body;
	const result = await insertUser(user);
	res.send(result);
});

router.get("/all", async (req, res) => {
	const users = await selectUsers();
	res.send(users);
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const user = await selectUserById(id);
	res.send(user);
});

router.delete("/:id", async (req, res) => {
	const id = req.params.id;
	const result = await deleteUser(id);
	res.send(result);
});

const selectUsers = async () => {
	const query = `SELECT * FROM Users`;
	const result = await connect().query(query);
	return result.recordset;
};

const selectUserById = async (id) => {
	const query = `SELECT * FROM Users WHERE id = ${id}`;
	const result = await connect().query(query);
	return result.recordset;
};

const insertUser = async (user) => {
	const query = `INSERT INTO Users (first_name, last_name, email, uid) VALUES ('${user.first_name}', '${user.last_name}', '${user.email}', '${user.uid}')`;
	const result = await connect();
	result.query(query);
	return "User inserted";
};

const deleteUser = async (id) => {
	const query = `DELETE FROM Users WHERE id = ${id}`;
	const result = await connect().query(query);
	return result;
};

/*
CREATE TABLE [Users]
(
    [id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [first_name] VARCHAR(255) NULL,
    [last_name] VARCHAR(255) NULL,
    [email] VARCHAR(255) NULL,
    [created_at] DATETIME NULL CONSTRAINT [users_created_at_default] DEFAULT SYSUTCDATETIME(),
    [intelligence] INT NULL CONSTRAINT [users_intelligence_default] DEFAULT 0,
    [strength] INT NULL CONSTRAINT [users_strength_default] DEFAULT 0,
    [checkpoint] INT NULL CONSTRAINT [users_checkpoint_default] DEFAULT 0
);

*/

module.exports = router;
