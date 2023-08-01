import React, {useState, useEffect} from 'react'
import './trippage.css'

import { fetchAllTours } from '../../Hooks/customHook'
import Trip from '../../Components/trip/Trip'
import CompleteTour from '../../Components/completeTour/CompleteTour'

export default function TripPage() {
    const [tours, setTours] = useState([])
    const [plannedTours, setplannedTours] = useState([])
    const [ongoingTours, setongoingTours] = useState([])
    const [completedTours, setcompletedTours] = useState([])

    useEffect(() => {
        fetchAllTours().then((result) => {
            setTours(result);
        });
    }, []);

    useEffect(() => {
        const a = tours.filter((tour) => tour.status === 'planned');
        const b = tours.filter((tour) => tour.status === 'ongoing');
        const c = tours.filter((tour) => tour.status === 'completed');
        setplannedTours(a)
        setongoingTours(b)
        setcompletedTours(c)


    }, [tours])
    return (
        <>
            <CompleteTour plannedTours={plannedTours} />
            <Trip completedTours={completedTours} />
        </>
    )
}
