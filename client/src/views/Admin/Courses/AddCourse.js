import React, {useState} from 'react';
import "./CoursesAdmin.css"

const AddCourse = (props) => {
    const [newCourse, setNewCourse] = useState(
        {
            courseTitle: "",
            courseDesc: ""
        }
    );

    const handleTitleChange = (text) => {
        text.persist();
        setNewCourse(prevState => ({
            courseTitle: text.target.value,
            courseDesc: prevState.courseDesc
        }))
    };
    const handleDescChange = (text) => {
        text.persist();
        setNewCourse(prevState => ({
            courseTitle: prevState.courseTitle,
            courseDesc: text.target.value
        }))
    };

    const handleClick = () => {
         let inputs = document.getElementsByTagName("input");
         for(let i = 0; i < inputs.length; i++){
             inputs[i].value = "";
         }
         props.addCourse(newCourse)
    };

    return (
        <div>
            <h1>Add New Course:</h1>
        <form>
            <input type='text' id='title' placeholder='Course Title' onChange={handleTitleChange}/>
            <input type='text' placeholder='Description' onChange={handleDescChange}/>
        </form>
            <button onClick={handleClick}>Add</button>
        </div>
    );


};

export default AddCourse;