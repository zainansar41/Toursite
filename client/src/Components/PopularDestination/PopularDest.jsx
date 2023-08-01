import React from 'react'
import "./styles.css";
import { useState } from "react";

import img1 from '../../Assets/img1.jpg'
import img2 from '../../Assets/img2.jpg'
import img3 from '../../Assets/img3.jpg'
import img4 from '../../Assets/img4.jpg'


const cards = [
    {
        header: "gilgit",
        image: img1,
        text: "Image description here"
    },
    {
        header: "naran",
        image: img2,
        text: "Image description here"
    },
    {
        header: "neelum",
        image: img3,
        text: "Image description here"
    },
    {
        header: "sawat",
        image: img4,
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
                            <img src={card.image} alt="" />
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


