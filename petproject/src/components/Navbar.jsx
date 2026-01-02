import React, {useState} from 'react'
import {Link, useLocation} from 'react-router-dom';
import { Heart } from 'lucide-react';
import '../styles/Navbar.css';
import { FaBars } from "react-icons/fa"; 
import { ImCross } from "react-icons/im"; 

const Navbar = () => {
  const location = useLocation();
  const [mobile,setMobile]=useState(false)
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Heart className="navbar-logo-icon" />
        <span className="navbar-logo-text">Paws of Beirut</span>
      </div>
      <div className='appbar'> 
      <div className={mobile ? "navbar-center-mobile" : "navbar-center"} onClick={()=>setMobile(false)}>
        <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
        <Link to="/browsepets" className={`navbar-link ${location.pathname === '/menu' ? 'active' : ''}`}>Browse Pets</Link>
        <Link to="/about" className={`navbar-link ${location.pathname === '/about' ? 'active' : ''}`}>About Us</Link>
        <Link to="/contact" className={`navbar-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
      </div>
      
      <div className={mobile ? "navbar-right-mobile" : "navbar-right"} onClick={()=>setMobile(false)}>
        <Link to="/login" className="login-button" >Login</Link>
      </div>
      </div>
      <div>
        <button className='mobile-bar' onClick={()=>setMobile(!mobile)}> 
        {mobile? <ImCross/> :<FaBars/> }
          </button>
      </div>
    </nav>
  )
}

export default Navbar

