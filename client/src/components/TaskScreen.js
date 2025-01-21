import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { API } from "../Backend";

const TaskScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId') || localStorage.getItem('userId');
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [allTasks, setAllTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${API}/task/getAll/${userId}?page=${page}`);
                const fetchedTasks = response.data.tasks;
                setAllTasks(fetchedTasks);
                setTotalPages(response.data.totalPages);
                applyFilter(filter, fetchedTasks);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };

        fetchTasks();
    }, [userId, page, filter]);

    const applyFilter = (filterValue, tasks) => {
        let filteredTasks = tasks;

        if (filterValue === 'active') {
            filteredTasks = tasks.filter(task => task.state === 'active');
        } else if (filterValue === 'completed') {
            filteredTasks = tasks.filter(task => task.state === 'completed');
        }

        setTasks(filteredTasks);
    };

    const handleFilterChange = e => {
        const filterValue = e.target.value;
        setFilter(filterValue);
        applyFilter(filterValue, allTasks);
    };

    const handlePreviousPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);

        const filteredTasks = allTasks.filter(task => {
            return (
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

        applyFilter(filter, filteredTasks);
    };

    const handleTaskCompletionToggle = async (taskId) => {
        const updatedTasks = tasks.map((task) => {
            if (task._id === taskId) {
                const updatedTask = { ...task, state: task.state === 'completed' ? 'active' : 'completed' };
                axios.patch(`${API}/task/update/${taskId}`, { state: updatedTask.state })
                    .then((response) => {
                        console.log('Task updated:', response.data);
                    })
                    .catch((error) => {
                        console.error('Error updating task:', error);
                    });
                return updatedTask;
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const handleBulkRemoveCompleted = () => {
        // Filter out the completed tasks from the tasks list
        const activeTasks = tasks.filter(task => task.state !== 'completed');
        setTasks(activeTasks);
    };

    const handleTaskCreate = () => {
        navigate(`/add-task?userId=${userId}`);
    };

    const handleTaskTitleClick = (taskId) => {
        navigate(`/task/details?taskId=${taskId}`);
    };

    return (
        <div>
            <Navbar />
            <label htmlFor="filter">Filter:</label>
            <select id="filter" value={filter} onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
            </select>
            <h3>Tasks:</h3>
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="task-tiles">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div key={task._id} className="task-tile" onClick={() => handleTaskTitleClick(task._id)}>
                            <h4>{task.title}</h4>
                            <input
                                type="checkbox"
                                checked={task.state === 'completed'}
                                onChange={() => handleTaskCompletionToggle(task._id)}
                            />
                        </div>
                    ))
                ) : (
                    <p>No tasks found.</p>
                )}
            </div>
            <div className="pagination">
                <button
                    className="pagination-button"
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span className="page-info">
                    Page {page} of {totalPages}
                </span>
                <button
                    className="pagination-button"
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
            <button onClick={handleBulkRemoveCompleted}>Show Active Tasks</button>
        </div>
    );
};

export default TaskScreen;
