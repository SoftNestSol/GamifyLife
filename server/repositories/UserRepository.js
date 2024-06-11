const { connect } = require("../dbContext");

const selectUsers = async () => {
	const query = `SELECT * FROM Users`;
	const connection = await connect();
	const result = await connection.query(query);
	return result.recordset;
};

const selectUserById = async (id) => {
	const query = `SELECT * FROM Users WHERE id = ${id}`;
	const connection = await connect();
	const result = await connection.query(query);
	return result.recordset;
};

const insertUser = async (user) => {
	const query = `INSERT INTO Users (first_name, last_name, email, uid) VALUES ('${user.first_name}', '${user.last_name}', '${user.email}', '${user.uid}')`;
	const connection = await connect();
	const result = await connection.query(query);
	return result.recordset;
};

const deleteUser = async (id) => {
	const query = `DELETE FROM Users WHERE id = ${id}`;
	const connection = await connect();
	const result = await connection.query(query);
	return result.recordset;
};

const getUserInterests = async (id) => {
	const findUserQuery = `SELECT * FROM Users WHERE uid = ${id}`;

	const connection = await connect();

	const user = await connection.query(findUserQuery);

	const id_user = user.recordset[0].id;

	const query = `SELECT * FROM UserInterests WHERE user_id = ${id_user}`;

	const result = await connection.query(query);
	return result;
};

module.exports = {
	selectUsers,
	selectUserById,
	insertUser,
	deleteUser,
	getUserInterests
};
