import './trip.css'

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
            <p>{addElipse(props.text, 500)}</p>
        </div>
    )
}
export default TripData;