import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const TaskScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId') || localStorage.getItem('userId');
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [filter, setFilter] = useState('all');
    useEffect(() => {
        const fetchTasks = async () => {
            const userId = localStorage.getItem('userId');

            try {
                const response = await axios.get(`http://localhost:8000/api/v1/task/getAll/${userId}?page=${page}`);
                console.log(response.data)
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
        let filteredTasks = [];
        if (filterValue === 'all') {
            filteredTasks = tasks;
        } else if (filterValue === 'active') {
            filteredTasks = tasks.filter(task => task.state === 'active');
        } else if (filterValue === 'completed') {
            filteredTasks = tasks.filter(task => task.state === 'completed');
        }
        setTasks(filteredTasks);
    };

    const handleFilterChange = e => {
        const filterValue = e.target.value;
        setFilter(filterValue);
        applyFilter(filterValue, tasks);
    };
    const handlePreviousPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);

        const filteredTasks = tasks.filter((task) => {
            return (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase()))

        }
        )

        setTasks(filteredTasks)
    };



    const handleTaskCompletionToggle = async (taskId) => {


    };

    const handleBulkRemoveCompleted = () => {
        const updatedTasks = tasks.filter(task => task.state != 'completed');
        setTasks(updatedTasks);
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


