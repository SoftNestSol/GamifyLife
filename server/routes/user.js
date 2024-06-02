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
	insertHabit,
	insertReccuring,
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

router.post("/add/tasks/:id", async (req, res) => {
	const task = req.body;
	const id = req.params.id;
	const result = await insertTask(task, id);
	res.send(result);
});

router.post("/add/habits/:id", async (req, res) => {
	const task = req.body;
	const id = req.params.id;
	const result = await insertHabit(task, id);
	res.send(result);
});

router.post("/add/reccuring/:id", async (req, res) => {
	const task = req.body;
	const id = req.params.id;
	const result = await insertReccuring(task, id);
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

module.exports = router;
