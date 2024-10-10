const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const jobRouter = require("./routes/job");

const app = express();
dotenv.config();
const env = process.env.ENV;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(incomingRequestLogger);
app.use("/api/v1", indexRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");

    if (env === "LOCAL") {
        mongoose.connect(process.env.LOCAL_MONGO, {
            dbName: "job-portal",
        });
        mongoose.connection.on("error", (err) => {
            console.log(err);
        });
    } else {
        mongoose.connect(process.env.MONGOOSE_URI_STRING, {
            dbName: "job-portal",
        });
        mongoose.connection.on("error", (err) => {
            console.log(err);
        });
    }
});
