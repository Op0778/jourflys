import logo from "../assets/logo.png";
export default function About() {
  const teamMembers = [
    {
      intro:
        "Loga Kumaresan R is a B.E. CSE Graduate from Anna University and a Certified Walk Tour Facilitator (NSQF Level 4) recognized by NCVET. Trained under PMKVY 4.0 through THSC, he combines technical expertise with tourism skills. He Intrested & Specializes in Organizing Safe, Engaging, and Customer-Focused Walk Tours that Promote Local Culture and Heritage.",
      photo: "https://i.ibb.co/HfMJxphF/logu-removebg-preview.png",
    },
    {
      intro:
        "Bharath Kumar S is a BE Computer Science graduate from Anna University and a Certified Walk Tour Facilitator (NSQF Level 4) recognized by NCVET. Trained under PMKVY 4.0 through THSC, he combines technical expertise with tourism skills. He specializes in organizing safe, engaging, and customer-focused walk tours that promote local culture and heritage.",
      photo: "https://i.ibb.co/dsGRLdjV/bharat-removebg-preview.png",
    },
    {
      intro:
        "Omprakash L.K is a BE Computer Science graduate from Anna University and a Certified Walk Tour Facilitator (NSQF Level 4) recognized by NCVET. Trained under PMKVY 4.0 through THSC, he combines technical expertise with tourism skills. He specializes in organizing safe, engaging, and customer-focused walk tours that promote local culture and heritage.",
      photo: "https://i.ibb.co/35N6gy0b/om-removebg-preview.png",
    },
  ];

  return (
    <div className="container">
      <h1>About Us</h1>
      <div className="grid">
        <p className="card text">
          Jourflys is a local tourism service provider dedicated to making city
          travel simple, affordable, and enjoyable. We help travelers explore
          multiple destinations in a single day with well-planned routes,
          reliable transport, and customer-focused service. Our goal is to
          support local tourism while creating meaningful travel experiences for
          our customers.
        </p>
        <img src={logo} alt="" />
      </div>

      <div className="grid">
        <h1 className="vision-and-mission">Vision</h1>
        <p className="card">
          To become the most trusted and customer-focused travel and event
          service provider, delivering safe, memorable, and well-organized trips
          that promote tourism and enhance city recognition.
        </p>
      </div>

      <div className="grid">
        <p className="card">
          <div className="hero">
            To organize and operate a minimum of 7 successful trips, ensuring
            quality service in every journey.
          </div>
          <div className="hero">
            To cover at least 4 tourist destinations per day, maximizing
            customer experience and value.
          </div>
          <div className="hero">
            To ensure 100% customer satisfaction, providing services worth the
            payment made.
          </div>
          <div className="hero">
            To actively promote tourism and advertise the city, highlighting its
            culture, heritage, and attractions.
          </div>
          <div className="hero">
            To maintain professional standards through transparent policies,
            safety compliance, and efficient trip management.
          </div>
          <div className="hero">
            To provide flexible packages based on customer needs while ensuring
            operational feasibility and quality delivery.
          </div>
        </p>
        <h1 className="vision-and-mission">Mission</h1>
      </div>

      <div className="grid">
        {teamMembers.length === 0 ? (
          <p>Not available</p>
        ) : (
          teamMembers.map((team) => (
            <div className="card" key={team.id}>
              <img src={team.photo} alt="image" />
              <p>{team.intro}</p>
            </div>
          ))
        )}
      </div>

      <h3>Why Choose Us?</h3>
      <ul>
        <li>✔ Local Expertise</li>
        <li>✔ Affordable Packages</li>
        <li>✔ Safe & Reliable Tours</li>
      </ul>
    </div>
  );
}
