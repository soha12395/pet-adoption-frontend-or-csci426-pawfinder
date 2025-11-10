import React from 'react'
import {Link, useLocation} from 'react-router-dom';
import { Heart } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Heart className="navbar-logo-icon" />
        <span className="navbar-logo-text">Paws of Beirut</span>
      </div>
      
      <div className="navbar-center">
        <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
        <Link to="/browsepets" className={`navbar-link ${location.pathname === '/menu' ? 'active' : ''}`}>Browse Pets</Link>
        <Link to="/about" className={`navbar-link ${location.pathname === '/about' ? 'active' : ''}`}>About Us</Link>
        <Link to="/contact" className={`navbar-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
      </div>
      
      <div className="navbar-right">
        <Link to="/login" className="login-button">Login</Link>
      </div>
    </nav>
  )
}

export default Navbar

