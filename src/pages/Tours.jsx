import { Link } from "react-router-dom";

export default function Tours() {
  const tourPlaces = [
    {
      place: "Hill Station Adventure",
      price: "4,999",
      path: "/tours/1",
    },
    {
      place: "Beach Paradise",
      price: "3,999",
      path: "/tours/2",
    },
    {
      place: "Wildlife Safari",
      price: "5,999",
      path: "/tours/3",
    },
  ];
  return (
    <div className="container">
      <h1>Our Tours</h1>
      <div className="grid">
        {tourPlaces.length === 0 ? (
          <p>No tours available</p>
        ) : (
          tourPlaces.map((place) => (
            <div className="card" key={place.id}>
              <h3>{place.place}</h3>
              <p>Starts from ₹{place.price}</p>
              <Link to={place.path} className="btn">
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
