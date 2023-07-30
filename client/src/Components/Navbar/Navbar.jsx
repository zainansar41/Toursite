import React from 'react'
import './Navbar.css'

import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav>
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="checkbtn">
                <i className="fas fa-bars"></i>
            </label>
            <Link to="/" className="logo ">Tour Site</Link>
            <ul>
                <li><Link to="/" className="active a">Home</Link></li>
                <li><Link className='a' to="/about">About</Link> </li>
                <li><Link className='a' to="/trips">Trips</Link></li>
                <li><Link className='a' to="/contact">Contact</Link></li>
            </ul>
        </nav>
    )
}