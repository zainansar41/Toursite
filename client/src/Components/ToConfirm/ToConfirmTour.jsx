import React from 'react'
import './styles.css'

import { acceptOffer, rejectTour } from '../../Hooks/customHook';
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';




export default function ToConfirmTour({ tours }) {
    const navigate = useNavigate()
    const handleAcceptBTN = async (id) => {
        const { status } = await acceptOffer(id)
        if (status === 203) {
            toast.success("Update successful")
            navigate('/admin/main')
        }


    }
    const handleRejectBTN = async (id) => {
        const {msg, status} = await rejectTour(id)
        if(status === 201){
            toast.success(msg)
            navigate('/admin/main')
        }

    }
    const formatStartDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };
    return (
        <div className="toConfirmTour_div">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <h1 className="toConfirmTour_title">To Confirm Tours</h1>
            <div className="toConfirmTour_container">
                {tours.map((item, index) => (
                    <div className="toConfirmTour_card" key={index}>

                        <div className="toConfirmTour_card_img">
                            <img src={item.image} alt="" />
                        </div>

                        <div className="toConfirmTour_card_info">
                            <h2>{item.name}</h2>
                            <h3>{item.place}</h3>
                            <h4>Hosted by: {item.hosted_by}</h4>
                            <p>{item.description}</p>
                            <h4>Start Date: {formatStartDate(item.startDate)}</h4>
                            <h4>End Date: {formatStartDate(item.endDate)}</h4>
                            <h4>Price: {item.price}</h4>
                            <h4 style={{ color: 'red' }}>Status: {item.status}</h4>

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
