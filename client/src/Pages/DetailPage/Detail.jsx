import React, { useEffect, useState } from 'react';
import './styles.css';
import { useParams } from 'react-router-dom';
import { fetchTour } from '../../Hooks/customHook';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import './modal.css'
import { PulseLoader } from 'react-spinners';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default function Detail() {
    const { id } = useParams();
    const [tour, setTour] = useState({});
    const [loading, setLoading] = useState(true);
    const [uId, setUId] = useState('');
    const [rolee, setRolee] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [contactNumber, setContactNumber] = useState('');



    useEffect(() => {
        fetchTour(id)
            .then((result) => {
                console.log(result);
                setTour(result);
                setLoading(false); // Mark the data as loaded
            })
            .catch((error) => {
                console.error('Error fetching tour:', error);
                setLoading(false); // Mark the data as loaded even in case of an error
            });

        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            const { userID, role } = decodedToken;
            setUId(userID);
            setRolee(role)
        }
    }, [id]);


    // Function to format the date to display only the month and year
    const formatStartDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        // handleBookNow(tour._id)
        setShowModal(false);
    };

    const handleMoveToCheckOut = async () => {
        const data = {
            tourName: tour.tourName,
            price: tour.price,
            contactNumber: contactNumber,
            tourId: tour._id,
        };

        if (uId && rolee === 'visitor') {
            await axios
                .post(`http://localhost:5000/api/stripe/create-checkout-session`, {
                    data: data,
                    userId: uId,
                })
                .then((response) => {
                    if (response.data.url) {
                        window.location.href = response.data.url;
                    }
                    console.log("Response", response.data.url)
                })
                .catch((err) => console.log("error>>>:", err));
        } else {
            toast.error('Please Login as a User First');
        }
    }

    return (
        <>
            {loading ? <div className="loading-spinner"><PulseLoader size={50} color="#fa585b" /></div> :
                <div className="detail">
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />
                    <img src={tour.image} alt="" />
                    <div className="detail-info">
                        <h1 className="Tourtitle"> {tour.tourName}</h1>
                        <h4 className="TourLocation">where to go: {tour.location}</h4>
                        <h4 className="from">from where : {tour.from}</h4>
                        <h4 style={{ color: 'royalblue' }} className="price">Price: {tour.price}</h4>
                        <h4 className="TourStart">{formatStartDate(tour.startDate)}</h4>
                        {/* Use the formatStartDate function to display the formatted date */}
                        <h4 className="TourEnd">{formatStartDate(tour.endDate)}</h4>
                        {/* Use the formatStartDate function to display the formatted date */}
                        <h4 style={{ color: 'blue' }} className="TourHosted">Hosted by: {tour.hostedBy}</h4>
                        <p className="TourDesc">{tour.description}</p>

                        <div className="detail-btns">
                            <button className="btn" onClick={() => { openModal() }}>Book Now</button>
                        </div>
                    </div>
                    <Modal
                        isOpen={showModal}
                        onRequestClose={closeModal}
                        className="modal-container"
                        overlayClassName="modal-overlay"
                        contentLabel="Modal"
                    >
                        <h2 className="modal-title" style={{ textAlign: "center" }}>Enter the Number to proceed</h2>
                        <form className="modal-form" onSubmit={closeModal}>
                            <div>
                                <label>Contact Number:</label>
                                <input
                                    type="tel"
                                    className="modal-input"
                                    value={contactNumber}
                                    onChange={(e) => setContactNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="modal-buttons">
                                <button onClick={() => handleMoveToCheckOut(tour._id)} type="submit" className="modal-button modal-submit">
                                    Pay Now
                                </button>
                                <button onClick={closeModal} className="modal-button modal-close">
                                    Close
                                </button>
                            </div>
                        </form>
                    </Modal>
                </div>
            }
        </>
    );
}
