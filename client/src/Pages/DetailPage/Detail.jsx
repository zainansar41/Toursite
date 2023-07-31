import React, { useEffect, useState } from 'react';
import './styles.css';
import { useParams } from 'react-router-dom';
import { fetchTour } from '../../Hooks/customHook';

export default function Detail() {
  const { id } = useParams();
  const [tour, setTour] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTour(id)
      .then((result) => {
        console.log(result);
        setTour(result);
        setLoading(false); // Mark the data as loaded
      })
      .catch((error) => {
        console.error('Error fetching tour:', error);
        setLoading(false); // Mark the data as loaded even in case of an error
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Function to format the date to display only the month and year
  const formatStartDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="detail">
      <img src={tour.image} alt="" />
      <div className="detail-info">
        <h1 className="Tourtitle"> {tour.tourName}</h1>
        <h4 className="TourLocation">where to go: {tour.location}</h4>
        <h4 className="from">from where : {tour.from}</h4>
        <h4 style={{color:'royalblue'}} className="price">Price: {tour.price}</h4>
        <p className="TourDesc">{tour.description}</p>
        <h4 className="TourStart">{formatStartDate(tour.startDate)}</h4>
        {/* Use the formatStartDate function to display the formatted date */}
        <h4 className="TourEnd">{formatStartDate(tour.endDate)}</h4>
        {/* Use the formatStartDate function to display the formatted date */}
        <h4 className="TourHosted">{tour.hostedBy}</h4>

        <div className="detail-btns">
          <button className="btn">Book Now</button>
        </div>
      </div>
    </div>
  );
}
