import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameSubmit = (e) => {
        e.preventDefault();
        setStep(2); 
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            try {
                const response = await axios.post('https://ec2-3-27-173-168.ap-southeast-2.compute.amazonaws.com/api/register/', {
                    username,
                    password
                });
                console.log(response.data);
                navigate('/login'); 
            } catch (error) {
                console.error('There was an error registering the user!', error);
            }
        } else {
            alert('Passwords do not match!');
        }
    };

    return (
        <div className="register-container">
            <Link to='/' className='logoProfile'>
            <img src="../hire_logo.png" alt="img not loaded" />
            </Link>

            {step === 1 ? (
                <form onSubmit={handleUsernameSubmit} className="register-form">
                    <h2>Register</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <button type="submit">Next</button>
                </form>
            ) : (
                <form onSubmit={handleRegisterSubmit} className="register-form">
                    <h2>Register</h2>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Register</button>
                </form>
            )}
        </div>
    );
};

export default Register;
