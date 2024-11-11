import React from 'react'
import { BrowserRouter, Switch, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import TaskScreen from './components/TaskScreen'
import TaskDetails from './components/TaskDetails'
import EditTask from './components/TaskEdit'
import TaskAdd from './components/TaskAdd'


const RouterList = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/taskscreen" element={<TaskScreen/>} />
                <Route path="/task/details" element={<TaskDetails/>} />
                <Route path="/edit-task" element={<EditTask/>} />
                <Route path="/add-task" element={<TaskAdd/>} />
                
            </Routes>
        </BrowserRouter>
    )
}

export default RouterList
