import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BiSolidCartAdd } from "react-icons/bi";
import { useCart } from "../contexts/cartContext";
import './css/PropertyDetailsPage.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



// Define the PropertyDetailsPage component
function PropertyDetailsPage() {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  // Get the property ID from the URL parameters
  const { propertyId } = useParams();

  // Get the addToCart function from the cart context
  const { addToCart } = useCart();

  // Define state variables for the property, loading status, error message, and active image index
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  // Define a useEffect hook to fetch the property data when the component mounts
  useEffect(() => {
    const getProperty = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/api/properties/${propertyId}`);

        setProperty(res.data);
        setLoading(false);
        
      } catch (err) {
        setError('Something went wrong!');
        console.error(err.message);
      }
    };

    getProperty();
  }, [propertyId]);

  // Define a function to handle the click event of the "Add to Cart" button
  const handleClick = () => {
    addToCart(property);
  };

  // Render a loading message if the data is still being fetched
  if(loading) {
    return (
      <p>Loading...</p>
    );
  }

  // Render nothing if there's no property data
  if(!property) return null;

  // Render the property details
  return (
    <div className="Propertydetail-body">
      <div className="Property-detailcontainer">
        <div className="property-header">
          <h1 className="property-name">{property.title}</h1>
          <p>___________________________________________________________</p>
          <p className="property-host">Värd: {property.host}</p>
        </div>
      <div className="property-card-main">
          <div className="Property-images">
            <img src={property.images[activeImg]} alt="property image" className="big-image" />
            <div className="Images-small">
            {property.images.map((image, index) => (
              <div key={index} onClick={() => setActiveImg(index)} className="next-img">
                <img src={image} className="property-img"/>
              </div>
            ))}
          </div>
        </div>
        <div className="details">
        <div className="purchase-details">
          <p className="property-price">Pris/natt: <span>{property.price}</span> :-</p>
          <p className="property-rating">Betyg: <span>{property.rating}</span> / 5</p>
            <div className="property-included">
              <div className="property-rooms">
                <p className="property-bedrooms">
                  <img src="https://i.gyazo.com/2042d095138ff3395abab38724e6941d.png" className="property-beds" />
                  {property.bedrooms}
                  </p>
                <p className="property-bathrooms">
                  <img src="https://i.gyazo.com/8e26f7f6cb666f9eeeba2ada259d97ab.png" className="property-baths"/>
                  {property.bathrooms}
                  </p>
              </div>
              <div className="property-access">
                  {property.accessabilities.map((accessability, index) => (
                    <img
                      key={index}
                      src={accessability}
                      className="property-icon"
                      alt={`accessability ${index}`}
                    />
                  ))}
                </div>
              </div>
              <div className="calendar-section">
        <label>
          Check-in:
          <DatePicker
            selected={checkIn}
            onChange={date => setCheckIn(date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={new Date()}
            placeholderText="Välj incheckningsdatum"
          />
        </label>
        <label>
          Check-out:
          <DatePicker
            selected={checkOut}
            onChange={date => setCheckOut(date)}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn || new Date()}
            placeholderText="Välj utcheckningsdatum"
          />
        </label>
      </div>
      <button onClick={handleClick} className="Add-btn">
            Lägg till i kundvagn
            <BiSolidCartAdd className="CartIcon" />
          </button>
            </div>
          </div>
        </div>
        <div className="property-info-bottom">
            <div className="property-info">
              <h2>Om boendet</h2>
              <h2>Information</h2>
              <p className="property-city">Vart: {property.location}</p>
              <p className="property-desc">{property.description}</p>
            </div>
        <div className="property-map">
          <h2>Karta</h2>
          <p>Här kan du se var boendet är beläget.</p>
            <div style={{ height: "400px", width: "100%", marginTop: "2rem" }}>
              {property.coordinates && property.coordinates.latitude && property.coordinates.longitude ? (
                <div style={{ height: "400px", width: "100%", marginTop: "2rem" }}>
                  <MapContainer
                    center={[property.coordinates.latitude, property.coordinates.longitude]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[property.coordinates.latitude, property.coordinates.longitude]}>
                      <Popup>
                        {property.title}
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              ) : (
                <div style={{ marginTop: "2rem" }}>
                  <p>Ingen karta tillgänglig för detta boende.</p>
                </div>
              )}
            </div>
              
            </div>
          
        </div>
      </div>
    </div>

  );
}
export default PropertyDetailsPage;