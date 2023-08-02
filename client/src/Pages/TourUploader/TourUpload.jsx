import React, { useState } from 'react';
import './tourUpload.css';
import convertBase64 from '../../helper/convert';
import toast, { Toaster } from 'react-hot-toast';
import { uploadTour } from '../../Hooks/customHook';
import { useNavigate } from 'react-router-dom';

export default function TourUpload() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        tourName: '',
        location: '',
        from: '',
        startDate: '',
        endDate: '',
        hostedBy: '',
        description: '',
        image: '',
        price: '',
    });

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;

        // Special handling for the select element to convert the selected option into the value.
        const selectedOption = type === 'select-one' ? event.target.selectedOptions[0].value : value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'file' ? files[0] : selectedOption,
        }));
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = async () => {
            const base64 = await convertBase64(file);

            setFormData((prevFormData) => ({
                ...prevFormData,
                image: base64,
            }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { msg, status } = await uploadTour(formData);
        if (status === 201) {
            toast.success(msg);
        } else if (status === 200) {
            toast('waiting for Admin to Approve', {
                icon: '👍',
            });
        }

        navigate('/upload');
    };

    return (
        <div className="uploadPage">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="upload">
                <h1 className="upload_heading">Upload A new Tour</h1>

                <form className="upload_form" onSubmit={handleSubmit}>
                    <div className="text_div">
                        <label htmlFor="tourName">Tour Name</label>
                        <input
                            required
                            placeholder="Tour Name"
                            type="text"
                            className="input"
                            name="tourName"
                            value={formData.tourName}
                            id="tourName"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="text_div">
                        <label htmlFor="location">Location</label>
                        <select
                            required
                            className="input"
                            name="location"
                            id="location"
                            value={formData.location}
                            onChange={handleChange}
                        >
                            <option value="">Select Location</option>
                            <option value="Naran">Naran</option>
                            <option value="Gilgit">Gilgit</option>
                            <option value="Swat">Swat</option>
                            <option value="Kashmir">Kashmir</option>
                        </select>
                    </div>
                    <div className="text_div">
                        <label htmlFor="from">from</label>
                        <input
                            required
                            placeholder="from where?"
                            type="text"
                            className="input"
                            name="from"
                            value={formData.from}
                            id="from"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="date_div">
                        <label htmlFor="startDate">Start Date</label>
                        <input
                            required
                            type="date"
                            className="input"
                            name="startDate"
                            value={formData.startDate}
                            id="startDate"
                            onChange={handleChange}
                        />

                        <label htmlFor="endDate">End Date</label>
                        <input
                            required
                            type="date"
                            className="input"
                            name="endDate"
                            value={formData.endDate}
                            id="endDate"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="text_div">
                        <label htmlFor="hostedBy">Hosted By</label>
                        <input
                            required
                            placeholder="Hosted By"
                            type="text"
                            className="input"
                            name="hostedBy"
                            value={formData.hostedBy}
                            id="hostedBy"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="text_div">
                        <label htmlFor="description">Description</label>
                        <textarea
                            required
                            placeholder="Description"
                            type="text"
                            className="input"
                            name="description"
                            value={formData.description}
                            id="description"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="text_div">
                        <label htmlFor="price">Price</label>
                        <input
                            required
                            placeholder="Price"
                            type="number"
                            className="input"
                            name="price"
                            value={formData.price}
                            id="price"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="text_div">
                        <label htmlFor="image">Image</label>
                        <input
                            required
                            type="file"
                            className="input"
                            name="image"
                            id="image"
                            onChange={handleImageChange}
                        />
                    </div>

                    <button type="submit" className="submit">
                        Upload
                    </button>
                </form>
            </div>
        </div>
    );
}
