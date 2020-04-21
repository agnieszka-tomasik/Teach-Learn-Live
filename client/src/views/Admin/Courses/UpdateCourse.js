import React, { useState } from 'react';
import axios from 'axios';
import "../Admin.css"
import useToasts from '../../../components/Toasts';

const UpdateCourse = (props) => {
    const [updatedCourse, setUpdatedCourse] = useState(props.selectedCourse);
    React.useEffect(() => {
        setUpdatedCourse(props.selectedCourse);
    }, [props.selectedCourse])
    const { addError, addSuccess } = useToasts();

    const handleTitleChange = (text) => {
        text.persist();
        let newCourse = Object.assign({}, updatedCourse);
        newCourse.title = text.target.value;
        setUpdatedCourse(newCourse);
    }

    const handleDescChange = (text) => {
        text.persist();
        let newCourse = Object.assign({}, updatedCourse);
        newCourse.description = text.target.value;
        setUpdatedCourse(newCourse);
    }

    const handlePriceChange = (text) => {
        text.persist();
        setUpdatedCourse(prevState => ({
            ...prevState,
            price: parseFloat(text.target.value)
        }))
    }
    const handleClick = (e) => {
        e.preventDefault();
        axios.post('/admin/courses/update', updatedCourse)
            .then(response => {
                if (response.status === 200) {
                    addSuccess("Successfully updated course!");
                    props.coursesUpdate(response.data);

                } else {
                    console.log(`Update Course fail ${response.data}`);
                    addError(response.data);
                }
            }).catch(e => {
                console.log(`Update Course fail ${e}`);
                addError('Update Course fail');
            });
    }

    return (
        <div>
            <h1 className="title">Update Course:</h1>
            <form>
                <input type='text' className='inputtext' id='title' placeholder={props.selectedCourse.title} onChange={handleTitleChange} />
                <input type='text' className='inputtext' placeholder={props.selectedCourse.description} onChange={handleDescChange} />
                <input type='number' className='inputtext' placeholder='Price' placeholde={props.selectedCourse.price} onChange={handlePriceChange}/>
                <button className='button' onClick={handleClick}>Update</button>
            </form>
        </div>
    );

};

export default UpdateCourse;