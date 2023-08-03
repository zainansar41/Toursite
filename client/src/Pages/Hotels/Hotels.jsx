import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchAllHotels } from '../../Hooks/customHook'
import './styles.css'


const addElipse = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + '....' : str;
}


export default function Hotels() {
    const [Hotels, setHotels] = useState([]);

    useEffect(() => {
        fetchAllHotels()
            .then(res => setHotels(res))
            .catch(error => {
                // Handle the error, e.g., show an error message or log the error
                console.error('Error fetching hotels:', error);
            });
    }, [Hotels]);

    return (
        <>
            <h1 className='heading'>Hotels</h1>
            <div className='hotels'>
                {Hotels.map((hotel, index) => (
                    <div className='hotel' key={index}>
                        <img src={`http://localhost:5000/images/${hotel.image}`} alt='' />
                        <div className='hotel-info'>
                            <h2 style={{textAlign:'center'}}>{hotel.hotelName}</h2>
                            <p>{addElipse(hotel.description, 450)}</p>
                            <p style={{color:'#4caf50', fontSize:"20px", fontWeight:'700'}}>Price: {hotel.perDayPrice}</p>
                            <p style={{fontSize:'20px'}}>Location: {hotel.location}</p>
                            <Link className='link' to={`/hotels/${hotel._id}`}>View</Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
