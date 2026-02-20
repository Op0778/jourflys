import { useState } from "react";
import BookForm from "./BookForm";

export default function Contact() {
  const [showNumber, setShowNumber] = useState(false);

  return (
    <div className="container-form">
      <h1>Contact Us</h1>

      {!showNumber ? (
        <button className="btn" onClick={() => setShowNumber(true)}>
          Show Phone Number
        </button>
      ) : (
        <p>📞 +91 93844 70778</p>
      )}

      <a
        href="https://wa.me/919384470778"
        target="_blank"
        rel="noopener noreferrer"
        className="btn green"
      >
        WhatsApp
      </a>
      <BookForm />
    </div>
  );
}
