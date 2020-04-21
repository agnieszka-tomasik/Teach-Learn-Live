import React, { useEffect } from 'react';
import { Switch, Route, Link } from "react-router-dom"
import CoursesAdmin from "./Courses/CoursesAdmin";
import UsersAdmin from "./Users/UsersAdmin";
import BlogAdmin from "./Blog/BlogAdmin";
import NewsletterAdmin from "./Newsletter/NewsletterAdmin";
import { WithBanner } from '../../components/Banner';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { populateEmails, populatePosts, populateUsers } from '../../store/adminSlice';

const pages = [
    { path: "/home", name: "Home", description: "Navigate back to the landing page." },
    { path: "/admin/courses", name: "Courses", description: "View and modify course data" },
    { path: "/admin/users", name: "Users", description: "View and modify user data" },
    { path: "/admin/blog", name: "Blog", description: "View and modify blog data" },
    { path: "/admin/newsletter", name: "Newsletter", description: "View and modify newsletter emails" },
]

const Cards = () => {
    return <div className="container">
            <h1 className="title">Admin Panel</h1>
            {pages.map(page => {
                return <Link key={page.path} to={page.path}>
                        <div className="card-row">
                            <div className="title is-4">{page.name}</div>
                            {page.description}
                        </div>
                    </Link>
            })}
        </div>
}

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
            component={Cards} />
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