import React, {Suspense, lazy} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Lazy load components
const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));
const TaskScreen = lazy(() => import("./components/TaskScreen"));
const TaskDetails = lazy(() => import("./components/TaskDetails"));
const EditTask = lazy(() => import("./components/TaskEdit"));
const TaskAdd = lazy(() => import("./components/TaskAdd"));
const Forgot = lazy(() => import("./components/Forgot"));
const NewPassword = lazy(() => import("./components/NewPassword"));

const RouterList = () => {
    return (
        <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>

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
        </Suspense>
        </BrowserRouter>
    );
};

export default RouterList;
