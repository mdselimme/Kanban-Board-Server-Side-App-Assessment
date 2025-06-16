const { Schema, model } = require("mongoose");



const todosSchemaModel = new Schema({
    userId: { type: String, required: true },
    todoTitle: { type: String, required: true, trim: true },
    todoDescription: { type: String, require: true },
    todoDeadline: { type: Date, require: true },
    todoPriority: {
        type: String,
        required: true,
        enum: ["High", "Medium", "Low"]
    }
});

const TodoModel = model("todos", todosSchemaModel);

module.exports = TodoModel;