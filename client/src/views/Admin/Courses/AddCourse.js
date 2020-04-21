import React, { useState } from 'react';
import "../Admin.css"

const AddCourse = (props) => {
    const [newCourse, setNewCourse] = useState(
        {
            title: "",
            description: "",
            price: 0,
        }
    );

    const handleTitleChange = (text) => {
        text.persist();
        setNewCourse(prevState => ({
            title: text.target.value,
            price: prevState.price,
            description: prevState.description
        }))
    };
    const handleDescChange = (text) => {
        text.persist();
        setNewCourse(prevState => ({
            title: prevState.title,
            price: prevState.price,
            description: text.target.value
        }))
    };

    const handlePriceChange = (text) => {
        text.persis();
        setNewCourse(prevState => ({
            ...prevState,
            price: parseFloat(text.target.value)
        }))
    }

    const handleClick = (e) => {
        e.preventDefault();
        let inputs = document.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }
        props.addCourse(newCourse)
    };

    return (
        <div>
            <h1 className="title">Add New Course:</h1>
            <form>
                <input type='text' id='title' className='inputtext' placeholder='Course Title' onChange={handleTitleChange} />
                <input type='text' className='inputtext' placeholder='Description' onChange={handleDescChange} />
                <input type='number' className='inputtext' placeholder='Price' onChange={handlePriceChange}/>
                <button className='button' onClick={handleClick}>Add</button>
            </form>
        </div>
    );
};

export default AddCourse;