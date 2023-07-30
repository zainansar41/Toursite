import React from 'react'
import './styles.css'


export default function Detail() {
    return (
        <div className="detail">
            <img src="https://plus.unsplash.com/premium_photo-1690164161389-1921e4981b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=875&q=80" alt="" />
            <div className="detail-info">
                <h1 className='Tourtitle'>Tour Name</h1>
                <h4 className='TourLocation'>Location</h4>
                <h4 className='from'>From</h4>
                <h4 className='price'>Price</h4>
                <p className='TourDesc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error ea non voluptatum quod ipsam animi quidem! Distinctio consequuntur et, explicabo dolores iste aliquam magnam nobis at in magni ullam. Animi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore labore, debitis ducimus illo animi nemo ipsum ut? Culpa, voluptatem maxime facere nostrum similique quae doloribus enim dolore et perspiciatis incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur harum illum ab earum exercitationem quasi, ea quidem adipisci soluta? Doloremque nulla numquam facere animi illum fugit distinctio quasi quam molestias?</p>
                <h4 className='TourStart'>10/23.12</h4>
                <h4 className='TourEnd'>10/23.12</h4>
                <h4 className='TourHosted'>Hosted By</h4>

                <div className="detail-btns">
                    <button class="btn"> Book Now
                    </button>

                </div>
            </div>

        </div>
    )
}
