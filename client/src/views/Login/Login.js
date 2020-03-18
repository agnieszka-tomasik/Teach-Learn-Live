import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Field } from '../../components/Field';
import axios from 'axios';
import { store } from '../../store/store';
import './Forms.css';

function Login(props) {

    const history = useHistory();
    const [error, setError] = useState(null);
    const appState = useContext(store);
    const { dispatch } = appState;

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        axios.post('/login', Object.fromEntries(formData))
            .then(response => {
                if (response.status === 200) {
                    console.log("Login success");
                    dispatch({ type: 'AUTHENTICATED' });
                    history.push('/home');
                } else {
                    setError(response.data);
                }
            }).catch(e => {
                console.log(`Login fail ${e}`);
                setError("Login failed.");
            });
    }

    return <div className="centered">
            <div className="fill-form" >
            <h1 className="title">Login</h1>
            <form method='post' action='/login' onSubmit={submit}>
                <Field label="Username">
                    <input className="input" name='username' placeholder='Username' required />
                </Field>
                <Field label="Password">
                    <input className="input" type='password' name='password' placeholder='Password' required />
                </Field>
                <input className="button is-primary" type='submit' />
            </form>
            {error && <p className="is-danger">{error}</p>}
            </div>
            <Link to="/register">Register</Link>
            <Link to="/home">Go back</Link>
    </div>
}

export default Login;