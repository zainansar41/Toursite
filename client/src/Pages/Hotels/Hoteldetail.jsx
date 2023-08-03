import React, { useState, useEffect } from 'react'
import { fetchHotel } from '../../Hooks/customHook'
import { useParams } from 'react-router-dom';

export default function Hoteldetail() {
    const { id } = useParams();
    const [hotel, setHotel] = useState({})
    useEffect(() => {
        fetchHotel(id)
            .then(res => setHotel(res))
            .catch(error => {
                // Handle the error, e.g., show an error message or log the error
                console.error('Error fetching hotels:', error);
            });
            console.log(hotel);
    }, []);
    return (
        <div>
            <h1>Hotel Detail</h1>
            <div className='detail'>
                <img src={`http://localhost:5000/images/${hotel.image}`} alt='' />
                <div className='detail-info'>
                    <h1 style={{ textAlign: 'center' }}>{hotel.hotelName}</h1>
                    <h3 style={{ color: '#4caf50', fontSize: "20px", fontWeight: '700' }}>Price: {hotel.perDayPrice}</h3>
                    <h3 style={{ fontSize: '20px' }}>Location: {hotel.location}</h3>
                    <h3 style={{ fontSize: '20px' }}>Location: {hotel.contactNo}</h3>
                    <p>{hotel.description}</p>
                </div>
            </div>
        </div>

    )
}
