const mssql = require("mssql");
require("dotenv").config();

const DRIVER = {
	user: process.env.UID,
	password: process.env.PASSWORD,
	server: process.env.SERVER,
	port: parseInt(process.env.PORT_DB),
	database: "Productivity",
	options: {
		encrypt: 1,
		trustServerCertificate: 1,
		connectionTimeout: 3000,
		authentification: "ActiveDirectoryIntegrated"
	}
};

const connect = async () => {
	try {
		const CONNECTION = mssql.connect(DRIVER);
		console.log("Connected to the database");
		return CONNECTION;
	} catch (err) {
		console.log(err);
		return null;
	}
};

module.exports = {
	connect
};
