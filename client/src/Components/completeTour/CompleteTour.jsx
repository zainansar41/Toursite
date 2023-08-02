import React from 'react';
import TourCard from '../TourCard/TourCard';

export default function CompleteTour({ plannedTours }) {
    const confirmedTours = plannedTours.filter((tripData) => tripData.confirmed);

    return (
        <div className="trip">
            <h1>Where we Going</h1>
            <p>Join us!</p>
            <div className="trip-card">
                {confirmedTours.map((tripData, index) => (
                    <TourCard key={index} data={tripData} />
                ))}
            </div>
        </div>
    );
}
