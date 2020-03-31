import React, {useState, useEffect} from 'react';
import Search from './Search';
import ViewBlog from './ViewBlog';
import BlogList from './BlogList';
import AddBlog from "./AddBlog";
import "../Admin.css"
import axios from 'axios';

const BlogAdmin = (props) => {
    const [filterText, setFilterText] = useState('');
    const [selectedPost, setSelectedPost] = useState('');
    const [posts, setPosts] = useState(props.posts);
    const [addError, setAddError] = useState(null);
    const [delError, setDelError] = useState(null);
    const [upError, setUpError] = useState(null);


    const postsUpdate = (newPosts) => {
        setPosts(newPosts);
    };

    const addPost = (post) => {
        axios.post('/admin/blog/add', post)
            .then(response => {
                if (response.status === 200) {
                    setPosts(response.data);
                    setAddError(null);
                } else {
                    console.log(`Add Blog Post fail ${response.data}`);
                    setAddError(response.data);
                }
            }).catch(e => {
                console.log(`Add Blog Post fail ${e}`);
                setAddError("Add Blog Post fail");
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
                <h1>Manage Site Blog Posts</h1>
            </div>

            <Search
                filterUpdate={filterUpdate}
            />
            <main className='main'>
                <div className="row">
                    <div className="column1">
                        <div className="tableWrapper">
                            <table className="table table-striped table-hover">
                                <tr className='tr'>
                                    <td className='td'>
                                        <b>Author Title Date</b>
                                    </td>
                                </tr>
                                <BlogList
                                    data={posts}
                                    selectedUpdate={selectedUpdate}
                                    filterText={filterText}
                                    postsUpdate={postsUpdate}
                                    setDelError={setDelError}
                                />
                                {delError && <p className="is-danger">{delError}</p>}
                            </table>
                        </div>
                    </div>
                    <div className="column2">
                        <ViewBlog
                            data={posts}
                            id={selectedPost}
                            postsUpdate={postsUpdate}
                            setUpError={setUpError}
                        />
                        {upError && <p className="is-danger">{delError}</p>}
                    </div>
                    <div className="column2">
                        <AddBlog 
                            className='AddCourse' 
                            addPost={addPost} 
                            data={posts}
                        />
                        {addError && <p className="is-danger">{addError}</p>}
                    </div>
                </div>
            </main>
        </div>
    );
};


export default BlogAdmin;
