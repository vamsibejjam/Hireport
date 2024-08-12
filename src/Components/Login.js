import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../GlobalContext';

const Login = () => {
    const { setUserId } = useContext(GlobalContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://ec2-3-27-173-168.ap-southeast-2.compute.amazonaws.com/api/login/', {
                username,
                password
            });

            if (response.status === 200) {
                const { user_id } = response.data;

                setUserId(user_id)
                navigate('/');
            }
        } catch (error) {
            alert('Wrong credentials');
        }
    };

    return (
        <div className="login-container">
            <Link to='/' className='loginLogo' >
                <img src="../hire_logo.png" alt="img not loaded" />
            </Link>

            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>

                <Link to='/register' className='register'>
                    Click here to register
                </Link>
            </form>
        </div>
    );
};

export default Login;
