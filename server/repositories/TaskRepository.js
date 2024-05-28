const { connect } = require("../dbContext");

const getTodayUserTasks = async (id) => {
	const findUser = `SELECT * FROM Users WHERE uid = '${id}'`;
	const connection = await connect();
	const user = await connection.query(findUser);
	const id_user = user.recordset[0].id;
	const query = `SELECT *  FROM Tasks WHERE user_id = ${id_user} AND CAST(created_at AS DATE) = CAST(GETDATE() AS DATE) AND type != 'habit' and type != 'reccuring'`;
	const result = await connection.query(query);
	return result.recordset;
};

const getTasksByDate = async (id, date) => {
	const find_user = `SELECT * FROM Users WHERE uid = '${id}'`;

	const connection = await connect();

	const user = await connection.query(find_user);

	const id_user = user.recordset[0].id;

	nextDay = new Date(date);
	nextDay.setDate(nextDay.getDate() + 1);
	nextDay = nextDay.toISOString().split("T")[0];
	const query = `SELECT * FROM Tasks WHERE id = '${id_user}' AND created_at >= ${date} AND created_at < ${nextDay}`; //YYYY-MM-DD
	const result = await connection.query(query);
	return result.recordset;
};

const addTask = async (task) => {
	const query = `INSERT INTO Tasks (from_app, from_buddy, type, description, title, user_id) VALUES (${task.from_app}, ${task.from_buddy}, '${task.type}', '${task.description}', '${task.title}', ${task.user_id})`;
	const connection = await connect();
	const result = await connection.query(query);
	return result.recordset;
};

const deleteTask = async (id) => {
	const query = `DELETE FROM Tasks WHERE id = ${id}`;
	const result = await connect().query(query);
	return result;
};

const updateTask = async (task) => {
	const query = `UPDATE Tasks SET from_app = ${task.from_app}, from_buddy = ${task.from_buddy}, type = '${task.type}', description = '${task.description}', title = '${task.title}' WHERE id = ${task.id}`;
	const result = await connect().query(query);
	return result;
};

const insertTask = async (task) => {
	const query = `INSERT INTO Tasks (from_app, from_buddy, type, description, title, user_id) VALUES (${task.from_app}, ${task.from_buddy}, '${task.type}', '${task.description}', '${task.title}', ${task.user_id})`;
	const result = await connect().query(query);
	return result;
};

const getUserReccuringTasks = async (id) => {
	const findUser = `SELECT * FROM Users WHERE uid = '${id}'`;
	const connection = await connect();
	const user = await connection.query(findUser);
	const id_user = user.recordset[0].id;
	const id_str = id_user.toString();
	const query = `SELECT * FROM Tasks WHERE user_id = ${id_str} AND type = 'reccuring'`;
	const result = await connection.query(query);
	return result.recordset;
};

const completeTask = async (id) => {
	const query = `UPDATE Tasks SET completed = 1 WHERE id = ${id}`;
	const connection = await connect();
	const result = await connection.query(query);
	return result;
};

const getUserHabits = async (id) => {
	const findUser = `SELECT * FROM Users WHERE uid = '${id}'`;
	const connection = await connect();
	const user = await connection.query(findUser);
	const id_user = user.recordset[0].id;
	const id_str = id_user.toString();
	const query = `SELECT * FROM Tasks WHERE user_id = ${id_str} AND type = 'habit'`;
	const result = await connection.query(query);
	return result.recordset;
};

module.exports = {
	getTodayUserTasks,
	getTasksByDate,
	addTask,
	deleteTask,
	updateTask,
	insertTask,
	getUserReccuringTasks,
	completeTask,
	getUserHabits
};
