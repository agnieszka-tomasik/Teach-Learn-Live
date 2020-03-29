import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Field } from '../../components/Field';
import axios from 'axios';
import { store } from '../../store/store';

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

    return <div>
        <h1>Login</h1>
        <form method='post' action='/login' onSubmit={submit}>
            <Field label="Username">
                <input name='username' placeholder='Username' required />
            </Field>
            <Field label="Password">
                <input type='password' name='password' placeholder='Password' required />
            </Field>
            <input type='submit' />
        </form>
        {error && <p className="is-danger">{error}</p>}
        <div className="level">
            <Link className="level-item" to="/register">Register</Link>
            <Link className="level-item" to="/home">Go back</Link>
        </div>
    </div>
}

export default Login;
