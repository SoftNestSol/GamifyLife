const express = require("express");
const router = express.Router();

const {
	insertUser,
	selectUsers,
	selectUserById,
	deleteUser
} = require("../repositories/UserRepository");

const {
	getTodayUserTasks,
	insertTask,
	getTasksByDate,
	getUserReccuringTasks,
	getUserHabits
} = require("../repositories/TaskRepository");

const { suggestTask } = require("../services/TaskSugestions.js");

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
	console.log(users);
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

router.get("/tasks/:id", async (req, res) => {
	const id = req.params.id;
	console.log(id);
	const tasks = await getTodayUserTasks(id);
	res.send(tasks);
});

router.post("/tasks", async (req, res) => {
	const task = req.body;
	const result = await insertTask(task);
	res.send(result);
});

router.get("/tasks/:id/:date", async (req, res) => {
	const id = req.params.id;
	const date = req.params.date;
	const tasks = await getTasksByDate(id, date);
	res.send(tasks);
});

router.get("/habits/:id", async (req, res) => {
	const id = req.params.id;
	const habits = await getUserHabits(id);
	res.send(habits);
});

router.get("/reccuring/:id", async (req, res) => {
	const id = req.params.id;
	const reccuring = await getUserReccuringTasks(id);
	res.send(reccuring);
});

router.get("/suggest/:id", async (req, res) => {
	const id = req.params.id;
	const resp = await suggestTask(id);
	res.send(resp);
});
/*
const selectUsers = async () => {
	const query = `SELECT * FROM Users`;
	const connection = await connect();
	const result = await connection.query(query)
	return result.recordset;
};

const selectUserById = async (id) => {
	const query = `SELECT * FROM Users WHERE id = ${id}`;
	const connection = await connect();
	const result = await connection.query(query)
	return result.recordset;
};

const getTodayUserTasks = async (id) => {
	const query = `SELECT * FROM Tasks WHERE user_id = ${id} AND created_at = CAST(GETDATE() AS DATE) AND from_user != 'habit' and from_user != 'reccuring'`;
	const connection = await connect();
	const result = await connection.query(query);
	return result.recordset;
};

const getTasksByDate = async (id, date) => {
	nextDay = new Date(date);
	nextDay.setDate(nextDay.getDate() + 1);
	nextDay = nextDay.toISOString().split("T")[0];
	const query = `SELECT * FROM Tasks WHERE user_id = ${id} AND created_at >= ${date} AND created_at < ${nextDay}`; //YYYY-MM-DD
	const connection = await connect();
	const result = await connection.query(query)
	return result.recordset;
};

const insertUser = async (user) => {
	const query = `INSERT INTO Users (first_name, last_name, email, uid) VALUES ('${user.first_name}', '${user.last_name}', '${user.email}', '${user.uid}')`;
	const connection = await connect();
	const result = await connection.query(query)
	return result.recordset;
};

const deleteUser = async (id) => {
	const query = `DELETE FROM Users WHERE id = ${id}`;
	const connection = await connect();
	const result = await connection.query(query)
	return result.recordset;
};

const addTask = async (task) => {
	const query = `INSERT INTO Tasks (from_app, from_buddy, from_user, description, title, user_id) VALUES (${task.from_app}, ${task.from_buddy}, '${task.from_user}', '${task.description}', '${task.title}', ${task.user_id})`;
	const connection = await connect();
	const result = await connection.query(query)
	return result.recordset;
};

const deleteTask = async (id) => {
	const query = `DELETE FROM Tasks WHERE id = ${id}`;
	const result = await connect().query(query);
	return result;
};

const updateTask = async (task) => {
	const query = `UPDATE Tasks SET from_app = ${task.from_app}, from_buddy = ${task.from_buddy}, from_user = '${task.from_user}', description = '${task.description}', title = '${task.title}' WHERE id = ${task.id}`;
	const result = await connect().query(query);
	return result;
};


const insertTask = async (task) => {
	const query = `INSERT INTO Tasks (from_app, from_buddy, from_user, description, title, user_id) VALUES (${task.from_app}, ${task.from_buddy}, '${task.from_user}', '${task.description}', '${task.title}', ${task.user_id})`;
	const result = await connect().query(query);
	return result;
}


const getUserHabits = async (id) => {
	const query = `SELECT * FROM TASKS WHERE user_id = ${id} AND from_user == 'habit'`;
	const connection = await connect();
	const result = await connection.query(query)
	return result.recordset;
}

const getUserReccuringTasks = async (id) => {
	const query = `SELECT * FROM TASKS WHERE user_id = ${id} AND from_user == 'reccuring'`;
	const connection = await connect();
	const result = await connection.query(query)
	return result.recordset;
}
*/

module.exports = router;
