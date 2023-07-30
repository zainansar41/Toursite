import React from 'react';
import './styles.css'; // Make sure to import your CSS file
import img13 from '../../Assets/img13.jpg'
import { Link } from 'react-router-dom';

const TourCard = () => {
  return (
    <div className="tourContainer">
      <div className="card tourCard">
        <div className="img">
          <img src={img13} alt="Tour" />
        </div>
        <div className="top-text">
          <div className="name">Tour Name</div>
          <p>Price : 2222</p>
        </div>
        <div className="bottom-text">
          <div className="text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem quaerat iusto adipisci reprehenderit quasi cum perspiciatis, minima reiciendis magni quam!
          </div>
          <div className="Tourbtn">
            <Link to={"/detail/2"}>Show Details</Link>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default TourCard;
