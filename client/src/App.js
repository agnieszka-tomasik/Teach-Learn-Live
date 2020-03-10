import React, {useState} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import Forum from "./views/Forum/Forum";

const App = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route exact path="/Forum" component={Forum}/>
      </Switch>
    </div>
  );
}

export default App;
