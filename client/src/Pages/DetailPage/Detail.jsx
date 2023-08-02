import React, { useEffect, useState } from 'react';
import './styles.css';
import { useParams } from 'react-router-dom';
import { fetchTour, bookNow } from '../../Hooks/customHook';
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './modal.css'

export default function Detail() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [tour, setTour] = useState({});
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
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
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    // Function to format the date to display only the month and year
    const formatStartDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const handleBookNow = async () => {

        const { msg, status } = await bookNow(id)
        if (status === 201) {
            toast.success(msg)
            navigate('/')
        }
        else if (status === 202) {
            toast.error(msg)
            navigate('/login')
        }
    }

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        // handleBookNow(tour._id)
        setShowModal(false);
    };

    return (
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
                <h2 className="modal-title">Payment</h2>
                <form className="modal-form" onSubmit={closeModal}>
                    <div>
                        <label className="modal-label">Email:</label>
                        <input
                            type="email"
                            className="modal-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="modal-label">Contact Number:</label>
                        <input
                            type="tel"
                            className="modal-input"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="modal-buttons">
                        <button type="submit" className="modal-button modal-submit">
                            Submit
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
