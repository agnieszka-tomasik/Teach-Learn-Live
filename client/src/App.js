import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import ForumPage from "./views/Forum/ForumPage";
import Home from "./views/Home/Home";
import Courses from "./views/Courses/Courses";
import Register from "./views/Login/Register";
import Login from "./views/Login/Login";
import NotFound from "./views/NotFound";
import CoursesAdmin from "./views/Admin/Courses/CoursesAdmin";
import UsersAdmin from "./views/Admin/Users/UsersAdmin";
import { StateProvider } from './store/store';

// const courses = get courseslist

const App = (props) => {
  return (
    <StateProvider>
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route 
          exact path="/forum" 
          render={() => <ForumPage posts={props.posts}/>} 
        />
        <Route exact path="/courses" component={Courses} />
        <Route 
          exact path="/admin/courses" 
          render={() => <CoursesAdmin courses={props.courses}/>} 
        />
        <Route 
          exact path="/admin/users" 
          render={() => <UsersAdmin users={props.users}/>} 
        />
        <Route component={NotFound}/>
      </Switch>
    </StateProvider>
  );
}

export default App;
