import React, {useState} from 'react';
import "../Admin.css"

const AddEmail = (props) => {
    const [newEmail, setNewEmail] = useState(
        {
            email: "",
        }
    );

    const handleEmailChange = (text) => {
        text.persist();
        setNewEmail(prevState => ({
            email: text.target.value
        }))
    };

    const handleClick = () => {
         let inputs = document.getElementsByTagName("input");
         for(let i = 0; i < inputs.length; i++){
             inputs[i].value = "";
         }
         props.addEmail(newEmail)
    };

    return (
        <div>
            <h1>Add New Email:</h1>
        <form>
            <input type='text' className='inputtext' id='title' placeholder='Email' onChange={handleEmailChange}/>
            <br/>
            <button className='button' onClick={handleClick}>Add</button>
        </form>
        </div>
    );


};

export default AddEmail;