import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import Field from '../../components/Field';
import { WithBanner } from '../../components/Banner';
import { store } from '../../store/store';
import './Forms.css';

function Login() {
    const history = useHistory();
    const [error, setError] = useState(null);
    const appState = useContext(store);
    const { dispatch } = appState;

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (formData.get('password') !== formData.get('passwordConfirm')) {
            setError('Passwords did not match!');
            return;
        }

        axios.post('/register', Object.fromEntries(formData))
            .then((response) => {
                if (response.status === 200) {
                    console.log('Registration success');
                    dispatch({ type: 'AUTHENTICATED', payload: response.data });
                    history.push('/home');
                } else {
                    setError(response.data);
                }
            }).catch((err) => {
                console.log(`Registration fail ${err}`);
                setError('Registration failed.');
            });
    };

    return (
        <div className="centered">
            <div className="fill-form">

                <h1 className="title">Register</h1>
                <form onSubmit={submit}>
                    <Field label="Username">
                        <input className="input" name="username" placeholder="Username" required />
                    </Field>
                    <Field label="Email">
                        <input className="input" type="email" name="email" placeholder="Email" required />
                    </Field>
                    <Field label="Password">
                        <input className="input" type="password" name="password" placeholder="Password" required />
                    </Field>
                    <Field label="Confirm Password">
                        <input className="input" type="password" name="passwordConfirm" placeholder="Confirm Password" required />
                    </Field>
                    <input className="button is-primary" type="submit" />
                </form>
                {error && <p className="is-danger">{error}</p>}
            </div>
            <Link to="/login">Login</Link>
            <Link to="/home">Go back</Link>
        </div>
    );
}

export default WithBanner(Login);
