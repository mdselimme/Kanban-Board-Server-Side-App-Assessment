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

// get All todos 
todosRouter.get('/user-todo/:userId', async (req, res) => {
    try {
        const user_id = req.params.userId;
        const todosByUser = await TodoModel.find({ userId: { $eq: user_id } });
        res.status(200).json(todosByUser)
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// get Single Todo by id
todosRouter.get('/todo/:todoId', async (req, res) => {
    try {
        const todo_id = req.params.todoId;
        const todo = await TodoModel.findById(todo_id);
        res.status(200).json(todo);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// Todo Status Change By id
todosRouter.patch('/update-status/:todoId', async (req, res) => {
    try {
        const todo_id = req.params.todoId;
        const updateStatus = req.body;
        const updateBody = await TodoModel.findByIdAndUpdate(todo_id, updateStatus);
        return res.status(201).json({ success: true, message: "Todo Status Update Successfully.", status: updateBody.todoStatus });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// Todo Update By id
todosRouter.put('/update-todo/:todoId', async (req, res) => {
    try {
        const todo_id = req.params.todoId;
        const updateStatus = req.body;
        const updateBody = await TodoModel.findByIdAndUpdate(todo_id, updateStatus);
        return res.status(201).json({ success: true, message: "Todo Update Successfully.", todoTitle: updateBody.todoTitle });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});



//delete A todos 
todosRouter.delete('/delete/:deleteId', async (req, res) => {
    try {
        const delete_id = req.params.deleteId;
        const deleteResult = await TodoModel.findByIdAndDelete(delete_id);
        return res.status(201).json({ success: true, message: "Delete Todo Successfully", todoTitle: deleteResult.todoTitle });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});


module.exports = todosRouter;