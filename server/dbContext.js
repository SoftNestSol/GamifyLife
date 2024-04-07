const mssql = require("mssql");
require("dotenv").config();

const DRIVER = {
	/*

	SERVER = "tcp:productivity-app.database.windows.net"
PORT = "1433"
INITIAL_CATALOG = "Productivity"
Persist_Security_Info= "False"
USER_ID = "mds"
PASSWORD = "softnestdb#1"
MultipleActiveResultSets = "False"
Encrypt= "True"
TrustServerCertificate = "False"
Connection_Timeout = "1000"
	*/

	user: process.env.USER_ID,
	password: process.env.PASSWORD,
	server: process.env.SERVER,
	port: parseInt(process.env.PORT),
	database: process.env.INITIAL_CATALOG,
	options: {
		encrypt: true,
		enableArithAbort: true
	}
};

const connect = async () => {
	try {
		const CONNECTION = await mssql.connect(DRIVER);
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
