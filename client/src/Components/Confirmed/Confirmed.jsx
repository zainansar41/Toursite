import React from 'react'
import './styles.css'


export default function Confirmed({tours}) {


    return (
        <div className="ConfirmTour_div">
            <h1 className="ConfirmTour_title">Confirmed</h1>
            <div className="ConfirmTour_container">
                {tours.map((item, index) => (
                    <div className="ConfirmTour_card" key={index}>

                        <div className="ConfirmTour_card_img">
                            <img src={item.image} alt="" />
                        </div>

                        <div className="ConfirmTour_card_info">
                            <h2>{item.name}</h2>
                            <h3>{item.place}</h3>
                            <h4>Hosted by: {item.hosted_by}</h4>
                            <p>{item.description}</p>
                            <h4>Start Date: {item.start_date}</h4>
                            <h4>End Date: {item.end_date}</h4>
                            <h4>Price: {item.price}</h4>

                            <div className="ConfirmTour_card_btns">
                                <button className="ConfirmTour_card_btns_view_detail">View People</button>

                            </div>
                        </div>

                    </div>
                )
                )}
            </div>
        </div>)
}
