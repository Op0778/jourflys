import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import connectionUrl from "./url.jsx";
import { useNavigate } from "react-router-dom";
function Tours() {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

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
          <div
            className="card"
            key={place._id}
            onClick={() => navigate(`/tours/${place._id}`)}
          >
            <h3>{place.name}</h3>
            <img className="card-img" src={place.image} alt="" />
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
