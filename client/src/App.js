import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ForumPage from "./views/Forum/ForumPage";
import Home from "./views/Home/Home";
import Courses from "./views/Courses/Courses";
import Register from "./views/Login/Register";
import Login from "./views/Login/Login";
import NotFound from "./views/NotFound";
import { StateProvider } from './store/store';
import "./App.css";
import Admin from './views/Admin';
import Mod from './views/Forum/Mod';
import { useSelector } from 'react-redux';

//Specifies an AUTH boolean requirement to be true.
const AuthRoute = ({ component: Component, auth, ...rest }) => {
    return <Route {...rest}
        render={(props) => auth
            ? <Component {...props} />
            : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />} />;
}
const App = () => {
    return (
        <StateProvider>
            <Main />
        </StateProvider>
    );
}

const Main = () => {
    const isAdmin = useSelector(state => state.user.profile.isAdmin);
    // TODO refactor how profile data is loaded, as it stands 
    // if user is logged in and tries to access the forum directly from link it fails to recognized them as 
    // authenticated.
    const isLoggedIn = useSelector(state => state.user.authenticated);
    return <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/">
            <Redirect to="/home" />
        </Route>
        <Route path="/courses" component={Courses} />
        <Route path="/forum/mod" component={Mod} />
        <Route path="/forum" component={ForumPage} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
    </Switch>

}

export default App;
