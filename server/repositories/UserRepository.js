const { connect } = require("../dbContext");

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

const getTodayUserTasks = async (id) => {
	const query = `SELECT * FROM Tasks WHERE user_id = ${id} AND created_at = GETDATE()`;
	const result = await connect().query(query);
	return result.recordset;
};

const getTasksByDate = async (id, date) => {
	nextDay = new Date(date);
	nextDay.setDate(nextDay.getDate() + 1);
	nextDay = nextDay.toISOString().split("T")[0];
	const query = `SELECT * FROM Tasks WHERE user_id = ${id} AND created_at >= ${date} AND created_at < ${nextDay}`; //YYYY-MM-DD
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

const addTask = async (task) => {
	const query = `INSERT INTO Tasks (from_app, from_buddy, from_user, description, title, user_id) VALUES (${task.from_app}, ${task.from_buddy}, '${task.from_user}', '${task.description}', '${task.title}', ${task.user_id})`;
	const result = await connect().query(query);
	return result;
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

module.exports = {
	selectUsers,
	selectUserById,
	insertUser,
	deleteUser,
	getTodayUserTasks,
	getTasksByDate,
	addTask,
	deleteTask,
	updateTask
};
