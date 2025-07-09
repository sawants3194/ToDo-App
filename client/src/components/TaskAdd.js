import React, { useState } from 'react';
import {  useHistory } from 'react-router-dom';
import { API } from '../Backend';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import '../styles.css';
 
const TaskAdd = () => {
    const history = useHistory(); // Using useHistory instead of useNavigate

    const {user , token} = isAuthenticated();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [state, setState] = useState('active');
    const [error, setError] = useState(null);  // To handle error state

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        if (!title || !description) {
            setError('Title and Description are required!');
            return;
        }

        const newTask = {
            title,
            description,
            state,
        };

        // Make sure userId exists before sending request
        if (!user._id) {
            setError('User ID is required');
            return;
        }

        console.log()
        try {
            // Send a POST request to the backend to create the task
            const response = await fetch(`${API}/task/create/${user._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newTask),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Task created successfully:', data);
                // Reset form fields and navigate after successful task creation
                setTitle('');
                setDescription('');
                setState('active');
                setError(null); // Clear any previous errors
                history.push(`/taskscreen?userId=${user._id}`); // Use history.push for navigation
            } else {
                setError('Failed to create task, please try again.');
            }
        } catch (err) {
            console.error('Error creating task:', err);
            setError('Failed to create task, please try again.');
        }
    };

    return (
        <Base>
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <select value={state} onChange={(e) => setState(e.target.value)}>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                </select>
                <button type="submit">Add Task</button>
            </form>

            {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
        </div>
        </Base>
    );
};

export default TaskAdd;
