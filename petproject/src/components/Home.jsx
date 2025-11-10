import React from 'react'
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import '../styles/Home.css';
import familyImage from '../assets/family-image.png';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero" style={{ backgroundImage: `url(${familyImage})` }}>
        
        <div className="home-hero-content">
          <h1 className="home-hero-title">
            <span>Find Your Perfect</span>
            <span>Companion</span>
          </h1>
          <p className="home-hero-tagline">
            Every pet deserves a loving home. Start your adoption journey today and change a life forever.
          </p>
          <div className="home-hero-buttons">
            <Link to="/browsepets" className="home-button-primary">
              <Search className="button-icon" />
              Browse Pets
            </Link>
            <Link to="/about" className="home-button-secondary">
              How It Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
