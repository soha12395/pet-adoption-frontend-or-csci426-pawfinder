import React, { useState } from "react";
import max from "../assets/Max.png";
import luna from "../assets/Luna.png";
import leo from "../assets/Leo.png";
import rocky from "../assets/Rocky.jpg";
import charlie from "../assets/Charlie.jpg";
import bella from "../assets/Bella.jpg";
import snowball from "../assets/snowball.png";
import shadow from "../assets/shadow.png";
import "../styles/BrowsePets.css";
import PetDetails from "./PetDetails.jsx";

const petsData = [
  {
    id: 1,
    name: "Max",
    species: "Dog",
    size: "Large",
    age: "3y",
    gender: "Male",
    fee: 200,
    description: "A friendly and energetic Golden Retriever.",
    image: max,
  },
  {
    id: 2,
    name: "Luna",
    species: "Cat",
    size: "Small",
    age: "2y",
    gender: "Female",
    fee: 150,
    description: "A playful and curious orange tabby.",
    traits: ["Gentle", "Affectionate", "Calm"],
    image: luna,
  },
  {
    id: 3,
    name: "Rocky",
    species: "Dog",
    size: "Large",
    age: "4y",
    gender: "Male",
    fee: 250,
    description: "A majestic Siberian Husky, very loyal.",
    traits: ["Playful", "Energetic", "Smart"],
    image: rocky,
  },
  {
    id: 4,
    name: "Leo",
    species: "Cat",
    size: "Medium",
    age: "8m",
    gender: "Male",
    fee: 105,
    description: "A brave and friendly Siamese mix.",
    traits: ["Friendly", "Vocal", "Curious"],
    image: leo,
  },
  {
    id: 5,
    name: "Charlie",
    species: "Dog",
    size: "Small",
    age: "2m",
    gender: "Male",
    fee: 175,
    description: "A calm and well-behaved Labrador.",
    traits: ["Calm", "Gentle", "Well-trained"],
    image: charlie,
  },

  {
    id: 6,
    name: "Bella",
    species: "Cat",
    size: "Small",
    age: "6m",
    gender: "Female",
    fee: 125,
    description: "A sweet and shy Calico kitten.",
    traits: ["Curious", "Playful", "Sweet"],
    image: bella,
  },
  {
  id: 7,
  name: "Shadow",
  species: "Dog",
  size: "Small",
  age: "4m",
  gender: "Male",
  fee: 190,
  description: "A playful and affectionate black Labrador puppy.",
  traits: ["Energetic", "Friendly", "Loyal"],
  image:shadow,
  },


  {
  id: 8,
  name: "Snowball",
  species: "Cat",
  size: "Small",
  age: "1y",
  gender: "Female",
  fee: 300,
  description: "A beautiful white Persian cat with a calm and gentle nature.",
  traits: ["Calm", "Affectionate", "Elegant"],
  image: snowball,
}
];

const BrowsePets = () => {
  const [speciesFilter, setSpeciesFilter] = useState("All");
  const [sizeFilter, setSizeFilter] = useState("All");
  const [selectedPet, setSelectedPet] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


  function handleDetails(pet) {
    setSelectedPet(pet);
  }

  if (selectedPet) {
    return (
      <PetDetails pet={selectedPet} onBack={() => setSelectedPet(null)} />
    );
  }

 const filteredPets = petsData.filter(
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
              <img src={pet.image} alt={pet.name} className="pet-image" />
              <span className="badge">Available</span>
            </div>
            <div className="pet-info">
              <h3>{pet.name}</h3>
              <p>
                {pet.species} • {pet.age} • {pet.gender}
              </p>
              <p className="description">{pet.description}</p>
              <div className="adoption">
                <span className="fee">Adoption Fee ${pet.fee}</span>
                <button
                  className="view-btn"
                  onClick={() => handleDetails(pet)}
                >
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
