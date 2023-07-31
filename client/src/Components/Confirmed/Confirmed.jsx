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
        status: 'confirmed'
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
        status: 'confirmed'
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
        status: 'confirmed'
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
        status: 'confirmed'
    },

]
export default function Confirmed() {
    return (
        <div className="ConfirmTour_div">
            <h1 className="ConfirmTour_title">Confirmed</h1>
            <div className="ConfirmTour_container">
                {data.map((item, index) => (
                    <div className="ConfirmTour_card" key={index}>

                        <div className="ConfirmTour_card_img">
                            <img src={item.img} alt="" />
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
