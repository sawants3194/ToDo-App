const express = require("express");


const { body, check, validationResult } = require("express-validator");
const { createTask, updateTask, deleteTask, getAllTasksByUserId,searchTasks, getTaskById, updateTaskState, updateTaskById } = require("../controllers/taskController");
const router = express.Router();


router.post("/task/create/:userId", createTask);

router.get("/task/search", searchTasks);

router.put('/task/state/update/:taskId', updateTaskState);

router.put('/task/update/:taskId', updateTaskById);

router.delete('/task/bulkRemove', deleteTask);

router.get('/task/getAll/:userId', getAllTasksByUserId);

router.get('/task/getById/:taskId', getTaskById)


module.exports = router;
   