import React, {useState} from 'react';
import "../Admin.css"

const AddUser = (props) => {
    const [newUser, setNewUser] = useState(
        {
            uname: "",
            password: "",
            email: "",
            isAdmin: false
        }
    );

    const handleUnameChange = (text) => {
        text.persist();
        setNewUser(prevState => ({
            uname: text.target.value,
            password: prevState.password,
            email: prevState.email,
            isAdmin: prevState.isAdmin
        }))
    };
    const handlePassChange = (text) => {
        text.persist();
        setNewUser(prevState => ({
            uname: prevState.uname,
            password: text.target.value,
            email: prevState.email,
            isAdmin: prevState.isAdmin
        }))
    };
    const handleEmailChange = (text) => {
        text.persist();
        setNewUser(prevState => ({
            uname: prevState.uname,
            password: prevState.password,
            email: text.target.value,
            isAdmin: prevState.isAdmin
        }))
    };
    const handleCheckChange = () => {
        setNewUser(prevState => ({
            uname: prevState.uname,
            password: prevState.password,
            email: prevState.email,
            isAdmin: !prevState.isAdmin
        }))
    };

    const handleClick = () => {
         let inputs = document.getElementsByTagName("input");
         for(let i = 0; i < inputs.length; i++){
             inputs[i].value = "";
         }
         props.addUser(newUser)
    };

    return (
        <div>
            <h1>Add New User:</h1>
        <form>
            <input type='text' id='title' placeholder='Username' onChange={handleUnameChange}/>
            <input type='text' placeholder='Email' onChange={handleEmailChange}/>
            <input type='password' placeholder='Password' onChange={handlePassChange}/>
            <label>
                Admin:
                <input
                    name="isAdmin"
                    type="checkbox"
                    checked={newUser.isAdmin}
                    onChange={handleCheckChange} />
            </label>
            <br/>
            <button onClick={handleClick}>Add</button>
        </form>
        </div>
    );


};

export default AddUser;