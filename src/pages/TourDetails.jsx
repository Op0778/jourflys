import { useParams } from "react-router-dom";

export default function TourDetails() {
  const { id } = useParams();

  return (
    <div className="container">
      <h1>Tour Details</h1>
      <p>Tour ID: {id}</p>

      <p>This tour includes sightseeing, local guide, food & transport.</p>

      <a
        href="https://wa.me/919384470778?text=Hi%20I%20want%20to%20book%20this%20tour"
        target="_blank"
      >
        Book via WhatsApp
      </a>
    </div>
  );
}
