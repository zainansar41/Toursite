import React, { useState } from 'react'
import './tourUpload.css'

export default function TourUpload() {
    const [formData, setFormData] = useState({
        tourName: '',
        location: '',
        from: '',
        startDate: '',
        endDate: '',
        hostedBy: '',
        description: '',
        image: null,
        price: '',
    });

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: reader.result,
            }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can handle form submission with the formData
        // For example, you can make an API call to upload the tour data
        console.log(formData);
    };

    return (
        <div className="uploadPage">
            <div className="upload">
                <h1 className="upload_heading">
                    Upload Tour A new Tour
                </h1>

                <form className="upload_form" onSubmit={handleSubmit}>
                    <div className="text_div">
                        <label htmlFor='tourName'>Tour Name</label>
                        <input required
                            placeholder="Tour Name"
                            type="text"
                            className="input"
                            name="tourName"
                            value={formData.tourName}
                            id='tourName'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="text_div">
                        <label htmlFor='location'>Tour Name</label>
                        <input required
                            placeholder="Tour Name"
                            type="text"
                            className="input"
                            name="location"
                            value={formData.location}
                            id='location'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="text_div">
                        <label htmlFor='from'>Tour Name</label>
                        <input required
                            placeholder="Tour Name"
                            type="text"
                            className="input"
                            name="from"
                            value={formData.from}
                            id='from'
                            onChange={handleChange}
                        />
                    </div>

                    <div className="date_div">
                        <label htmlFor='startDate'>Start Date</label>
                        <input required
                            type="date"
                            className="input"
                            name="startDate"
                            value={formData.startDate}
                            id='startDate'
                            onChange={handleChange}
                        />

                        <label htmlFor='endDate'>End Date</label>
                        <input required

                            type="date"
                            className="input"
                            name="endDate"
                            value={formData.endDate}
                            id='endDate'
                            onChange={handleChange}
                        />
                    </div>

                    <div className="text_div">
                        <label htmlFor='hostedBy'>Hosted By</label>
                        <input required
                            placeholder="Hosted By"
                            type="text"
                            className="input"
                            name="hostedBy"
                            value={formData.hostedBy}
                            id='hostedBy'
                            onChange={handleChange}
                        />
                    </div>

                    <div className="text_div">
                        <label htmlFor='description'>Description</label>
                        <textarea required
                            placeholder="Description"
                            type="text"
                            className="input"
                            name="description"
                            value={formData.description}
                            id='description'
                            onChange={handleChange}
                        />
                    </div>

                    <div className="text_div">
                        <label htmlFor='price'>Price</label>
                        <input required
                            placeholder="Price"
                            type="number"
                            className="input"
                            name="price"
                            value={formData.price}
                            id='price'
                            onChange={handleChange}
                        />
                    </div>

                    <div className="text_div">
                        <label htmlFor='image'>Image</label>
                        <input required
                            type="file"
                            className="input"
                            name="image"
                            id='image'
                            onChange={handleImageChange}
                        />
                    </div>

                    <button type="submit" className="submit">
                        Upload
                    </button>


                </form>

            </div>
        </div>
    )
}
