import React, { useState, useEffect } from 'react';
import Search from './Search';
import ViewBlog from './ViewBlog';
import BlogList from './BlogList';
import AddBlog from "./AddBlog";
import "../Admin.css"
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { populatePosts } from '../../../store/adminSlice';
import Table from '../AdminTable';
import useToasts from '../../../components/Toasts';

const BlogAdmin = (props) => {
    const [filterText, setFilterText] = useState('');
    const [selectedPost, setSelectedPost] = useState('');

    //todo refactor
    const posts = useSelector(state => state.admin.posts);
    const dispatch = useDispatch();
    const setPosts = (x) => dispatch(populatePosts(x));
    const {addError} = useToasts();

    const postsUpdate = (newPosts) => {
        setPosts(newPosts);
    };

    const addPost = (post) => {
        axios.post('/admin/blog/add', post)
            .then(response => {
                if (response.status === 200) {
                    setPosts(response.data);
                } else {
                    console.log(`Add Blog Post fail ${response.data}`);
                    addError(response.data);
                }
            }).catch(e => {
                console.log(`Add Blog Post fail ${e}`);
                addError("Add Blog Post fail");
            });
    };

    const filterUpdate = (value) => {
        setFilterText(value);
    };

    const selectedUpdate = (id) => {
        setSelectedPost(id);
    };

    return (
        <div className="bg">
            <div className="row">
                <h1 className="title">Manage Site Blog Posts</h1>
            </div>

            <Search
                filterUpdate={filterUpdate}
            />
            <main className='main'>
                <div className="row">
                    <div className="column1">
                        <Table
                            head={["Author", "Title", "Date"]}
                            body={
                                <BlogList
                                    data={posts}
                                    selectedUpdate={selectedUpdate}
                                    filterText={filterText}
                                    postsUpdate={postsUpdate}
                                />}
                        />
                    </div>
                    <div className="column2">
                        <ViewBlog
                            data={posts}
                            id={selectedPost}
                            postsUpdate={postsUpdate}
                        />
                    </div>
                    <div className="column2">
                        <AddBlog
                            className='AddCourse'
                            addPost={addPost}
                            data={posts}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};


export default BlogAdmin;
