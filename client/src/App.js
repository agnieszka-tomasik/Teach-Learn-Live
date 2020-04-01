import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import ForumPage from "./views/Forum/ForumPage";
import Home from "./views/Home/Home";
import Courses from "./views/Courses/Courses";
import Register from "./views/Login/Register";
import Login from "./views/Login/Login";
import NotFound from "./views/NotFound";
import { StateProvider } from './store/store';
import "./App.css";
import Admin from './views/Admin';

// const courses = get courseslist

const App = () => {
  return (
    <StateProvider>
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/forum" component={ForumPage}/>
        <Route path="/courses" component={Courses} />
        <Route path="/admin" component={Admin}/>
        <Route component={NotFound}/>
      </Switch>
    </StateProvider>
  );
}

export default App;
