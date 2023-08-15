import React, { useEffect, useState } from 'react';
import './styles.css';
import { useParams } from 'react-router-dom';
import { fetchTour, addReview } from '../../Hooks/customHook';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import './modal.css'
import { PulseLoader } from 'react-spinners';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
export default function Detail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [tour, setTour] = useState({});
    const [loading, setLoading] = useState(true);
    const [uId, setUId] = useState('');
    const [rolee, setRolee] = useState('');
    const [name, setName] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [contactNumber, setContactNumber] = useState('');

    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewText, setReviewText] = useState('');



    useEffect(() => {
        fetchTour(id)
            .then((result) => {
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
            const { userID, role, name } = decodedToken;
            setUId(userID);
            setRolee(role)
            setName(name)
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
        if (uId === '') {
            toast.error('Please Login');
            navigate('/login')

        } else {
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleMoveToCheckOut = async () => {

        // check whether the contactNumber starts with +92 and length is 13

        if (contactNumber.length !== 13 && contactNumber[0] !== '+' && contactNumber[1] !== '9' && contactNumber[2] !== '2' ) {
            toast.error('invalid number')
            return
        }

        const data = {
            tourName: tour.tourName,
            price: tour.price,
            contactNumber: contactNumber,
            tourId: tour._id,
        };

        if (contactNumber.length !== 13) {
            toast.error('invalid number')
            return
        }

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

    const handleAddReview = () => {
        setShowReviewModal(true);
    };

    const handleSubmitReview = async (event) => {
        event.preventDefault();

        const data = {
            reviewText: reviewText,
            userName: name,
        };

        const { msg, status } = await addReview(data, tour._id);
        if (status === 200) {
            toast.success(msg);
            // Add the new review to the existing reviews and update the tour state
            setTour((prevTour) => ({
                ...prevTour,
                reviews: [...prevTour.reviews, reviewText],
            }));
        } else {
            toast.error(msg);
        }

        setShowReviewModal(false);
    };

    return (
        <>
            {loading ? <div className="loading-spinner-container">
                <PulseLoader size={50} color="#fa585b" />
            </div> :
                <>
                    <div className="detail">
                        <Toaster
                            position="top-right"
                            reverseOrder={false}
                        />
                        <img src={`http://localhost:5000/images/${tour.image}`} alt="" />
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
                                {/* Render "Add Review" button if conditions are met */}
                                {tour.status === 'completed' && tour.people.includes(uId) ? (
                                    <button className="btn" onClick={handleAddReview}>
                                        Add Review
                                    </button>
                                ) : tour.status !== 'completed' ? (
                                    <button className="btn" onClick={() => openModal()}>
                                        Book Now
                                    </button>
                                ) : null}
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
                            <p style={{color:'red', textAlign:'center'}}>Number must start with <strong>+92</strong></p>
                            <form className="modal-form" onSubmit={closeModal}>
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
                                    <button onClick={() => handleMoveToCheckOut(tour._id)} type="submit" className="modal-button modal-submit">
                                        Pay Now
                                    </button>
                                    <button onClick={closeModal} className="modal-button modal-close">
                                        Close
                                    </button>
                                </div>
                            </form>
                        </Modal>
                        <Modal
                            isOpen={showReviewModal}
                            onRequestClose={() => setShowReviewModal(false)}
                            className="modal-container"
                            overlayClassName="modal-overlay"
                            contentLabel="Review Modal"
                        >
                            <h2 className="modal-title" style={{ textAlign: "center" }}>
                                Write your review
                            </h2>
                            <form className="modal-form" onSubmit={handleSubmitReview}>
                                <div>
                                    <label>Review:</label>
                                    <textarea
                                        className="modal-input"
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="modal-buttons">
                                    <button type="submit" className="modal-button modal-submit">
                                        Submit Review
                                    </button>
                                    <button onClick={() => setShowReviewModal(false)} className="modal-button modal-close">
                                        Close
                                    </button>
                                </div>
                            </form>
                        </Modal>
                    </div>
                    {tour.status === 'completed' && (
                        <div className="reviews-section">
                            {tour.reviews.length > 0 ? (
                                <>
                                    <h1>Reviews</h1>
                                    <ul>
                                        {tour.reviews.map((review, index) => (
                                            <li key={index}>
                                                <strong>{review.userName}:</strong> {review.review}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <h1>No reviews yet.</h1>
                            )}
                        </div>
                    )}
                </>
            }
        </>
    );
}
