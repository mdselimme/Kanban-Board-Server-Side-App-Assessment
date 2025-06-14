const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

// import all routers 
const userRouter = require('../routes/user.routes');


// use all routers 
app.use("/user", userRouter);


app.get('/', async (req, res) => {
    res.send("Kanban Board Server is Running...");
});




module.exports = app;