import React, { useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import Field from '../../components/Field';
import { WithBanner } from '../../components/Banner';
import './Forms.css';
import { useDispatch } from 'react-redux';
import { authenticated } from '../../store/userSlice';

function validatePassword(password) {
    const lowers = /(?=.*[a-z]).*/
    const uppers = /(?=.*[A-Z]).*/
    const symbols = /(?=.*[!@#$%^&'()*+",-./:;<=>?[\\\]_`{|}~]).*/
    const length = /(?=^.{8,}$)/
    let outputs = [];

    if (password.search(lowers) === -1)
        outputs.push(-1);
    if (password.search(uppers) === -1)
        outputs.push(-2);
    if (password.search(symbols) === -1)
        outputs.push(-3);
    if (password.search(length) === -1)
        outputs.push(-4);

    return outputs;
}

function Login() {
    const history = useHistory();
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (formData.get('password') !== formData.get('passwordConfirm')) {
            setError('Passwords did not match!');
            return;
        }

        /* Validating that the password is at least 8 characters long 
         * and contains at least one lowercase, uppercase, and special 
         * symbol character
         */
        let password = formData.get('password');
        let retnums = validatePassword(password);
        let errormsg = "";
        retnums.forEach((retnum) => {
            switch (retnum) {
                case -1:
                    errormsg += "Password must contain at least one lowercase letter \n";
                    break;
                case -2:
                    errormsg += "Password must contain at least one uppercase letter \n";
                    break;
                case -3:
                    errormsg += "Password must contain at least one special symbol \n";
                    break;
                case -4:
                    errormsg += "Password must be at least 8 characters long \n";
                    break;
            }
        });

        if (retnums.length > 0) {
            errormsg = new Set(errormsg.split('\n'))
            errormsg = Array(errormsg);
            errormsg = errormsg.map((e, key) => {
                return (<span key={key}>
                            {e}
                            <br/>
                        </span>);
            });
            setError(errormsg);
            return;
        } 

        axios.post('/register', Object.fromEntries(formData))
            .then((response) => {
                if (response.status === 200) {
                    console.log('Registration success');
                    dispatch(authenticated(response.data));
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
                    {error && <p className="is-danger">{error}</p>}
                    <input className="button is-primary" type="submit" />
                </form>
                {error && error.split('\n').map((err, key) => <p className="is-danger" key={key}>{err}</p>)}
            </div>
            <Link to="/login">Login</Link>
            <Link to="/home">Go back</Link>
        </div>
    );
}
export default WithBanner(Login);
