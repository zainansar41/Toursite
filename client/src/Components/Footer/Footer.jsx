import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer>
            <div className="content">
                <div className="left box">
                    <div className="upper">
                        <div className="topic">About us</div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sit quidem ullam porro officia assumenda architecto ipsam cupiditate. Quam reprehenderit iusto in velit sapiente. Nulla a quas reiciendis quos at.</p>
                    </div>
                    <div className="lower">
                        <div className="topic">Contact us</div>
                        <div className="email">
                            <a href="mailto:abc@gmail.com"><i className="fas fa-envelope"></i> abc@gmail.com</a>
                        </div>
                    </div>
                </div>
                <div className="middle box">
                    <div className="topic">Our Services</div>
                    <div><Link to={'/'}>See Recent Tours</Link></div>
                    <div><Link to={'/'}>See Reviews</Link></div>
                    <div><Link to={'/'}>Show Tours</Link></div>
                </div>
                <div className="right box">
                    <div className="topic">Subscribe us</div>
                    <form action="#">
                        <div className="media-icons">
                            <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                            <a href="https://www.twitter.com/"><i className="fab fa-twitter"></i></a>
                            <a href="https://www.youtube.com/"><i className="fab fa-youtube"></i></a>
                            <a href="https://www.linkedin.com/"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </form>
                </div>
            </div>
            <div className="bottom">
                <p>Copyright © 2023 <Link to={'/'}>TourSite</Link> All rights reserved</p>
            </div>
        </footer>
    );
}
