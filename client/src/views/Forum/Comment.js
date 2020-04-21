import React, { useState } from 'react';
import './Forum.css'

/* Each comment has one RefBox that is not displayed unless active.
** The box becomes active when the comment's hyperlink reference is hovered over.
**
** The active box displays the information of the comment whose reference
** is being hovered over.
*/
const RefBox = (props) => {
    const ref = props.commentRef;

    let text;

    /* Don't allow refbox to have more hyperlinks.
    ** Instead just put the authUname without link.
    ** This replaces the not very appealing tag that would
    ** appear in the text of the comment being referenced
    ** with the authUname of the comment the tag would
    ** reference.
    **
    ** Kind of a middle ground between just showing the tag and making it an actual hyperlink.
    ** I chose this because I thought it unwise to have hyperlinks to hyperlinks and so on...
    */
    if (ref) {
        text = ref.postText.replace(/<replyTo:(\w*)>/g, (match, id, offset, string) => {
            return props.commentList.find(comment => comment._id === id).authUname;
        });
    }

    /* If there is no ref, nothing is returned, otherwise everything in the div is output */
    return (
        ref &&
        <div className="Ref-box">
            {text}
        </div>
    );
}

/** Hyperlink reference that results from replying **/
const CommentRef = (props) => {
    return (
        <a href={"#" + props.commentRef._id}
            onMouseOver={() => { props.select(props.commentRef) }}
            onMouseOut={() => { props.select(null) }} >
            {props.commentRef.authUname}
        </a>
    );
}

const Comment = (props) => {
    /* Refs refer to the references to other comments made by replying
    **
    ** The reference appears as a hyperlink of the authUname of the person
    ** whose comment is being referenced by a reply.
    **
    ** That reference is selected by hovering over the hyperlink.
    **
    ** Selecting the reference causes a box (RefBox) to show up, containing the information
    ** of the comment being referenced via a reply.
    */
    const [selectedRef, selectRef] = useState(null);

    const selectRefWrapper = (ref) => {
        selectRef(ref);
    }

    const commentList = props.parent.comments;
    const text = props.data.postText;


    /* I split the comment's single string around reply tags 
    ** this will break the string into chunks containing either
    ** regular text input by the user or just the _id of the
    ** comment that is supposed to have a reference at that point.
    */
    const splitBodyText = text.split(/<replyTo:(\w*)>/);


    /* Now I map each string to the necessary component.
    ** If the string is not the _id for some comment it should
    ** just be seen as text.
    ** Otherwise there needs to be a hyperlink reference for the
    ** matching comment.
    **
    ** Note: I use the indices as keys. This array is const so it
    ** will not change size or contents. The strings matching comment ids
    ** could use the comment id as a key, but the strings do not have
    ** a unique identifier to use as a key.
    **
    ** So while using indices as keys is generally discouraged, because of
    ** the static nature of the array it should be fine in this case.
    */
    let commentToReference;
    const bodyAsComponents = splitBodyText.map((str, index) => {
        commentToReference = commentList.find(comment => str === comment._id);
        if (commentToReference)
            return <CommentRef commentRef={commentToReference} select={selectRefWrapper} key={index} />;
        else
            return <span key={index}>{str}</span>;
    });

    return (
        <div className="Comment-box" key={props.data._id} >
            <article class="media">
                <div class="media-content">
                    <div class="content">
                        <p>
                            <i>{props.data.authUname}</i>
                            <br />
                            {bodyAsComponents}
                            <br />
                            <small>{props.data.postDate}}</small>
                        </p>
                    </div>
                </div>
            </article>
            <button className="Comment-reply" onClick={props.addRef}>reply</button>
            <RefBox commentRef={selectedRef} commentList={commentList} />
        </div>
    );
}

export default Comment