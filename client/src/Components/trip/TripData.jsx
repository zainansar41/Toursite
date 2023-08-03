import './trip.css'
import { Link } from 'react-router-dom';

const addElipse = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + '....' : str;
}

function TripData(props) {
    return (
        <div className="t-card">
            <div className="t-image">
                <img src={`http://localhost:5000/images/${props.image}`} alt="" />
            </div>
            <h4>{props.heading}</h4>
            <p>{addElipse(props.text, 400)}</p>
            <Link class="action" to={`/detail/${props.id}`}>
                Find out more
                <span aria-hidden="true">
                    →
                </span>
            </Link>
        </div>
    )
}
export default TripData;