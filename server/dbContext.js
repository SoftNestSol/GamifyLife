

const mssql = require('mssql');
const env = require('./env');
const DRIVER = env.DRIVER;


const CONNECTION = await mssql.connect(DRIVER);


const selectUsers = async () => {
		const query = `SELECT * FROM Users`;
		const result = await CONNECTION.query(query);
		return result.recordset;
};

const selectUserById = async (id) => {
		const query = `SELECT * FROM Users WHERE id = ${id}`;
		const result = await CONNECTION.query(query);
		return result.recordset;
}

const insertUser = async (user) => {
		const query = `INSERT INTO Users (name, email) VALUES ('${user.name}', '${user.email}')`;
		const result = await CONNECTION.query(query);
		return result;
}









