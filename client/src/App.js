import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from "./views/Home/Home";
import Courses from "./views/Courses/Courses";
import Register from "./views/Login/Register";
import Login from "./views/Login/Login";
import NotFound from "./views/NotFound";
import { StateProvider } from './store/store';

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
        <Route exact path="/courses" component={Courses} />
        <Route component={NotFound}/>
      </Switch>
    </StateProvider>
  );
}

export default App;
