import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { API } from '../Backend';
import { isAuthenticated } from '../auth/helper';

const EditTask = ({ match }) => {
    const history = useHistory();
    const { taskId } = match.params;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [state, setState] = useState('');
    const {  token } = isAuthenticated()
    const updatedData = {
        title,
        description,
        state,
    };

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const response = await axios.get(`${API}/task/getById/${taskId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response)
                setTitle(response.data.task.title);
                setDescription(response.data.task.description);
                setState(response.data.task.state);
            } catch (error) {
                console.error('Failed to fetch task details:', error);
            }
        };

        fetchTaskDetails();
    }, [taskId, token]);

    const handleStateChange = (event) => {
        const newState = event.target.value;
        setState(newState);
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`${API}/task/update/${taskId}`, updatedData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.status === 200) {
                // After successful update, navigate to the task details page
                history.push(`/task/details/${taskId}`);
            }
        } catch (error) {
            console.error('Error updating task:', error);
            // Handle error or display error message
        } 
    };

    return (
        <div>
            <label>
                Title:
                <input
                    className="input-field"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label>
                Description:
                <textarea
                    className="input-field"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <select value={state} onChange={handleStateChange}>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
            </select>
            <button className="submit-button" type="button" onClick={handleUpdate}>
                Update
            </button>
        </div>
    );
};

export default EditTask;
