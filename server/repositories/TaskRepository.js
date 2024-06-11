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

const getAllUserTasks = async (id) => {
	const findUser = `SELECT * FROM Users WHERE uid = '${id}'`;
	const connection = await connect();
	const user = await connection.query(findUser);

	const id_user = user.recordset[0].id;
	const query = `SELECT *  FROM Tasks WHERE user_id = ${id_user}`;
	const result = await connection.query(query);
	return result.recordset;
};

const getTasksByDate = async (id, date) => {
	const find_user = `SELECT * FROM Users WHERE uid = '${id}'`;

	const connection = await connect();

	const user = await connection.query(find_user);

	const id_user = user.recordset[0].id;

	date = new Date(date).toISOString().split("T")[0];

	let nextDay = new Date(date);
	nextDay.setDate(nextDay.getDate() + 1);
	nextDay = nextDay.toISOString().split("T")[0];

	const query = `
        SELECT * FROM Tasks 
        WHERE user_id = '${id_user}' 
        AND CAST(created_at AS DATE) >= '${date}' 
        AND CAST(created_at AS DATE) < '${nextDay}'
    `;

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

const insertTask = async (task, id) => {
	console.log(task);
	const findUser = `SELECT * FROM Users WHERE uid = '${id}'`;
	const connection = await connect();
	const user = await connection.query(findUser);
	const id_user = user.recordset[0].id;

	/*
		from_app: false,
			from_buddy: null,
			type: type,
			created_at: createdAt,
			done: done,
			description: description,
			title: title,
			user_id: user.uid,
			category: category,
			fitness: fitnessCounter,
			skill: skillCounter,
			wellness: wellnessCounter,
			inteligence: intelligenceCounter,
			emoji: titleEmoji
	*/
	const query = `
			INSERT INTO Tasks (
					from_app, from_buddy, type, created_at, done, description, title, user_id, 
					category, fitness, skill, wellness, inteligence, emoji
			) VALUES (
					'${task.from_app}', 
					${task.from_buddy}, 
					'${task.type}', 
					'${task.created_at}', 
					${task.done}, 
					'${task.description}', 
					'${task.title}', 
					${id_user}, 
					'${task.category}', 
					${task.fitness}, 
					${task.skill}, 
					${task.wellness}, 
					${task.inteligence}, 
					N'${task.emoji}'
			)
	`;
	const result = await connection.query(query);
	return result;
};

const insertHabit = async (habit, id) => {
	const findUser = `SELECT * FROM Users WHERE uid = '${id}'`;
	const connection = await connect();
	const user = await connection.query(findUser);
	const id_user = user.recordset[0].id;
	const query = `INSERT INTO Tasks (
			from_app, 
			from_buddy, 
			type, 
			created_at, 
			done, 
			description, 
			title, 
			user_id, 
			days_per_week, 
			category, 
			week_interval, 
			fitness, 
			skill, 
			wellness, 
			inteligence, 
			emoji
	) VALUES (
			${habit.from_app}, 
			${habit.from_buddy}, 
			'${habit.type}', 
			'${habit.created_at}', 
			${habit.done}, 
			'${habit.description}', 
			'${habit.title}', 
			${id_user}, 
			'${habit.days_per_week}', 
			'${habit.category}', 
			${habit.week_interval}, 
			${habit.fitness}, 
			${habit.skill}, 
			${habit.wellness}, 
			${habit.inteligence}, 
			N'${habit.emoji}'
	)`;
	const result = await connection.query(query);
	return result;
};

const insertReccuring = async (reccuring, id) => {
	const findUser = `SELECT * FROM Users WHERE uid = '${id}'`;
	const connection = await connect();
	const user = await connection.query(findUser);
	const id_user = user.recordset[0].id;
	const query = `INSERT INTO Tasks (
			from_app, 
			from_buddy, 
			type, 
			created_at, 
			done, 
			description, 
			title, 
			user_id, 
			due_date, 
			category, 
			days_per_week, 
			week_interval, 
			fitness, 
			skill, 
			wellness, 
			inteligence, 
			emoji
	) VALUES (
			${reccuring.from_app}, 
			${reccuring.from_buddy}, 
			'${reccuring.type}', 
			'${reccuring.created_at}', 
			${reccuring.done}, 
			'${reccuring.description}', 
			'${reccuring.title}', 
			${id_user}, 
			'${reccuring.due_date}', 
			'${reccuring.category}', 
			'${reccuring.days_per_week}', 
			${reccuring.week_interval}, 
			${reccuring.fitness}, 
			${reccuring.skill}, 
			${reccuring.wellness}, 
			${reccuring.inteligence}, 
			N'${reccuring.emoji}'
	)`;
	/*
		from_app: 0,
			from_buddy: null,
			type: type,
			created_at: new Date().toISOString().split("T")[0],
			done: 0,
			description: description,
			title: title,
			user_id: user.uid,
			due_date: dueDate.toISOString().split("T")[0],
			days_per_week: encodeDays(days),
			category: category,
			week_interval: weekInterval,
			fitness: fitnessCounter,
			skill: skillCounter,
			wellness: wellnessCounter,
			inteligence: intelligenceCounter,
			emoji: titleEmoji
	*/
	const result = await connection.query(query);
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
	getUserHabits,
	insertHabit,
	insertReccuring,
	getAllUserTasks
};
