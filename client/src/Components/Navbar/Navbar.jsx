import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar({ name, role }) {

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/'
    };

    return (
        <nav>
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="checkbtn">
                <i className="fas fa-bars"></i>
            </label>
            <Link to="/" className="logo">EasyBooking</Link>
            <ul>
                <li><Link to="/" className="active a">Home</Link></li>
                {role !== 'admin' ? <li><Link className='a' to="/trips">Trips</Link></li> : null}
                {role !== 'admin' ? <li><Link className='a' to="/contact">Contact</Link></li> : null}
                {role === 'HM' || role === 'admin' ? <li><Link className='a' to="/upload">Upload</Link></li> : null}
                {role === 'admin' ? <li><Link className='a' to="/admin/main">Admin Screen</Link></li> : null}
                {role === 'admin' ? <li><Link className='a' to="/admin/message">See Msg</Link></li> : null}
                {role === 'admin' ? <li><Link className='a' to="/admin/user">See Users</Link></li> : null}
                {name ?
                    <li><button style={{border:'none', backgroundColor:'#0082e6', color:"white"}} onClick={handleLogout} className='a'>Logout</button></li> :
                    <li><Link className='a' to="/login">Login</Link></li>
                    }
            </ul>
        </nav>
    )
}
