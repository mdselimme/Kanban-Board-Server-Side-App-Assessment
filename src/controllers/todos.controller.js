const express = require('express');
const TodoModel = require('../models/todos.model');
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const todosRouter = express.Router();


// Add Todos Into the servers 
todosRouter.post('/add-todo', async (req, res) => {
    try {
        const todoBody = req.body;
        const new_todo = await TodoModel.create(todoBody);
        return res.status(201).json({ success: true, message: "Todo Added Successfully.", todoTitle: new_todo.todoTitle });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});


module.exports = todosRouter;