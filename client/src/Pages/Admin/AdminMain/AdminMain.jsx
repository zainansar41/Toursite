import React, { useState, useEffect } from 'react';
import ToConfirmTour from '../../../Components/ToConfirm/ToConfirmTour';
import Confirmed from '../../../Components/Confirmed/Confirmed';
import { fetchAllTours, fetchAllHotels } from '../../../Hooks/customHook';
import './AdminMainStyles.css'; // Import your CSS file for styles
import ToConfirmHotel from '../../../Components/HotelConfirmReject/toConfirmHotel';
import ConfirmedHotel from '../../../Components/HotelConfirmReject/ConfirmedHotel';

export default function AdminMain() {
    const [tours, setTours] = useState([]);
    const [plannedTours, setPlannedTours] = useState([]);
    const [otherTours, setOtherTours] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [confirmedHotels, setConfirmedHotels] = useState([]);
    const [otherHotels, setOtherHotels] = useState([]);
    const [contentType, setContentType] = useState('tour'); // Initial content type

    useEffect(() => {
        fetchAllTours().then((result) => {
            setTours(result);
        });
        fetchAllHotels().then((result) => {
            setHotels(result);
            const confirmed = result.filter(hotel => hotel.confirmed === true);
            setConfirmedHotels(confirmed);
            const other = result.filter(hotel => hotel.confirmed === false);
            setOtherHotels(other);
        });
    }, []);

    useEffect(() => {
        const a = tours.filter((tour) => tour.confirmed === false);
        const b = tours.filter((tour) => tour.confirmed === true);
        setPlannedTours(a);
        setOtherTours(b);
    }, [tours]);

    const handleContentTypeChange = (newType) => {
        setContentType(newType);
    };

    return (
        <>
            <div className="admin_btn-container">
                <button
                    className={`admin_content-btn ${contentType === 'tour' ? 'active' : ''}`}
                    onClick={() => handleContentTypeChange('tour')}
                >
                    Tours
                </button>
                <button
                    className={`admin_content-btn ${contentType === 'hotel' ? 'active' : ''}`}
                    onClick={() => handleContentTypeChange('hotel')}
                >
                    Hotels
                </button>
            </div>

            {contentType === 'tour' ? (
                <>
                    <ToConfirmTour tours={plannedTours} />
                    <Confirmed tours={otherTours} />
                </>
            ) : contentType === 'hotel' ? (
                <>
                    <ToConfirmHotel tours={otherHotels} />
                    <ConfirmedHotel tours={confirmedHotels} />
                </>
            ) : null}
        </>
    );
}
