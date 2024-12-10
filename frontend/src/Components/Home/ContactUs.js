import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">
          We’d love to hear from you! Feel free to reach out to us using the form below or visit us at our library.
        </p>

        <div className="contact-info-form">
          <div className="contact-info">
            <h2>📍 Visit Us</h2>
            <p>VidhyaSthali Library,</p>
            <p>[Address]</p>
            <p>[City, ZIP Code]</p>

            <h2>📞 Call Us</h2>
            <p>Phone: +91 123-456-7890</p>

            <h2>📧 Email Us</h2>
            <p>Email: contact@vidhyasthali.com</p>
          </div>

          <div className="contact-form">
            <form>
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
              <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
