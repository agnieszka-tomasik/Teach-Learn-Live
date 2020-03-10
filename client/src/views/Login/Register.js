import React, {useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Field } from '../../components/Field';
import axios from 'axios';

function Login(props) {

    const history = useHistory();
    const [error, setError] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        axios.post('/register', Object.fromEntries(formData))
        .then(response => {
            if(response.status === 200) {
                console.log("Registration success");
                history.push('/home');
            } else {
                setError(response.data);
            }
        }).catch(e => {
            console.log("Registration fail");
            setError("Registration failed.");
        });
    }

    return <div>
        <h1>Register</h1>
        <form method='post' action='/register' onSubmit={submit}>
            <Field label="Username">
                <input name='username' placeholder='Username' required />
            </Field>
            <Field label="Email">
                <input type='email' name='email' placeholder='Email' required />
            </Field>
            <Field label="Password">
            <input type='password' name='password' placeholder='Password' required />
            </Field>
            <input type='submit' />
        </form>
        {error && <p className="is-danger">{error}</p>}
        <div className="level">
            <Link className="level-item" to="/login">Login</Link>
            <Link className="level-item" to="/home">Go back</Link>
        </div>
    </div>
}

export default Login;