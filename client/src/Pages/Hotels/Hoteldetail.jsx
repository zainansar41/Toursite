import React, { useState, useEffect } from 'react';
import { fetchHotel, updatePrice } from '../../Hooks/customHook';
import { useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import Modal from 'react-modal';
import jwt_decode from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { fetchPeopleOfHotel } from '../../Hooks/customHook';

export default function Hoteldetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [hotel, setHotel] = useState({});
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showBookModal, setShowBookModal] = useState(false);
    const [newPrice, setNewPrice] = useState('');
    const [uId, setUId] = useState('');
    const [role, setRole] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [showViewPeopleModal, setShowViewPeopleModal] = useState(false);
    const [peopleList, setPeopleList] = useState([]);

    useEffect(() => {
        fetchHotel(id)
            .then((res) => {
                setHotel(res);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching hotels:', error);
                setLoading(false);
            });

        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            const { userID, role } = decodedToken;
            setUId(userID);
            setRole(role);
        }
    }, [id]);

    const openEditModal = () => {
        setShowEditModal(true);
        setNewPrice(hotel.perDayPrice);
    };

    const openBookModal = () => {
        if (uId === '') {
            toast.error('Please Login');
            navigate('/login');
        } else {
            setShowBookModal(true);
        }
    };

    const closeModals = () => {
        setShowEditModal(false);
        setShowBookModal(false);
        setShowViewPeopleModal(false);
    };

    const handleSubmitPrice = async (event) => {
        event.preventDefault();
        setHotel((prevHotel) => ({
            ...prevHotel,
            perDayPrice: newPrice,
        }));

        const { msg } = await updatePrice(hotel._id, newPrice);

        toast.success('Price updated successfully');
        setShowEditModal(false);
    };

    const handleMoveToCheckOut = async (e) => {
        e.preventDefault();
        const data = {
            tourName: hotel.hotelName,
            price: hotel.perDayPrice,
            contactNumber: contactNumber,
            tourId: hotel._id,
        };
        if (!contactNumber.startsWith('+92') || contactNumber.length !== 13) {
            toast.error('Invalid number');
        } else {
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
        }
    };

    const openViewPeopleModal = async () => {
        try {
            setShowViewPeopleModal(true);
            const { people } = await fetchPeopleOfHotel(hotel._id);
            console.log(people);

            if (Array.isArray(people)) {
                setPeopleList(people);
            } else {
                setPeopleList([]);
                console.log(uId);
            }
        } catch (error) {
            console.error('Error fetching people list:', error);
        }
    };

    const closeViewPeopleModal = () => {
        setShowViewPeopleModal(false);
    };

    return (
        <div>
            {loading ? (
                <div className="loading-spinner-container">
                    <PulseLoader size={50} color="#fa585b" />
                </div>
            ) : (
                <>
                    <Toaster position="top-right" reverseOrder={false} />
                    <h1>Hotel Detail</h1>
                    <div className="detail">
                        <img src={`http://localhost:5000/images/${hotel.image}`} alt="" />
                        <div className="detail-info">
                            <h1 style={{ textAlign: 'center' }}>{hotel.hotelName}</h1>
                            <h3 style={{ color: '#4caf50', fontSize: '20px', fontWeight: '700' }}>
                                Price per day: {hotel.perDayPrice}
                            </h3>
                            <h3 style={{ fontSize: '20px' }}>Location: {hotel.location}</h3>
                            <h3 style={{ fontSize: '20px' }}>Contact No: {hotel.contactNo}</h3>
                            <p>{hotel.description}</p>
                            {uId === hotel.userID ? (
                                <div style={{ gap: '12px' }}>
                                    <button className="btn" onClick={openEditModal}>
                                        Edit Price
                                    </button>
                                    <button className="btn" onClick={openViewPeopleModal}>
                                        View People
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <button className="btn" onClick={openBookModal}>
                                        Book Now
                                    </button>
                                    <button className="btn" onClick={openViewPeopleModal}>
                                        View People
                                    </button></>
                            )}
                        </div>
                    </div>
                </>
            )}
            <Modal
                isOpen={showEditModal}
                onRequestClose={closeModals}
                className="modal-container"
                overlayClassName="modal-overlay"
                contentLabel="Edit Price Modal"
            >
                {/* ... Modal content ... */}
                <h2 className="modal-title" style={{ textAlign: 'center' }}>
                    Edit Price
                </h2>
                <form className="modal-form" onSubmit={handleSubmitPrice}>
                    <div>
                        <label>New Price:</label>
                        <input
                            type="number"
                            className="modal-input"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="modal-buttons">
                        <button type="submit" className="modal-button modal-submit">
                            Edit Price
                        </button>
                        <button onClick={closeModals} className="modal-button modal-close">
                            Close
                        </button>
                    </div>
                </form>

            </Modal>
            <Modal
                isOpen={showBookModal}
                onRequestClose={closeModals}
                className="modal-container"
                overlayClassName="modal-overlay"
                contentLabel="Book Now Modal"
            >
                {/* ... Modal content ... */}
                <h2 className="modal-title" style={{ textAlign: "center" }}>Enter the Number to proceed</h2>
                <p style={{ color: 'red', textAlign: 'center' }}>Number must start with <strong>+92</strong></p>
                <form className="modal-form" onSubmit={handleMoveToCheckOut}>
                    <div>
                        <label>Contact Number:</label>
                        <input
                            type="text"
                            className="modal-input"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="modal-buttons">
                        <button type="submit" className="modal-button modal-submit">
                            Pay Now
                        </button>
                        <button onClick={closeModals} className="modal-button modal-close">
                            Close
                        </button>
                    </div>
                </form>
            </Modal>
            <Modal
                isOpen={showViewPeopleModal}
                onRequestClose={closeModals}
                className="modal-container"
                overlayClassName="modal-overlay"
                contentLabel="View People Modal"
            >
                <h2 className="modal-title" style={{ textAlign: 'center' }}>
                    People in Hotel
                </h2>
                {peopleList.length === 0 ? (
                    <p>No People found</p>
                ) : (
                    <ul>
                        {peopleList.map((person, index) => (
                            <div key={index} className="person-item">
                                <p>Name: <span style={{ fontStyle: 'normal' }} className="modal-span">{person.user.firstName} {person.user.lastName}</span></p>
                                <p>Email: <span style={{ fontStyle: 'normal' }} className="modal-span">{person.user.email}</span></p>
                                <p>Payment Status: <span style={{ fontStyle: 'normal' }} className="modal-span">{person.order.paymentStatus}</span></p>
                                <p>Payment Id: <span style={{ fontStyle: 'normal' }} className="modal-span">{person.order.paymentIntentId}</span></p>
                                <p>Payment: <span style={{ fontStyle: 'normal' }} className="modal-span">{person.order.totalAmount}</span></p>
                            </div>
                        ))}
                    </ul>
                )}
                <button onClick={closeViewPeopleModal} className="modal-button modal-close">
                    Close
                </button>
            </Modal>
        </div>
    );
}
