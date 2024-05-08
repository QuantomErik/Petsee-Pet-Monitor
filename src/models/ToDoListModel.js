// src/models/ToDoListModel.js

import mongoose from 'mongoose'

const toDoListSchema = new mongoose.Schema({
    task: { type: String, required: true },
    /* text: { type: String, required: true }, */
    isCompleted: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
})

export const ToDoListModel = mongoose.model('ToDoList', toDoListSchema)
