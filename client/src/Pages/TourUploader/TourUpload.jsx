import React, { useState } from 'react';
import './tourUpload.css';
import toast, { Toaster } from 'react-hot-toast';
import { uploadTour, addHotel } from '../../Hooks/customHook';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TourUpload() {
    const navigate = useNavigate();
    const [formType, setFormType] = useState('tour'); // State to track whether Tour or Hotel form should be displayed

    const [tourFormData, setTourFormData] = useState({
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

    const [hotelFormData, setHotelFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        location: '',
        contactNumber: '',
    });

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        const selectedOption = type === 'select-one' ? event.target.selectedOptions[0].value : value;

        if (formType === 'tour') {
            setTourFormData((prevTourFormData) => ({
                ...prevTourFormData,
                [name]: type === 'file' ? files[0] : selectedOption,
            }));
        } else if (formType === 'hotel') {
            setHotelFormData((prevHotelFormData) => ({
                ...prevHotelFormData,
                [name]: type === 'file' ? files[0] : selectedOption,
            }));
        }
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const dataa = new FormData();
            const filename = Date.now() + file.name;
            dataa.append('name', filename);
            dataa.append('file', file);
            try {
                await axios.post(`http://localhost:5000/api/upload`, dataa);
                if (formType === 'tour') {
                    setTourFormData((prevTourFormData) => ({
                        ...prevTourFormData,
                        image: filename,
                    }));
                } else if (formType === 'hotel') {
                    setHotelFormData((prevHotelFormData) => ({
                        ...prevHotelFormData,
                        image: filename,
                    }));
                }
            } catch (err) {
                console.log('err>>>', err);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formType === 'tour') {
            const { msg, status } = await uploadTour(tourFormData);
            if (status === 201) {
                toast.success(msg);
            } else if (status === 200) {
                toast('Waiting for Admin to Approve', {
                    icon: '👍',
                });
            }
        } else if (formType === 'hotel') {

            const { msg, status } = await addHotel(hotelFormData);
            if (status === 201) {
                toast.success(msg);
            }
            else{
                toast.error(msg);
            }

        }

        navigate('/upload');
    };

    return (
        <div className="uploadPage">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="upload">
                <h1 className="upload_heading">Upload a New {formType === 'tour' ? 'Tour' : 'Hotel'}</h1>
                <div className="btn-container">
                    <button
                        className={`upload-btn ${formType === 'tour' ? 'active' : ''}`}
                        onClick={() => setFormType('tour')}
                    >
                        Tour
                    </button>
                    <button
                        className={`upload-btn ${formType === 'hotel' ? 'active' : ''}`}
                        onClick={() => setFormType('hotel')}
                    >
                        Hotel
                    </button>
                </div>

                {formType === 'tour' ? (
                    // Form for Tour
                    <form className="upload_form" onSubmit={handleSubmit}>
                        <div className="text_div">
                            <label htmlFor="tourName">Tour Name</label>
                            <input
                                required
                                placeholder="Tour Name"
                                type="text"
                                className="input"
                                name="tourName"
                                value={tourFormData.tourName}
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
                                value={tourFormData.location}
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
                            <label htmlFor="from">From</label>
                            <input
                                required
                                placeholder="From where?"
                                type="text"
                                className="input"
                                name="from"
                                value={tourFormData.from}
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
                                value={tourFormData.startDate}
                                id="startDate"
                                onChange={handleChange}
                            />
                            <label htmlFor="endDate">End Date</label>
                            <input
                                required
                                type="date"
                                className="input"
                                name="endDate"
                                value={tourFormData.endDate}
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
                                value={tourFormData.hostedBy}
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
                                value={tourFormData.description}
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
                                value={tourFormData.price}
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
                ) : (
                    // Form for Hotel
                    <form className="upload_form" onSubmit={handleSubmit}>
                        <div className="text_div">
                            <label htmlFor="name">Name</label>
                            <input
                                required
                                placeholder="Name"
                                type="text"
                                className="input"
                                name="name"
                                value={hotelFormData.name}
                                id="name"
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
                                value={hotelFormData.description}
                                id="description"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="text_div">
                            <label htmlFor="price">Per Day Price</label>
                            <input
                                required
                                placeholder="Per Day Price"
                                type="number"
                                className="input"
                                name="price"
                                value={hotelFormData.price}
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
                        <div className="text_div">
                            <label htmlFor="location">Location</label>
                            <select
                                required
                                className="input"
                                name="location"
                                id="location"
                                value={hotelFormData.location}
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
                            <label htmlFor="contactNumber">Contact Number</label>
                            <input
                                required
                                placeholder="Contact Number"
                                type="tel"
                                className="input"
                                name="contactNumber"
                                value={hotelFormData.contactNumber}
                                id="contactNumber"
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="submit">
                            Upload
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
