import React, { useEffect, useState } from 'react';
import {  useHistory } from 'react-router-dom';
import axios from 'axios';
import { API } from "../Backend";
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';

const TaskScreen = () => {
    const history = useHistory();
    const { user, token}  =  isAuthenticated()
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [allTasks, setAllTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${API}/task/getAll/${user._id}?page=${page}`,{headers: {
                    'Authorization': `Bearer ${token}`,
                }});
                const fetchedTasks = response.data.tasks;
                setAllTasks(fetchedTasks);
                setTotalPages(response.data.totalPages);
                applyFilter(filter, fetchedTasks);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        }; 

        fetchTasks();
    }, [user._id, page, filter, token]);

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
                axios.patch(`${API}/task/update/${taskId}`, { state: updatedTask.state }, {headers: {
                    'Authorization': `Bearer ${token}`,
                },})
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

   

    

    const handleTaskTitleClick = (taskId) => {
        history.push(`/task/details/${taskId}`);
    };

    return (
        <Base>
        <div>
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
        </div>
        </Base>
    );
};

export default TaskScreen;
