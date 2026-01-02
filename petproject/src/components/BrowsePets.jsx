import React, { useState, useEffect } from "react";
import "../styles/BrowsePets.css";
import PetDetails from "./PetDetails.jsx";
import axios from "axios";

const BrowsePets = () => {
  const [speciesFilter, setSpeciesFilter] = useState("All");
  const [sizeFilter, setSizeFilter] = useState("All");
  const [selectedPet, setSelectedPet] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/pets")
      .then((res) => {
        setPets(res.data);
        console.log("Pets data:", res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleDetails(pet) {
    setSelectedPet(pet);
    sessionStorage.setItem("selectedPet", JSON.stringify(pet));
  }

  if (selectedPet) {
    return <PetDetails pet={selectedPet} onBack={() => setSelectedPet(null)} />;
  }

  const filteredPets = pets.filter(
    (p) =>
      (speciesFilter === "All" || p.species === speciesFilter) &&
      (sizeFilter === "All" || p.size === sizeFilter) &&
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="browse-container">
      <h1>Available Pets</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filters">
        <div className="filter-group">
          <strong>Species:</strong>
          {["All", "Dog", "Cat"].map((s) => (
            <label key={s}>
              <input
                type="radio"
                name="species"
                checked={speciesFilter === s}
                onChange={() => setSpeciesFilter(s)}
              />{" "}
              {s}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <strong>Size:</strong>
          {["All", "Small", "Medium", "Large"].map((s) => (
            <label key={s}>
              <input
                type="radio"
                name="size"
                checked={sizeFilter === s}
                onChange={() => setSizeFilter(s)}
              />{" "}
              {s}
            </label>
          ))}
        </div>
      </div>

      <div className="pets-grid">
        {filteredPets.map((pet) => (
          <div key={pet.id} className="pet-card">
            <div className="pet-image-container">
              <img
                src={`/pictures/${pet.image}`}
                alt={pet.name}
                className="pet-image"
              />
              <span
                className={`adoption-badge ${
                  pet.available ? "available" : "unavailable"
                }`}
              >
                {pet.available ? "Available" : "Adopted"}
              </span>
            </div>
            <div className="pet-info">
              <h3>{pet.name}</h3>
              <p>
                {pet.species} • {pet.age} • {pet.gender}
              </p>
              <p className="description">{pet.description}</p>
              <div className="adoption">
                <span className="fee">Adoption Fee ${pet.fee}</span>

                <button className="view-btn" onClick={() => handleDetails(pet)}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BrowsePets;
