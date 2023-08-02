import React from 'react';
import './hero.css';

export default function Hero({ himg, htag, hbtn, head, hdesc, onSearch }) {
    const handleSearchChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === '') {
            // If "Select Location" is selected, show all plannedTours without filter
            onSearch('');
        } else {
            onSearch(selectedValue);
        }
    };

    return (
        <div className="hero">
            

            <img src={himg} alt="home_hero" />
            <div className="hero_desc">
                <h1 className="hero_heading">{head}</h1>
                <p className={htag}>{hdesc}</p>
                <div className="search-container">
                    <div>
                        <label htmlFor="location">Search Location</label>
                        <select
                            required
                            className="input"
                            name="location"
                            id="location"
                            onChange={handleSearchChange}
                        >
                            <option value="">All</option>
                            <option value="Naran">Naran</option>
                            <option value="Gilgit">Gilgit</option>
                            <option value="Swat">Swat</option>
                            <option value="Kashmir">Kashmir</option>
                        </select>
                    </div>
                    <button className={hbtn}>
                        <span>Easy Booking</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
