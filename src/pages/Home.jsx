import { Link } from "react-router-dom";
import Tours from "./Tours";

export default function Home() {
  return (
    <>
      <div className="container">
        <section className="hero">
          <h1>Explore the Beauty of Local Destinations</h1>
          <p>Discover unforgettable guided tours</p>
          <Link to="/tours" className="btn">
            View Tours
          </Link>
        </section>
      </div>
      <div>
        <Tours />
      </div>
    </>
  );
}
