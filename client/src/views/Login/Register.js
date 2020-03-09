import React from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
    return <div>
        <h1>Register</h1>
        <form method='post' action='/register'>
            <input name='username' placeholder='Username' required />
            <input type='email' name='email' placeholder='Email' required />
            <input type='password' name='password' placeholder='Password' required />
            <input type='submit' />
        </form>
      <Link to="/login">Login</Link>
      <Link to="/home">Go back</Link>
    </div>
}

export default Login;