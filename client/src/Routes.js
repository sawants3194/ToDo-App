import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskScreen from './components/TaskScreen';
import TaskDetails from './components/TaskDetails';
import EditTask from './components/TaskEdit';
import TaskAdd from './components/TaskAdd';
import Forgot from './components/Forgot';
import NewPassword from './components/NewPassword';

const RouterList = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/user/signin" component={Login} />
                <Route path="/user/signup" component={Signup} />
                <Route path="/taskscreen" component={TaskScreen} />
                <Route path="/task/details/:taskId" component={TaskDetails} />
                <Route path="/edit-task/:taskId" component={EditTask} />
                <Route path="/add-task" component={TaskAdd} />
                <Route path='/user/recover' exact component={Forgot} ></Route>
                <Route path='/user/newPassword' exact component={NewPassword} ></Route>

            </Switch>
        </BrowserRouter>
    );
};

export default RouterList;
