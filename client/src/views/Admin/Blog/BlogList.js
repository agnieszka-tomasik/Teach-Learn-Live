import React, {useState, useEffect} from 'react';
import DeleteBlog from './DeleteBlog';
import "../Admin.css"

const BlogList = (props) => {

    const updateSelectedPost = (id) => {
        props.selectedUpdate(id);
    };

    const rendList = props.data.filter((post) => {
        return (post.postTitle === props.filterText || props.filterText === "")
    })
    .map(post => {
        return (
            <tr className='tr' key={post.postTitle}>
                <td className='td' onClick={() => updateSelectedPost(post._id)}>{post.authUname} </td>
                <td className='td' onClick={() => updateSelectedPost(post._id)}>{post.postTitle} </td>
                <td className='td' onClick={() => updateSelectedPost(post._id)}>{post.postDate} </td>
                <DeleteBlog
                    id={post._id}
                    postsUpdate={props.postsUpdate}
                    setDelError={props.setDelError}
                />
            </tr>
        );
    });

    return <div>{rendList}</div>;
};
export default BlogList;
