import React from 'react'
import './trip.css'

import TripData from './TripData'


export default function Trip({ completedTours }) {
  return (
    <div className="trip">
      <h1>Recent Trips</h1>
      <p>You can discover unique destinations sing google maps</p>
      <div className="trip-card">
        {completedTours.map((tripData, index) => (
          <TripData key={index} image={tripData.image} text={tripData.description} heading={tripData.tourName} />
        ))}
      </div>
    </div>
  )
}
