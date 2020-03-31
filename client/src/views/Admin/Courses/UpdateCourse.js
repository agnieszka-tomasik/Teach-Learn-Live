import React, {useState} from 'react';
import axios from 'axios';
import "../Admin.css"

const UpdateCourse = (props) => {
    const [updatedCourse, setUpdatedCourse] = useState(props.selectedCourse);

    const handleTitleChange = (text) => {
        text.persist();
        let newCourse = updatedCourse;
        newCourse.courseTitle = text.target.value;
        setUpdatedCourse(newCourse);
    }

    const handleDescChange = (text) => {
        text.persist();
        let newCourse = updatedCourse;
        newCourse.courseDesc = text.target.value;
        setUpdatedCourse(newCourse);
    }

    const handleClick = () => {
        axios.post('/admin/courses/update', updatedCourse)
            .then(response => {
                if (response.status === 200) {
                    props.coursesUpdate(response.data);
                    props.setUpError(null);
                } else {
                    console.log(`Update Course fail ${response.data}`);
                    props.setUpError(response.data);
                }
            }).catch(e => {
                console.log(`Update Course fail ${e}`);
                props.setUpError('Update Course fail');
            });
    }

    return (
        <div>
            <h1>Update Course:</h1>
        <form>
            <input type='text' className='inputtext' id='title' placeholder={props.selectedCourse.courseTitle} onChange={handleTitleChange}/>
            <input type='text' className='inputtext' placeholder={props.selectedCourse.courseDesc} onChange={handleDescChange}/>
            <button className='button' onClick={handleClick}>Update</button>
        </form>
        </div>
    );

};

export default UpdateCourse;