import React from 'react';
import { Switch, Route } from "react-router-dom"
import CoursesAdmin from "./Courses/CoursesAdmin";
import UsersAdmin from "./Users/UsersAdmin";
import BlogAdmin from "./Blog/BlogAdmin";
import NewsletterAdmin from "./Newsletter/NewsletterAdmin";
import { WithBanner } from '../../components/Banner';

const pages = [
 {path: "/home", name: "Home"},
 {path: "/admin/courses", name: "Courses"},
 {path: "/admin/users", name: "Users"},
 {path: "/admin/blog", name: "Blog"},
 {path: "/admin/newsletter", name: "Newsletter"},
]
const Admin = () => {
    return <Switch>
        <Route exact path="/admin/"
            component={() => <></>}/>
        <Route exact path="/admin/courses"
            component={CoursesAdmin}/>
        <Route exact path="/admin/users"
            component={UsersAdmin}/>
        <Route exact path="/admin/blog"
            component={BlogAdmin}/>
        <Route exact path="/admin/newsletter"
            component={NewsletterAdmin}/>
    </Switch>
}

export default WithBanner(Admin, pages);