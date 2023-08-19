import React from 'react'

import {AcceptRejectHotel } from '../../Hooks/customHook';
import toast, { Toaster } from 'react-hot-toast'




export default function ToConfirmHotel({ tours }) {
    const handleAcceptBTN = async (id) => {
        const res = await AcceptRejectHotel(id, "accept");
        if (res.status === 201) {
            toast.success('Hotel Accepted')
            window.location.reload();        }
        else {
            toast.error('Hotel Not Accepted')
        }
        
    }
    const handleRejectBTN = async (id) => {
        const res = await AcceptRejectHotel(id, "reject");
        if (res.status === 203) {
            toast.success('Hotel Rejected')
            window.location.reload();        }
        else{
            toast.error('Hotel Not Rejected')
        }
    }
    
    return (
        <div className="toConfirmTour_div">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <h1 className="toConfirmTour_title">To Confirm Hotels</h1>
            <div className="toConfirmTour_container">
                {tours.map((item, index) => (
                    <div className="toConfirmTour_card" key={index}>

                        <div className="toConfirmTour_card_img">
                            <img src={`http://localhost:5000/images/${item.image}`}alt="" />
                        </div>

                        <div className="toConfirmTour_card_info">
                            <h2>{item.hotelName}</h2>
                            <h3>{item.location}</h3>
                            <p>{item.description}</p>
                            <h4>Price: {item.perDayPrice}</h4>
                            <h4>Price: {item.contactNo}</h4>
                            <h4 style={{ color: 'red' }}>Status: Pending</h4>

                            <div className="toConfirmTour_card_btns">
                                <button className="toConfirmTour_card_btns_accept" onClick={() => handleAcceptBTN(item._id)}>Accept</button>
                                <button className="toConfirmTour_card_btns_reject" onClick={()=>handleRejectBTN(item._id)}>Reject</button>

                            </div>
                        </div>

                    </div>
                )
                )}
            </div>
        </div>
    )
}
