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
const userRouter = require('../controllers/users.controller');
const todosRouter = require('../controllers/todos.controller');



// use all routers 
app.use("/users", userRouter);
app.use("/todos", todosRouter);


app.get('/', async (req, res) => {
    res.send("Kanban Board Server is Running...");
});




module.exports = app;