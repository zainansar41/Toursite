import React from 'react'





export default function ConfirmedHotel({ tours }) {
    
    
    return (
        <div className="toConfirmTour_div">
            
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
                            <h4 style={{ color: 'blue' }}>Status: Confirmed</h4>

                        </div>

                    </div>
                )
                )}
            </div>
        </div>
    )
}
