import React from 'react'
import "./styles.css";
import { useState } from "react";


import gilgit from '../../Assets/gilgit.jpg'
import naran from '../../Assets/naran.jpg'
import neelum from '../../Assets/neelum.jpg'
import sawat from '../../Assets/sawat.jpg'


const cards = [
    {
        header: "gilgit",
        image: gilgit,
        text: "Image description here"
    },
    {
        header: "naran",
        image: naran,
        text: "Image description here"
    },
    {
        header: "neelum",
        image: neelum,
        text: "Image description here"
    },
    {
        header: "sawat",
        image: sawat,
        text: "Image description here"
    }
];

export default function PopularDest() {
    const [active, setActive] = useState(0);

    return (
        <>
            <div className="popular_dest">
                <h1 >Popular Destinations</h1>

                <section>
                    {cards.map((card, index) => (
                        <article
                            key={card.image}
                            className={index === active ? "active" : ""
                            }
                            onClick={() => setActive(index)}
                        >
                            <img src="https://plus.unsplash.com/premium_photo-1690164161389-1921e4981b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=875&q=80" alt="" />
                            <div className='content'>
                                <div>
                                    <h2>{card.header}</h2>
                                    <p>{card.text}</p>
                                </div>
                            </div>


                        </article>
                    )
                    )}
                </section>
            </div>
        </>
    )
}


