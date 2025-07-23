require('dotenv').config()
const Task = require('../models/task')
var ObjectId = require('mongodb').ObjectId;
exports.createTask = async (req, res) => {
    const { userId } = req.params;
    const { title, description, state, taskDate  } = req.body;
    try {
        const todo = new Task({
            title,
            description,
            state,
            taskDate ,
            user: userId,
        });
        await todo.save();
        return res.json({todo, "success": true});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the task' });
    }


}

// Search for tasks
// exports.searchTasks = async (req, res) => {
//     const { search } = req.query;
//     try {
//         const tasks = await Task.find({
//             $or: [
//                 { title: { $regex: search, $options: 'i' } },
//                 { description: { $regex: search, $options: 'i' } },
//             ],
//         });
//         res.json(tasks);
//     } catch (error) {
//         res.status(500).json({ error: 'An error occurred while searching for tasks' });
//     }
// };

exports.searchTasks = async(req , res) => {
    const { search } = req.query;
    // validate search query
    if(!search || search.trim() == ''){
        return res.status(400).json({error: 'search query is required'});
    }

    try{
        const tasks = await Task.find({
            $or:[
                { title: {$regex : search, $options:'i'}},
                { description: {$regex : search, $options:'i'}}
                

            ],
            }).exec(); //Added exec for better error handling with mongoose queries

            if(tasks.length == 0){
                return res.status(404).json({ message : 'No tasks found'});
            }
        return    res.json(tasks);
        
    }
    catch(error){
        res.status(500).json({ 
            message : 'An error occured while searching for tasks',
            error:error
            });
    }
}


exports.updateTaskState = async (req, res) => {
    try {
        var taskId = req.params.taskId
        var { newState } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            throw new Error('Task not found');
        }

        // Update the state of the task
        task.state = newState;
        // Validate and save the updated task
        await task.validate();
        await task.save();


        res.json(task)
    } catch (error) {
        console.error('Failed to update task state:', error);
    }

}

exports.deleteTask = async (req, res) => {
    try {
        const { tasks } = req.body; // Array of task IDs passed in the request body

        if (!tasks || tasks.length === 0) {
            return res.status(400).json({ message: 'No tasks to delete' });
        }

        // Remove tasks by their IDs if they are completed
        const deletedTasks = await Task.deleteMany({
            _id: { $in: tasks },
            state: 'completed'
        });

        if (deletedTasks.deletedCount === 0) {
            return res.status(404).json({ message: 'No completed tasks found to delete' });
        }

        res.status(200).json({ message: `${deletedTasks.deletedCount} completed tasks removed successfully.` });
    } catch (error) {
        console.error('Error removing tasks:', error);
        res.status(500).json({ message: 'Failed to remove completed tasks', error: error.message });
    }
}

exports.getAllTasksByUserId = async (req, res) => {
   try {
    const userId = req.params.userId;
    const { page = 1, limit = 5, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const skipCount = (page - 1) * limit;

    const sortOptions = {
      [sortBy]: sortOrder === 'asc' ? 1 : -1,
    };

    const totalTasksCount = await Task.countDocuments({ user: userId });
    const totalPages = Math.ceil(totalTasksCount / limit);

    const tasks = await Task.find({ user: userId })
      .sort(sortOptions)
      .skip(skipCount)
      .limit(Number(limit)); // Ensure limit is numeric

    // Grouping logic
    const groupedTasks = {};
    tasks.forEach(task => {
      const dateKey = new Date(task.createdAt).toISOString().split('T')[0];
      if (!groupedTasks[dateKey]) groupedTasks[dateKey] = [];
      groupedTasks[dateKey].push(task);
    });

    res.json({ groupedTasks, totalPages });

  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}
 
exports.getTaskById = async (req, res) => {
 
    try {  
        const { taskId } = req.params;


        // Find tasks by user ID
        const task = await Task.findById(taskId);

        res.json({ task, "Success": true });
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    } 
}  

exports.updateTaskById = async (req, res) => {
    const taskId = req.params.taskId;
    const updatedData = req.body;

    try {
        // Check if taskId is provided
        if (!taskId) {
            return res.status(400).json({ error: 'Task ID is required' });
        }

        // Attempt to update the task
        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId },
            updatedData,
            { new: true, runValidators: true } // `new: true` returns the updated document, `runValidators: true` validates updated data
        );

        // If no task was found, send a 404 response
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Return the updated task
        return res.json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({ error: 'An error occurred while updating the task' });
    }
};
