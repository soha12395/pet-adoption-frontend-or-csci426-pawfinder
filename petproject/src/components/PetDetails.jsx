import React from "react";
import "../styles/PetDetails.css";
import { Link } from "react-router-dom";

const PetDetails = ({ pet, onBack }) => {
  if (!pet) return <p>Pet not found.</p>;

  return (
    <div className="pet-details-container">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <div className="pet-details-card">
        <div className="pet-image-section">
          <img
            src={`/pictures/${pet.image}`}
            alt={pet.name}
            className="pet-large-image"
          />
          <span
            className={`adoption-badge ${
              pet.available ? "available" : "unavailable"
            }`}
          >
            {pet.available ? "Available" : "Adopted"}
          </span>
        </div>

        <div className="pet-info-section">
          <h1>{pet.name}</h1>
          <h3>{pet.species === "Dog" ? "Golden Retriever" : pet.species}</h3>
          <p>{pet.description}</p>

          <div className="pet-stats">
            <div>
              <strong>Age:</strong> {pet.age}
            </div>
            <div>
              <strong>Size:</strong> {pet.size}
            </div>
            <div>
              <strong>Color:</strong> {pet.color || "Golden"}
            </div>
            <div>
              <strong>Gender:</strong> {pet.gender}
            </div>
          </div>

          {Array.isArray(pet.traits) && pet.traits.length > 0 && (
            <div className="pet-traits">
              <strong>Personality Traits:</strong>
              <div>
                {pet.traits.map((trait, index) => (
                  <span key={index} className="trait-badge">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="medical-info">
            <strong>Medical Information:</strong>
            <p>Up to date on all vaccinations, neutered, microchipped</p>
          </div>

          <div className="adoption-section">
            <span className="adoption-fee">Adoption Fee ${pet.fee}</span>
            <Link to="/Adoptionform">
              <button className="adopt-btn">Start Adoption Process</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
