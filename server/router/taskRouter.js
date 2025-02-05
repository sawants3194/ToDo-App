const express = require("express");


const { body, check, validationResult } = require("express-validator");
const { createTask, updateTask, deleteTask, getAllTasksByUserId,searchTasks, getTaskById, updateTaskState, updateTaskById } = require("../controllers/taskController");
const { isSignIn, isAuthenticated } = require("../controllers/userController");
const router = express.Router();

// Middleware for common user authentication
const authenticateUser = [isSignIn, isAuthenticated];
router.post("/task/create/:userId",authenticateUser, createTask);

router.get("/task/search",authenticateUser, searchTasks);

router.put('/task/state/update/:taskId',authenticateUser, updateTaskState);

router.put('/task/update/:taskId',authenticateUser, updateTaskById);

router.delete('/task/bulkRemove',authenticateUser, deleteTask);

router.get('/task/getAll/:userId', getAllTasksByUserId);

router.get('/task/getById/:taskId',authenticateUser, getTaskById)
  
 
module.exports = router;
   