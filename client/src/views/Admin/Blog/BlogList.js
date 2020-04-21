import React, { useState, useEffect } from 'react';
import DeleteBlog from './DeleteBlog';
import "../Admin.css"

const BlogList = (props) => {

    const updateSelectedPost = (id) => {
        props.selectedUpdate(id);
    };

    const rendList = props.data.filter((post) => {
        return (post.postTitle && post.postTitle.includes(props.filterText) || props.filterText === "")
    })
        .map(post => {
            return (
                <tr  key={post.postTitle}>
                    <td  onClick={() => updateSelectedPost(post._id)}>{post.authUname} </td>
                    <td  onClick={() => updateSelectedPost(post._id)}>{post.postTitle} </td>
                    <td  onClick={() => updateSelectedPost(post._id)}>{post.postDate} </td>
                    <td>
                        <DeleteBlog
                            id={post._id}
                            postsUpdate={props.postsUpdate}
                            setDelError={props.setDelError}
                        />
                    </td>
                </tr>
            );
        });
    return rendList;
};
export default BlogList;
