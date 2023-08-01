import React from 'react'
import './styles.css'
import hero from '../../Assets/hero.jpg'




export default function ServiceSec() {
    return (
        <>
            <h1>Services</h1>

            <div className="service_sec">
                <img className='ser_img' src={hero} alt="" />
                <div className="services">
                    <div className="service">
                        <i class="fa-solid fa-house"></i>
                        <h2>Service 1</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                    </div>
                    <div className="service">
                        <i class="fa-regular fa-envelope"></i>
                        <h2>Service 1</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                    </div>
                    <div className="service">
                        <i class="fa-solid fa-plate-wheat"></i>
                        <h2>Service 1</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                    </div>
                    <div className="service">
                        <i class="fa-solid fa-phone"></i>
                        <h2>Service 1</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                    </div>

                </div>
            </div>
        </>
    )
}
