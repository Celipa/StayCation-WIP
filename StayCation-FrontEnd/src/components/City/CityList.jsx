import { CityCard } from "./CityCard";
import React, { useState } from "react";
import './CityStyling.css';

const CityList = ({ cities }) => {
  const [search, setSearch] = useState("");

  const filteredCities = search
  ? cities.filter(city =>
      city.cityName &&
      city.cityName[0]?.toLowerCase() === search.trim().toLowerCase()[0]
    )
  : cities;
  
  return (
    <div className="city-body">
      <div className="city-header-container">
      <div className="city-header">
        <h1 className="city-title">Vart vill du boka?</h1>
      </div>
      <div className="search">
              <input
            type="text"
            className="SökBar"
            placeholder="Sök..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
              <button
            type="button"
            className="SearchIcon"
            onClick={() => { /* valfritt: du kan hantera sökknappen här */ }}
          >
            <i className="fas fa-search"></i>
          </button>
            </div>
      <div className="StayCation-Slogan">
        <h2 className="Slogan">Upptäck världen hemifrån – din bästa semester väntar runt hörnet!</h2> 
        </div>
      </div>
      <div className="cities-container">
          {filteredCities.map(city => (
  <CityCard key={city._id} city={city} />
))}
        </div>
    </div>
  );
};

CityList.Skeleton = () => {
  return (
    <div className="cities-container">
      <div className="city-skeleton" />
    </div>
  );
};

export default CityList;