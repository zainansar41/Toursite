import React, { useEffect, useState } from 'react';
import './message.css';
import { fetchMessage, seenmsg } from '../../../Hooks/customHook';
import { useNavigate } from 'react-router-dom';

export default function Message() {
    const [message, setMessage] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetchMessage().then((result) => {
            if (result && result.messages) {
                setMessage(result.messages);
            }
        });
    }, [message]);

    const markAsRead = (id) => {
        seenmsg(id).then((result) => {
            alert("message marked as read")
            navigate('/admin/message')
        });
    };

        return (
            <div className="message">
                {message.length === 0 ? (
                    <h1 className='no_heading'>Nothing to show</h1>
                ) : (
                    <>
                        <h1>Messages</h1>
                        <div className="messageContainer">
                            {message.map((message, index) => (
                                <div className="message-card" key={index}>
                                    <h3>{message.firstName}</h3>
                                    <h3>{message.email}</h3>
                                    <h3>{message.contactNumber}</h3>
                                    <p>{message.message}</p>
                                    <button className='seenMessage' onClick={()=>{markAsRead(message._id)}}>Mark as read</button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    }
