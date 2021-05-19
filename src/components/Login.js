// Imports
import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import setAuthToken from '../utils/setAuthToken';
const { REACT_APP_SERVER_URL } = process.env;

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Get user data
        const userData = { email, password };
        try {
            const response = await axios.post(`${REACT_APP_SERVER_URL}/users/login`, userData);
            // obtain the token
            const { token } = response.data;
            // store in localstorage
            localStorage.setItem('jwtToken', token);
            // set axios auth header
            setAuthToken(token);
            // decode the json web token and store in App state
            const decoded = jwt_decode(token);
            props.nowCurrentUser(decoded);
        } catch (error) {
            console.error(error);
            alert('Either Email or Password is incorrect.  Please try again.');
        }
    }

    if (props.user) return <Redirect to="/profile" />;

    return (
        <div className="row mt-4">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} onChange={handleEmail} className="form-control" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={handlePassword} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login;
