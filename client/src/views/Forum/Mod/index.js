import React, { useEffect } from 'react';
import { Switch, Route } from "react-router-dom"
import UsersMod from "./UsersMod";
import { WithBanner } from '../../../components/Banner';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { populateUsers } from '../../../store/adminSlice';

const pages = [
    { path: "/home", name: "Home" },
    { path: "/forum", name: "Forum" }
]

const Mod = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Fetching mod info");
        axios.get('/forum/mod/userslist').then(response => console.log(response) || dispatch(populateUsers(response.data || [])));
    }, []);
    return <Switch>
        <Route exact path="/forum/mod"
            component={UsersMod} />
    </Switch>
}

export default WithBanner(Mod, pages);