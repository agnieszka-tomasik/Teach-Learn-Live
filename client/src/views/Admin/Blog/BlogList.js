import React, { useState, useEffect } from 'react';
import DeleteBlog from './DeleteBlog';
import "../Admin.css"
import useToasts from '../../../components/Toasts';

const BlogList = (props) => {
    const {addError} = useToasts();

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
                            setDelError={addError}
                        />
                    </td>
                </tr>
            );
        });
    return rendList;
};
export default BlogList;
