import React, { useEffect, useState } from 'react'
import PopularDest from '../../Components/PopularDestination/PopularDest'
import Hero from '../../Components/heroSection/Hero'
import homeHero from '../../Assets/homeHero.jpg'

import ServiceSec from '../../Components/ServicesSection/ServiceSec'
import Trip from '../../Components/trip/Trip'
import CompleteTour from '../../Components/completeTour/CompleteTour'


import { fetchAllTours } from '../../Hooks/customHook'

import './styles.css'


export default function Home() {
    const [tours, setTours] = useState([])
    const [plannedTours , setplannedTours ] = useState([])
    const [ongoingTours  , setongoingTours  ] = useState([])
    const [completedTours  , setcompletedTours  ] = useState([])

    useEffect(() => {
        fetchAllTours().then((result) => {
            setTours(result);
        });
    }, []);

    useEffect(()=>{
        const a = tours.filter((tour) => tour.status === 'planned');
        const b = tours.filter((tour) => tour.status === 'ongoing');
        const c = tours.filter((tour) => tour.status === 'completed');
        setplannedTours(a)
        setongoingTours(b)
        setcompletedTours(c)
        console.log(plannedTours, ongoingTours, completedTours);


    },[tours])

    return (
        <>
            <Hero himg={homeHero} htag={"hero_tag"} hbtn={"BTN"} head={"Start Yout Journey with us"} hdesc={"we offer best pakage for traveling and exploring world"} />
            <PopularDest />
            <ServiceSec />
            <Trip completedTours={completedTours} />
            <CompleteTour plannedTours ={plannedTours}/>
        </>
    )
}
