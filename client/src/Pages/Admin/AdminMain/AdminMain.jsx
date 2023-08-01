import React, {useState, useEffect} from 'react'
import ToConfirmTour from '../../../Components/ToConfirm/ToConfirmTour'
import Confirmed from '../../../Components/Confirmed/Confirmed'
import { fetchAllTours } from '../../../Hooks/customHook'


export default function AdminMain() {
    const [tours, setTours] = useState([])
    const [plannedTours , setplannedTours ] = useState([])
    const [otherTours  , setOtherTours  ] = useState([])
    

    useEffect(() => {
        fetchAllTours().then((result) => {
            setTours(result);
        });
    }, [tours]);

    useEffect(()=>{
        const a = tours.filter((tour) => tour.confirmed === false);
        const b = tours.filter((tour)=> tour.confirmed ===true)
        setplannedTours(a)
        setOtherTours(b)


    },[tours])

    return (
        <>
            <ToConfirmTour tours={plannedTours} />
            <Confirmed tours ={otherTours}/>
        </>
    )
}
