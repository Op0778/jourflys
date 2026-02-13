import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import connectionUrl from "./url.jsx";
function Tours() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get(`${connectionUrl}/api/places`).then((res) => {
      setPlaces(res.data);
    });
  }, []);

  return (
    <div className="container">
      <h1>Jourfly – Local Tourism</h1>

      <div className="grid">
        {places.map((place) => (
          <div className="card" key={place._id}>
            <img className="card-img" src={place.image} alt="" />
            <h3>{place.name}</h3>
            <p>
              <b>Category:</b> {place.category}
            </p>
            <p>
              <b>Location:</b> {place.location}
            </p>
            <p>
              <b>Type:</b> {place.type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tours;
