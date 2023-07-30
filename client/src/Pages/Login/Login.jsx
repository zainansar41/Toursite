import React, { useState } from 'react';
import './Login.css'
import { Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can handle form submission with the formData
        // For example, you can make an API call to log in the user
        console.log(formData);
    };

    return (
        <div className="signup">
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
