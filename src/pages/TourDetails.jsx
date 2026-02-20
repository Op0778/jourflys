import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import connectionUrl from "./url.jsx";

export default function TourDetails() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await axios.get(`${connectionUrl}/api/place/${id}`);
        setPlace(res.data);
      } catch (e) {
        console.error("Error fetching place:", e);
        setError("Place not found");
      } finally {
        setLoading(false);
      }
    };
    fetchPlace();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;
  if (!place) return <h2>No place details available</h2>;

  return (
    <div className="container">
      <h1>Tour Details</h1>
      <div className="grid">
        <div className="card tour-details-card">
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
          <button>
            <a
              href={`https://wa.me/919384470778?text=Hi%20I%20want%20to%20book%20this%20tour  "${place.name}"`}
              target="_blank"
            >
              Book via WhatsApp
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
