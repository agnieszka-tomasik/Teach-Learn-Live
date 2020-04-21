import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Field from '../../components/Field';
import { WithBanner } from '../../components/Banner';
import { authenticated } from '../../store/userSlice';
import './Forms.css';
import { useDispatch } from 'react-redux';
import useToasts from '../../components/Toasts'

function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { addError } = useToasts();

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        axios.post('/login', Object.fromEntries(formData))
            .then((response) => {
                if (response.status === 200) {
                    console.log('Login success');
                    dispatch(authenticated(response.data));
                    history.push('/home');
                } else {
                    addError(<div>{response.data}</div>);
                }
            }).catch((err) => {
                console.log(`Login fail ${err}`);
                addError(<div>Login failed.</div>);
            });
    };

    return (
        <div className="centered">
            <div className="fill-form">
                <h1 className="title">Login</h1>
                <form method="post" action="/login" onSubmit={submit}>
                    <Field label="Username">
                        <input className="input" name="username" placeholder="Username" required />
                    </Field>
                    <Field label="Password">
                        <input className="input" type="password" name="password" placeholder="Password" required />
                    </Field>
                    <input className="button is-primary" type="submit" />
                </form>
            </div>
            <Link to="/register">Register</Link>
            <Link to="/home">Go back</Link>
        </div>
    );
}

export default WithBanner(Login);
