import React, { useState } from 'react';
import Modal from 'react-modal';
import './styles.css';
import { fetchAllPeople } from '../../Hooks/customHook';

export default function Confirmed({ tours }) {
    // ... (unchanged code)

    const [showModal, setShowModal] = useState(false);
    const [peopleList, setPeopleList] = useState([]);

    const openModal = async (id) => {
        const { people, status } = await fetchAllPeople(id);
        setPeopleList(people);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
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
                {tours
                    .map((item, index) => (
                        <div className="ConfirmTour_card" key={index}>
                            <div className="ConfirmTour_card_img">
                                <img src={item.image} alt="" />
                            </div>
                            <div className="ConfirmTour_card_info">
                                <h2>{item.name}</h2>
                                <h3>{item.place}</h3>
                                <h4>Hosted by: {item.hostedBy}</h4>
                                <p>{item.description}</p>
                                <h4>Start Date: {formatStartDate(item.startDate)}</h4>
                                <h4>End Date: {formatStartDate(item.endDate)}</h4>
                                <h4>Price: {item.price}</h4>
                                <div className="ConfirmTour_card_btns">
                                    <button
                                        className="ConfirmTour_card_btns_view_detail"
                                        onClick={() => {
                                            openModal(item._id);
                                        }}
                                    >
                                        View People
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                    .reverse() // Reverse the array here
                }
            </div>

            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                className="modal-container"
                overlayClassName="modal-overlay"
                contentLabel="Modal"
            >
                <h2 className="modal-title">List of People</h2>
                <div style={{marginBottom:'10px'}} className="people-list-container">
                    {peopleList.map((person, index) => (
                        <div key={index} className="person-item">
                            <p>Email: {person.email}</p>
                        </div>
                    ))}
                </div>
                <button onClick={closeModal} className="modal-button modal-close">
                    Close
                </button>
            </Modal>
        </div>
    );
}
