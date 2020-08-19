import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login() {
    // state for the form for logging in
    const [formState, setFormState] = useState({ username: '', password: ''});

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormState({
            ...formState,
            [name]: value,
        });

    };

    const [login, { error }] = useMutation(LOGIN);

    //submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {

            const { data } = await login({
                variables: { ...formState }
            });

            Auth.login(data.login.token)
        } catch(e) {
            console.log(e);
        }

        //clear form
        setFormState({
            username: '',
            password: '',
        });
    };

    return(
        <form onSubmit={handleFormSubmit} style={{margin: "auto"}}>
            <input
                placeholder="Username"
                name="username"
                value={formState.username}
                onChange={handleChange}
            />

            <input
                placeholder="Password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
            />

            {error && <h3>Login Failed</h3>}

            <button type="submit">Submit</button>
        </form>
    )
}

export default Login;