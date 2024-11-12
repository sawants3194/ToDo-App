import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { API } from "../Backend"

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
            const userId = localStorage.getItem('userId');

            try {
                const response = await axios.get(`${API}/task/getAll/${userId}?page=${page}`);
                setAllTasks(response.data.tasks);
                setTotalPages(response.data.totalPages)
                setTasks(response.data.tasks);

                applyFilter(filter, response.data.tasks);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };

        fetchTasks();
    }, [userId, page]);

    const applyFilter = (filterValue, tasks) => {
        let filteredTasks = tasks;

        if (filterValue === 'active') {
            filteredTasks = tasks.filter(task => task.state === 'active');
        } else if (filterValue === 'completed') {
            filteredTasks = tasks.filter(task => task.state === 'completed');
        } else if (filterValue === 'all') {
            filteredTasks = tasks;  // Show all tasks when filter is 'all'
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
        setSearchTerm(e.target.value);

        const filteredTasks = tasks.filter((task) => {
            return (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase()))

        }
        )

        applyFilter(filter, filteredTasks);
    };


    const handleTaskCompletionToggle = async (taskId) => {
        const updatedTasks = tasks.map((task) => {
            if (task._id === taskId) {
                const updatedTask = { ...task, state: task.state === 'completed' ? 'active' : 'completed' };
                // Update task in backend
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

    // send a request to delete the completed tasks from the database as well
    const handleBulkRemoveCompleted = async () => {
        const completedTasks = tasks.filter(task => task.state === 'completed');
        try {
            await axios.delete(`${API}/task/bulkRemove`, { data: { tasks: completedTasks.map(task => task._id) } });
            const remainingTasks = tasks.filter(task => task.state !== 'completed');
            setTasks(remainingTasks);
        } catch (error) {
            console.error('Error removing completed tasks:', error);
        }
    };

    const handleTaskCreate = (userId) => {
        navigate(`/add-task?userId=${userId}`)
    }

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
            <button onClick={handleBulkRemoveCompleted}>Remove Completed</button>


        </div>
    );
};

export default TaskScreen;


