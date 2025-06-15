const express = require('express');
const app = express();
const cors = require('cors');
const cookieSession = require('cookie-session');
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieSession({
    name: "kanban-board",
    keys: [process.env.TOKEN_SECRET],
    httpOnly: true
}));

// import all routers 
const userRouter = require('../controllers/users.controllers');



// use all routers 
app.use("/users", userRouter);


app.get('/', async (req, res) => {
    res.send("Kanban Board Server is Running...");
});




module.exports = app;