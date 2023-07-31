import React, { useState } from 'react';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../Hooks/customHook';
import toast, { Toaster } from 'react-hot-toast'


const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        const {status, token } = await loginUser(formData)
        if (status === 203) {
            toast.error("invalid credentials")
            navigate('/login')
        }
        else{
            toast.success("Logged in")
            // history.back()
            localStorage.setItem('token', token)
            navigate('/')
        }

        console.log(formData);
    };

    return (
        <div className="signup">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <form className="form" onSubmit={handleSubmit}>
                <p className="title">Login</p>
                <p className="message">Please enter your email and password to log in.</p>
                <label>
                    <input
                        required
                        placeholder=""
                        type="email"
                        className="input"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <p className='span'>Email</p>
                </label>

                <label>
                    <input
                        required
                        placeholder=""
                        type="password"
                        className="input"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <p className='span'>Password</p>
                </label>

                <button type="submit" className="submit">
                    Login
                </button>
                <p className="signin">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
