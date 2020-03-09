import React from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
   return <div>
      <h1>Login</h1>
      <form method='post' action='/login'>
         <input name='username' placeholder='Username' required />
         <input type='email' name='email' placeholder='Email' required />
         <input type='password' name='password' placeholder='Password' required />
         <input type='submit' />
      </form>
      <Link to="/register">Register</Link>
   </div>
}

export default Login;