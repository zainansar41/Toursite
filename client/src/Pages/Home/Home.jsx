import React from 'react'
import PopularDest from '../../Components/PopularDestination/PopularDest'
import Hero from '../../Components/heroSection/Hero'
import homeHero from '../../Assets/homeHero.jpg'

import ServiceSec from '../../Components/ServicesSection/ServiceSec'
import Trip from '../../Components/trip/Trip'

import TourCard from '../../Components/TourCard/TourCard'

export default function Home() {
    return (
        <>
            <Hero himg={homeHero} htag={"hero_tag"} hbtn={"BTN"} head={"Start Yout Journey with us"} hdesc={"we offer best pakage for traveling and exploring world"} />
            <PopularDest />
            <ServiceSec />
            <Trip />
            <TourCard />
        </>
    )
}
