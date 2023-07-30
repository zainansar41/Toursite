import React, { useState } from 'react'
import './styles.css'

export default function Contactus() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform any form submission logic here, e.g., sending data to a server
        console.log(formData);
    };

    return (
           <div className="contact">
        <form className="form" onSubmit={handleSubmit}>
            <div className="flex">
                <label>
                    <input
                        className="input"
                        type="text"
                        placeholder=""
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <p>first name</p>
                </label>

                <label>
                    <input
                        className="input"
                        type="text"
                        placeholder=""
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <p>last name</p>
                </label>
            </div>

            <label>
                <input
                    className="input"
                    type="email"
                    placeholder=""
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <p>email</p>
            </label>

            <label>
                <input
                    className="input"
                    placeholder=""
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                />
                <p>contact number</p>
            </label>
            <label>
                <textarea
                    className="input01"
                    placeholder=""
                    rows="3"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
                <p>message</p>
            </label>

            <button type="submit" className="fancy">
                <div className="block-element">
                    <span className="top-key"></span>
                </div>
                <div className="block-element">
                    <p className="text">submit</p>
                </div>
                <div className="block-element">
                    <span className="bottom-key-1"></span>
                </div>
                <div className="block-element">
                    <span className="bottom-key-2"></span>
                </div>
            </button>
        </form>
    </div> 

    ) 
}
