import React, { useState } from "react";
import "../styles/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });
;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks ${formData.firstName}! Your message has been sent.`);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1 className="contact-title">Get in touch</h1>
          <p className="contact-subtitle">
            Our team is happy to answer your adoption questions. Fill out the
            form and we’ll be in touch as soon as possible.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Form  */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="John"
                />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+961 76 123 456"
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Type your message here..."
                rows="5"
              ></textarea>
            </div>

            <button type="submit" className="submit-button centered-button">
              Send Message
            </button>
          </form>

              {/* Contact Info */}
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div>
                <h4 className="info-title">Our Location</h4>
                <p className="info-text">Verdun Street,Beirut,Lebanon</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📞</div>
              <div>
                <h4 className="info-title">Phone</h4>
                <p className="info-text">(+961) 03458833</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">✉️</div>
              <div>
                <h4 className="info-title">Email</h4>
                <p className="info-text">info@pawsofbeirut.com</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">⏰</div>
              <div>
                <h4 className="info-title">Hours</h4>
                <p className="info-text">Monday - Friday: 9am - 6pm</p>
                <p className="info-text">Saturday: 10am - 4pm</p>
                <p className="info-text">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
