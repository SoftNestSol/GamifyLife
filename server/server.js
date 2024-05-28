const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const functions = require("firebase-functions");

const corsOptions = {
	origin: "*",
	optionsSuccessStatus: 200,
	credentials: true,
	methods: "GET, POST, DELETE, PUT, PATCH"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//Routes
const userRouter = require("./routes/user");
app.use("/user", userRouter);

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});

exports.api = functions
	.region("europe-west1")
	.https.onRequest(app);
