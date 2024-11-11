import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const TaskDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const taskId = searchParams.get('taskId');
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/task/getById/${taskId}`);
                setTasks(response.data.task);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };

        fetchTasks();
    }, [taskId]);



    const handleTaskCompletionToggle = (taskId) => {
        // Implement the logic to toggle the completion state of the task
        // For example, make an API request to update the task's completion state in the backend
        // and update the tasks state in the frontend accordingly
    };

    const handleEditTask = () => {
        navigate(`/edit-task?taskId=${taskId}`)
    };
    const handleDeleteTask = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/v1/task/delete/${taskId}`);

            if (response.status === 200) {
                // Show a success message to the user
                
                // Optionally, you can update the task list state or fetch updated task list
                // after successful deletion
                
                // Optionally, you can redirect the user to the task list screen
                navigate(`/taskscreen?userId=${tasks.user}`);
              }
           
            // Handle successful deletion, e.g., show a success message or redirect to task list screen
        } catch (error) {
            console.error('Failed to delete task:', error);
            // Handle error, e.g., show an error message
        }
    };
    return (
        <div> 
            <Navbar/>
            <h3>Tasks:</h3>

            <div className="task-tiles">


                <div key={tasks._id} className="task-tile" >
                    <h4>{tasks.title}</h4>
                    <h4>{tasks.description}</h4>
                    <input
                        type="checkbox"
                        checked={tasks.state === 'completed'}
                        onChange={() => handleTaskCompletionToggle(tasks._id)}
                    />
                    <button onClick={handleDeleteTask}>Delete Task</button>
                    <button onClick={() => {
                        handleEditTask(tasks._id)
                    }}>Edit Task</button>
                </div>


            </div>
        </div>
    );
}

export default TaskDetails