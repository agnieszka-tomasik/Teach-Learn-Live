import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import Courses from "./views/Courses/Courses";
import NotFound from "./views/NotFound";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/courses" component={Courses} />
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
