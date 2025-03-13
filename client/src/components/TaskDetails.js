import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { API } from '../Backend';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';

const TaskDetails = ({ match }) => {
    const history = useHistory();
    const { taskId } = match.params;
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state

    const {  token } = isAuthenticated();

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const response = await axios.get(`${API}/task/getById/${taskId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response);
                setTask(response.data.task);
                setLoading(false); // Set loading to false after task is fetched
            } catch (error) {
                console.error('Failed to fetch the task details:', error);
                setLoading(false);
            }
        };

        fetchTaskDetails();
    }, [taskId, token]);

    

    const handleEditTask = () => {
        history.push(`/edit-task/${taskId}`);
    };

    

    return (
        <Base>
            <div>
                <h3>Task Details:</h3>
                {loading ? (
                    <p>Loading task details...</p>
                ) : task ? (
                    <div className="task-tile">
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                        {/* <label>
                            <input
                                type="checkbox"
                                checked={task.state === 'completed'}
                                onChange={handleTaskCompletionToggle}
                            />
                            Mark as {task.state === 'completed' ? 'Active' : 'Completed'}
                        </label> */}
                        <button onClick={handleEditTask}>Edit Task</button>
                        {/* <button onClick={handleDeleteTask}>Delete Task</button> */}
                        <p style={{ color: "black", marginTop: "10px" }}>If you want to delete a task, 
                            just mark it as completed in the Edit Task button.</p>
                    </div> 
                ) : (
                    <p>Task not found.</p>
                )}
            </div>
        </Base>
    );
};

export default TaskDetails;
