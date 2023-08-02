import React from 'react';
import './styles.css'; // Make sure to import your CSS file
import { Link } from 'react-router-dom';

const addElipse = (str, limit)=>{
  return str.length > limit ? str.substring(0, limit) + '....' :str;
}


const TourCard = ({ data }) => {
  return (
    <div class="card">
        <img src={`http://localhost:5000/images/${data.image}`} className='image'alt="" />
      <div class="content">
        <Link to={`/detail/${data._id}`} className='a'>
          <p style={{color:'black'}} class="title">
            {data.tourName}
          </p>
        </Link>

        <p class="desc">
          {addElipse(data.description, 300)}
        </p>
        <h3 className="price" style={{color:'royalBlue', fontWeight:'bold'}}>
          Price : {data.price}
        </h3>   

        <Link class="action" to={`/detail/${data._id}`}>
          Find out more
          <span aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </div>
  );
};

export default TourCard;
