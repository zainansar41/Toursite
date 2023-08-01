import React from 'react'
import './styles.css'

import { fetchAllPeople } from '../../Hooks/customHook'



export default function Confirmed({ tours }) {

    const viewPeople = async (id) => {
        const { people, status } = await fetchAllPeople(id);
        console.log(people);
        if (people.length === 0) {
            alert("No People");
        } else {
            const emails = people.map((person) => person.email).join("\n");
            const heading = "List of Emails:";
            const message = `${heading}\n${emails}`;
            alert(message);
        }
    };

    const formatStartDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

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
                            <h4>Start Date: {formatStartDate(item.startDate)}</h4>
                            <h4>End Date: {formatStartDate(item.endDate)}</h4>
                            <h4>Price: {item.price}</h4>

                            <div className="ConfirmTour_card_btns">
                                <button className="ConfirmTour_card_btns_view_detail" onClick={() => { viewPeople(item._id) }}>View People</button>
                            </div>
                        </div>

                    </div>
                )
                )}
            </div>
        </div>)
}
