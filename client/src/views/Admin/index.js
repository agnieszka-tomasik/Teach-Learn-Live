import React, { useEffect } from 'react';
import { Switch, Route } from "react-router-dom"
import CoursesAdmin from "./Courses/CoursesAdmin";
import UsersAdmin from "./Users/UsersAdmin";
import BlogAdmin from "./Blog/BlogAdmin";
import NewsletterAdmin from "./Newsletter/NewsletterAdmin";
import { WithBanner } from '../../components/Banner';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { populateEmails, populatePosts, populateUsers } from '../../store/adminSlice';

const pages = [
    { path: "/home", name: "Home" },
    { path: "/admin/courses", name: "Courses" },
    { path: "/admin/users", name: "Users" },
    { path: "/admin/blog", name: "Blog" },
    { path: "/admin/newsletter", name: "Newsletter" },
]

const Admin = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Fetching admin info");
        axios.get('/admin/users/userslist').then(response => console.log(response) || dispatch(populateUsers(response.data || [])));
        axios.get('/admin/newsletter/emails').then( response => dispatch(populateEmails(response.data || [])));
        axios.get('/admin/blog/posts').then(response => dispatch(populatePosts(response.data || [])));
    }, []);
    return <Switch>
        <Route exact path="/admin/"
            component={() => <></>} />
        <Route exact path="/admin/courses"
            component={CoursesAdmin} />
        <Route exact path="/admin/users"
            component={UsersAdmin} />
        <Route exact path="/admin/blog"
            component={BlogAdmin} />
        <Route exact path="/admin/newsletter"
            component={NewsletterAdmin} />
    </Switch>
}

export default WithBanner(Admin, pages);