export default function Contact() {
  return (
    <div className="container">
      <h1>Contact Us</h1>

      <p>📞 Phone: +91 93844 70778</p>
      <p>📧 Email: jourflys@gmail.com</p>

      <a href="tel:+919384470778" className="btn">
        Call Now
      </a>
      <a
        href="https://wa.me/919384470778"
        target="_blank"
        className="btn green"
      >
        WhatsApp
      </a>
    </div>
  );
}
