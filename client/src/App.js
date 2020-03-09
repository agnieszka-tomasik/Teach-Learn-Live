import React, {useState} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import Forum from "./views/Forum/Forum";
import NavBar from "./components/Header/NavBar";

const App = (props) => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route
        component={Forum}/>
      </Switch>
    </div>
  );
}

export default App;
