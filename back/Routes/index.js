//IMPORTS
import express from "express";
// CONTROLLERS

import { getAllTask, getTaskById, createTask, updateTask, deleteTask } from "../Controllers/TaskController.js";

export const router = express.Router();

// Category routes
router.get('/task', getAllTask);
router.get('/task/:id', getTaskById);
router.post('/task', createTask);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);
