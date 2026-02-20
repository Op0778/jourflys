import { useParams } from "react-router-dom";

export default function TourDetails() {
  const { id } = useParams();
  const [places, setPlaces] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await axios.get(`${connectionUrl}/api/place/${id}`);
        setPlaces(res.data);
      } catch (e) {
        console.error("Error fetching place:", e);
        setError("place not found");
      } finally {
        setLoading(false);
      }
    };
    fetchPlace();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;
  if (!places) return <h2>No place details available</h2>;

  return (
    <div className="container">
      <h1>Tour Details</h1>
      <div className="grid">
        {places.map((place) => (
          <div className="card" key={place._id}>
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
        <button>
          <a
            href="https://wa.me/919384470778?text=Hi%20I%20want%20to%20book%20this%20tour"
            target="_blank"
          >
            Book via WhatsApp
          </a>
        </button>
      </div>
    </div>
  );
}
