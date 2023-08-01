import React from 'react'
import './Navbar.css'

import { Link } from 'react-router-dom';

export default function Navbar({name, role}) {

    return (
        <nav>
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="checkbtn">
                <i className="fas fa-bars"></i>
            </label>
            <Link to="/" className="logo ">Tour Site</Link>
            <ul>
                <li><Link to="/" className="active a">Home</Link></li>
                {role !== 'admin'? <li><Link className='a' to="/trips">Trips</Link></li> : null}
                {role !== 'admin'? <li><Link className='a' to="/contact">contact</Link></li> : null}
                {role === 'HM' || role === 'admin'? <li><Link className='a' to="/upload">Upload</Link></li> : null}
                {role === 'admin'? <li><Link className='a' to="/admin/main">Admin Screen</Link></li> : null}
                {role === 'admin'? <li><Link className='a' to="/admin/message">See Msg</Link></li> : null}
                {role === 'admin'? <li><Link className='a' to="/admin/user">See Users</Link></li> : null}
                {name || role !=='admin' ? <li><Link className='a' to="/">{name}</Link></li> : <li><Link className='a' to="/login">Login</Link></li> }
            </ul>
        </nav>
    )
}