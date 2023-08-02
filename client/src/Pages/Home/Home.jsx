import React, { useEffect, useState } from 'react';
import PopularDest from '../../Components/PopularDestination/PopularDest';
import Hero from '../../Components/heroSection/Hero';
import ServiceSec from '../../Components/ServicesSection/ServiceSec';
import Trip from '../../Components/trip/Trip';
import CompleteTour from '../../Components/completeTour/CompleteTour';
import hero from '../../Assets/hero.jpg';
import { fetchAllTours } from '../../Hooks/customHook';
import './styles.css';
import toast, { Toaster } from 'react-hot-toast';


export default function Home() {
    const [tours, setTours] = useState([]);
    const [plannedTours, setPlannedTours] = useState([]);
    const [ongoingTours, setOngoingTours] = useState([]);
    const [completedTours, setCompletedTours] = useState([]);

    useEffect(() => {
        fetchAllTours().then((result) => {
            setTours(result);
        });
    }, []);

    useEffect(() => {
        const a = tours.filter((tour) => tour.status === 'planned');
        const b = tours.filter((tour) => tour.status === 'ongoing');
        const c = tours.filter((tour) => tour.status === 'completed');
        setPlannedTours(a);
        setOngoingTours(b);
        setCompletedTours(c);
    }, [tours]);

    const handleSearch = (searchValue) => {
        // Filter plannedTours based on the searchValue
        if (searchValue === '') {
            const a = tours.filter((tour) => tour.status === 'planned');
            setPlannedTours(a);
            toast.success('Scroll down to where we going! 🚀');
        }
        else {
            const filteredTours = plannedTours.filter((tour) =>
                tour.tourName.toLowerCase().includes(searchValue.toLowerCase())
            );

            setPlannedTours(filteredTours);
            toast.success('Scroll down to where we going! 🚀');

        }

    };

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Hero
                himg={hero}
                htag={'hero_tag'}
                hbtn={'BTN'}
                head={'Start Your Journey with us'}
                hdesc={'we offer the best packages for traveling and exploring the world'}
                onSearch={handleSearch}
            />
            <PopularDest />
            <ServiceSec />
            <Trip completedTours={completedTours} />
            <CompleteTour plannedTours={plannedTours} />
        </>
    );
}
