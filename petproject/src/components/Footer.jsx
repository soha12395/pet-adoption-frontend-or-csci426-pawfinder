import { Link } from "react-router-dom";
import { Heart, Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-columns">
          <div className="footer-column">
            <div className="footer-logo">
              <Heart className="heart-icon" />
              <span className="logo-text">PawsofBeirut</span>
            </div>
            <p className="footer-tagline">
              Connecting loving families with pets in need of forever homes.
            </p>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">About Us</Link>
              </li>
              <li>
                <Link to="/menu" className="footer-link">Browse Pets</Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact-list">
              <li>
                <Phone className="contact-icon" />
                <span>(+961) 03458833</span>
              </li>
              <li>
                <Mail className="contact-icon" />
                <span>info@pawsofbeirut.com</span>
              </li>
              <li>
                <MapPin className="contact-icon" />
                <span> Verdun Street,Beirut,Lebanon</span>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Follow Us</h4>
            <div className="social-icons">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Facebook"
                data-testid="link-facebook"
              >
                <Facebook />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Instagram"
                data-testid="link-instagram"
              >
                <Instagram />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Twitter"
                data-testid="link-twitter"
              >
                <Twitter />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 PawsHaven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

