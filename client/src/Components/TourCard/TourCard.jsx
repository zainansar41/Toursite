import React from 'react';
import './styles.css'; // Make sure to import your CSS file
import { Link } from 'react-router-dom';

const TourCard = ({data}) => {
  return (
    <div className="tourContainer">
      <div className="card tourCard">
        <div className="img">
          <img src={data.image} alt="Tour" />
        </div>
        <div className="top-text">
          <div className="name">{data.tourName}</div>
          <p>Price : {data.price}</p>
        </div>
        <div className="bottom-text">
          <div className="text">
            {data.description}
          </div>
          <div className="Tourbtn">
            <Link to={`/detail/${data._id}`}>Show Details</Link>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default TourCard;
