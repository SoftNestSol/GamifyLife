const { connect } = require("../dbContext");
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

const getUserReccuringTasks = async (id) => {
	const query = `SELECT * FROM TASKS WHERE user_id = ${id} AND from_user = 'reccuring'`;
	const connection = await connect();
	const result = await connection.query(query)
	return result.recordset;
}

const completeTask = async (id) => {
	const query = `UPDATE Tasks SET completed = 1 WHERE id = ${id}`;
	const connection = await connect();
	const result = await connection.query(query);
	return result;
}

module.exports = {

	getTodayUserTasks,
	getTasksByDate,
	addTask,
	deleteTask,
	updateTask,
	insertTask,
	getUserReccuringTasks,
    completeTask,
};