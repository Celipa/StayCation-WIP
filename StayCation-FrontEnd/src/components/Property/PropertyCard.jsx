import React from 'react';
import { Link } from 'react-router-dom';
import './PropertyStyling.css';

export const PropertyCard = ({ property }) => {
  return (
    <div className="property">
      <Link to={`/details/${property._id}`} className="details-link">
        <div className="property-card">
          {/* Pris, namn och betyg */}
          <div className="card-header-row">
            <span className="property-price">{property.price} SEK/natt</span>
            <span className="property-name">{property.title}</span>
            <span className="property-rating-badge">
              {property.rating} <img src="https://i.gyazo.com/ed982bec85cda2d6d58eef250830d347.png" className="star" alt="star" />
            </span>
          </div>
          {/* Bild */}
          <div className="img-box">
            <img src={property.images[0]} className="property-thumbnail" alt={property.title} />
          </div>
          <div className="property-info">
            {/* Rad 1: Fakta */}
            <div className="property-info-row">
              <span className="property-icon-text">
                <img src="https://cdn-icons-png.flaticon.com/512/535/535239.png" className="icon" alt="Plats" />
                {property.location}
              </span>
              <span className="property-icon-text">
                <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" className="icon" alt="Yta" />
                {property.area ? `${property.area} m²` : "150 m"}
              </span>
              <span className="property-icon-text">
                <img src="https://cdn-icons-png.flaticon.com/512/854/854878.png" className="icon" alt="Transport" />
                {property.transportation}
              </span>
              <div className="property-anemities">
              {property.bathrooms && (
                <span className="property-icon-text">
                  <img src="https://i.gyazo.com/5ee9a3675522f61c2ef416fdc25d2883.png" className="icon" alt="Badrum" />
                  {property.bathrooms}
                </span>
              )}
              {property.bedrooms && (
                <span className="property-icon-text">
                  <img src="https://i.gyazo.com/2042d095138ff3395abab38724e6941d.png" className="icon" alt="Sovrum" />
                  {property.bedrooms}
                </span>
              )}
            </div>
            </div>

            {/* Rad 2: Bekvämligheter, Recension, Accessabilities */}
            <div className="property-card-row">
              {property.amenities && property.amenities.length > 0 && (
                <span className="property-icon-text">
                  <img src="https://cdn-icons-png.flaticon.com/512/609/609803.png" className="icon" alt="Bekvämligheter" />
                  {property.amenities.join(', ')}
                </span>
              )}
              {property.reviews && property.reviews.length > 0 && (
                <span className="property-icon-text" style={{fontStyle: "italic", color: "#555"}}>
                  “{property.reviews[0].comment}”
                </span>
              )}
              {property.accessabilities && property.accessabilities.length > 0 && (
                <div className="accessabilities-box" style={{ marginLeft: "auto" }}>
                  {property.accessabilities.map((icon, idx) =>
                    icon ? (
                      <img
                        key={idx}
                        src={icon}
                        className="icon"
                        alt="Tillgänglighet"
                      />
                    ) : null
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};