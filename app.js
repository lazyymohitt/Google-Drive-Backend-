const express = require("express"); 
const app = express();
const cookieParser = require('cookie-parser')

const userRouter = require("./Routes/user.routes");
const dotenv = require('dotenv');
const connectToDB = require('./config/db');

const homeRouter = require("./Routes/home.routes")

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/",homeRouter)

dotenv.config();
connectToDB();
app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("console has been started");
});
