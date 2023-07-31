import React from 'react'
import './styles.css'

import img13 from '../../Assets/img13.jpg'

const data = [
    {
        img: img13,
        name: 'Tour 1',
        place: 'Place 1',
        hosted_by: 'Host 1',
        description: 'Description 1 lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        start_date: '2021-05-01',
        end_date: '2021-05-05',
        price: 100,
        status: 'pending'
    },
    {
        img: img13,
        name: 'Tour 1',
        place: 'Place 1',
        hosted_by: 'Host 1',
        description: 'Description 1 lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        start_date: '2021-05-01',
        end_date: '2021-05-05',
        price: 100,
        status: 'pending'
    },
    {
        img: img13,
        name: 'Tour 1',
        place: 'Place 1',
        hosted_by: 'Host 1',
        description: 'Description 1 lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        start_date: '2021-05-01',
        end_date: '2021-05-05',
        price: 100,
        status: 'pending'
    },
    {
        img: img13,
        name: 'Tour 1',
        place: 'Place 1',
        hosted_by: 'Host 1',
        description: 'Description 1 lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        start_date: '2021-05-01',
        end_date: '2021-05-05',
        price: 100,
        status: 'pending'
    },

]

export default function ToConfirmTour() {
    return (
        <div className="toConfirmTour_div">
            <h1 className="toConfirmTour_title">To Confirm Tours</h1>
            <div className="toConfirmTour_container">
                {data.map((item, index) => (
                    <div className="toConfirmTour_card" key={index}>

                        <div className="toConfirmTour_card_img">
                            <img src={item.img} alt="" />
                        </div>

                        <div className="toConfirmTour_card_info">
                            <h2>{item.name}</h2>
                            <h3>{item.place}</h3>
                            <h4>Hosted by: {item.hosted_by}</h4>
                            <p>{item.description}</p>
                            <h4>Start Date: {item.start_date}</h4>
                            <h4>End Date: {item.end_date}</h4>
                            <h4>Price: {item.price}</h4>
                            <h4 style={{color:'red'}}>Status: {item.status}</h4>

                            <div className="toConfirmTour_card_btns">
                                <button className="toConfirmTour_card_btns_accept">Accept</button>
                                <button className="toConfirmTour_card_btns_reject">Reject</button>

                            </div>
                        </div>

                    </div>
                )
                )}
            </div>
        </div>
    )
}
