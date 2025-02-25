const express = require("express"); 
const app = express();
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
const userRouter = require("./routes/user.routes");
const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require('./config/db');
connectToDB();

app.set("view engine", "ejs");
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("console has been started");
});
