import React, { useState, useEffect } from 'react';
import { fetchHotel, updatePrice } from '../../Hooks/customHook';
import { useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import Modal from 'react-modal'; // Import Modal component
import jwt_decode from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Hoteldetail() { // Assuming uId is passed as a prop
    const navigate = useNavigate();
    const { id } = useParams();
    const [hotel, setHotel] = useState({});
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // Add modal state
    const [newPrice, setNewPrice] = useState(''); // Add state for new price
    const [uId, setUId] = useState('');
    const [role, setRole] = useState('');
    const [contactNumber, setContactNumber] = useState('');



    useEffect(() => {
        fetchHotel(id)
            .then((res) => {
                setHotel(res);
                setLoading(false); // Mark the data as loaded
            })
            .catch((error) => {
                console.error('Error fetching hotels:', error);
                setLoading(false); // Mark the data as loaded even in case of an error
            });

        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            const { userID, role } = decodedToken;
            setUId(userID);
            setRole(role)


        }
    }, [id]);

    const openModal = () => {
        if (uId === '') {
            toast.error('Please Login');
            navigate('/login')

        } else {
            setShowModal(true);
        }
    };

    const handleEditPrice = () => {
        setShowModal(true);
        setNewPrice(hotel.perDayPrice);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSubmitPrice = async (event) => {
        event.preventDefault();
        setHotel((prevHotel) => ({
            ...prevHotel,
            perDayPrice: newPrice,
        }));

        const { msg } = await updatePrice(hotel._id, newPrice);

        toast.success("price updated successfully")


        setShowModal(false);
    };

    const handleMoveToCheckOut = async () => {

        // check whether the contactNumber starts with +92 and length is 13

        if (contactNumber.length !== 13 && contactNumber[0] !== '+' && contactNumber[1] !== '9' && contactNumber[2] !== '2') {
            toast.error('invalid number')
            return
        }

        // const data = {
        //     tourName: tour.tourName,
        //     price: tour.price,
        //     contactNumber: contactNumber,
        //     tourId: tour._id,
        // };

        if (contactNumber.length !== 13) {
            toast.error('invalid number')
            return
        }

        // if (uId && role === 'visitor') {
        //     await axios
        //         .post(`http://localhost:5000/api/stripe/create-checkout-session`, {
        //             data: data,
        //             userId: uId,
        //         })
        //         .then((response) => {
        //             if (response.data.url) {
        //                 window.location.href = response.data.url;
        //             }
        //             console.log("Response", response.data.url)
        //         })
        //         .catch((err) => console.log("error>>>:", err));
        // } else {
        //     toast.error('Please Login as a User First');
        // }
    }

    return (
        <div>
            {loading ? (
                <div className="loading-spinner-container">
                    <PulseLoader size={50} color="#fa585b" />
                </div>
            ) : (
                <>
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />
                    <h1>Hotel Detail</h1>
                    <div className="detail">
                        <img src={`http://localhost:5000/images/${hotel.image}`} alt="" />
                        <div className="detail-info">
                            <h1 style={{ textAlign: 'center' }}>{hotel.hotelName}</h1>
                            <h3 style={{ color: '#4caf50', fontSize: '20px', fontWeight: '700' }}>
                                Price: {hotel.perDayPrice}
                            </h3>
                            <h3 style={{ fontSize: '20px' }}>Location: {hotel.location}</h3>
                            <h3 style={{ fontSize: '20px' }}>Contact No: {hotel.contactNo}</h3>
                            <p>{hotel.description}</p>
                            {uId === hotel.userID ? (
                                <button className="btn" onClick={handleEditPrice}>
                                    Edit Price
                                </button>
                            ) : (
                                <button className="btn" onClick={openModal}>
                                    Book Now
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                className="modal-container"
                overlayClassName="modal-overlay"
                contentLabel="Edit Price Modal"
            >
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
                        <button onClick={closeModal} className="modal-button modal-close">
                            Close
                        </button>
                    </div>
                </form>
            </Modal>
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                className="modal-container"
                overlayClassName="modal-overlay"
                contentLabel="Modal"
            >
                <h2 className="modal-title" style={{ textAlign: "center" }}>Enter the Number to proceed</h2>
                <p style={{ color: 'red', textAlign: 'center' }}>Number must start with <strong>+92</strong></p>
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
                        <button onClick={() => handleMoveToCheckOut(hotel._id)} type="submit" className="modal-button modal-submit">
                            Pay Now
                        </button>
                        <button onClick={closeModal} className="modal-button modal-close">
                            Close
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
