import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const TaskAdd = () => {
    const location = useLocation();

    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [state, setState] = useState('active')

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create a new task object
        const newTask = {
            title,
            description,
            state,
            
        };
        const userId = localStorage.getItem('userId');
        // Pass the new task to the parent component
        fetch(`http://localhost:8000/api/v1/task/create/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Response from server:', data);

                // Reset form fields
                // setTitle('');
                // setDescription('');
                // setState('active')
                navigate(`/taskscreen?userId=${userId}`);

            })
            .catch()


    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select value={state} onChange={(e) => setState(e.target.value)}>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                </select>
                <button type="submit">Add Task</button>
            </form>
        </>
    )
}

export default TaskAdd