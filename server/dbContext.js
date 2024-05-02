const mssql = require("mssql");
require("dotenv").config();

const DRIVER = {

	user: process.env.UID,
	password: process.env.PASSWORD,
	server: process.env.SERVER,
	port: parseInt(process.env.PORT),
	database: process.env.INITIAL_CATALOG,
	options: {
		encrypt: process.env.ENCRYPT === "yes",
		trustServerCertificate: process.env.TRUSTSERVERCERTIFICATE === "yes",
		connectionTimeout: parseInt(process.env.CONNECTIONTIMEOUT),
		authentification: process.env.AUTHENTIFICATION
	}
	
};

const connect = async () => {
	try {
		const CONNECTION =  mssql.connect(DRIVER);
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
