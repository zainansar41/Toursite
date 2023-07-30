    import React, { useState } from 'react';
    import './signup.css'
    import { Link } from 'react-router-dom';


    const Signup = () => {
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

        const handleSubmit = (event) => {
            event.preventDefault();
            // Here you can handle form submission with the formData
            // For example, you can make an API call to register the user
            console.log(formData);
        };

        return (
            <div className="signup">
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
