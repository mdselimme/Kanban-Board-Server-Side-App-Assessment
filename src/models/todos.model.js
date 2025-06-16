const { Schema, model } = require("mongoose");


// Todos Schema Models 
const todosSchemaModel = new Schema({
    userId: { type: String, required: true },
    todoTitle: { type: String, required: true, trim: true },
    todoDescription: { type: String, required: true },
    todoDeadline: { type: Date, required: true },
    todoPriority: {
        type: String,
        required: true,
        enum: ["High", "Medium", "Low"]
    },
    todoStatus: {
        type: String,
        required: true,
        enum: ["todo", "in_progress", "done"],
        default: "todo"
    }
},
    { versionKey: false, timestamps: true }
);

const TodoModel = model("todos", todosSchemaModel);

module.exports = TodoModel;