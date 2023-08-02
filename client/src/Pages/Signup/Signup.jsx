import React, { useState } from 'react';
import './signup.css'
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'
import { registerUser } from '../../Hooks/customHook';



const Signup = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error('password and confirmed password must be same')
        }
        else {
            const { status, token } = await registerUser(formData)
            if (status === 200) {
                console.log("hello");
                toast.error("email is already taken")
                navigate('/signup')
            }
            else {
                localStorage.setItem('token', token)
                window.location.href = '/'
            }


        }
    };

    return (
        <div className="signup">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <form className="form" onSubmit={handleSubmit}>
                <p className="title">Register</p>
                <p className="message">Signup now and get full access to our app.</p>
                <div className="flex">
                    <label>
                        <input
                            required
                            placeholder=""
                            type="text"
                            className="input"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <p className='span'>Firstname</p>
                    </label>

                    <label>
                        <input
                            required
                            placeholder=""
                            type="text"
                            className="input"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        <p className='span'>Lastname</p>
                    </label>
                </div>

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

                <label>
                    <input
                        required
                        placeholder=""
                        type="password"
                        className="input"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <p className='span'>Confirm password</p>
                </label>

                <button type="submit" className="submit">
                    Submit
                </button>
                <p className="signin">
                    Already have an account? <Link to={'/login'}>Sign in</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
