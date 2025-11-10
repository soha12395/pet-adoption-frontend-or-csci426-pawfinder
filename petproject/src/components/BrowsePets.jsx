import React, {useState}from 'react'
import { Search } from 'lucide-react';
import max from '../assets/Max.png';
import luna from '../assets/Luna.png';
import leo from '../assets/Leo.png';
import rocky from '../assets/Rocky.png';
import charlie from'../assets/Charlie.png';
import bella from '../assets/Bella.png';
import PetCard from './PetCard';
import '../styles/BrowsePets.css';
const BrowsePets = () => {

     const [searchTerm, setSearchTerm] = useState('');
     const speciesFilters = ['All', 'Dog', 'Cat'];
     const [activeSpecies, setActiveSpecies] = useState('All');
      const sizeFilters = ['Small', 'Medium', 'Large'];
     const [activeSize, setActiveSize] = useState('');
     const pets_data = [
        {
          id: 1,
          name: 'Max',
          species: 'Dog',
          age: '3 years',
          gender: 'Male',
          price: 200,
          description: 'A friendly and energetic Golden Retriever mix who loves to play fetch and cuddle.',
          image: max
        },
        {
          id: 2,
          name: 'Luna',
          species: 'Cat',
          age: '2 years',
          gender: 'Female',
          price: 150,
          description: 'A playful and curious orange tabby cat. Gets along well with children and other pets.',
          image: luna
        },
        {
          id: 3,
          name: 'Rocky',
          species: 'Dog',
          age: '4 years',
          gender: 'Female',
          price: 300,
          description:'A majestic Siberian Husky, very loyal and needs a home with a yard for exercise.',
          image: rocky
        },
         {
          id: 4,
          name: 'Leo',
          species: 'Cat',
          age: '8 months',
          gender: 'Male',
          price: 105,
          description: 'A brave and friendly Siamese mix. Very vocal and loves interactive toys.',
          image: leo
        },
         {
          id: 5,
          name: 'Charlie',
          species: 'Dog',
          age: '2 months',
          gender: 'Male',
          price:  250,
          description:'A calm and well-behaved Labrador. Perfect for first-time dog owners.',
          image: charlie
        },
        
         {
          id: 6,
          name: 'Bella',
          species: 'Cat',
          age: '6 months',
          gender: 'Female',
          price: 125,
          description: 'A sweet and shy Calico kitten. Loves quiet spaces and gentle petting.',
          image: bella
        },
        


      ]

 









  return (
    <div className="browse-pets">
      {/* Hero Section */}
      <section className="browsepets-hero">
        <div className="browsepets-hero-content">
          <h1 className="browsepets-hero-title">Available Pets</h1>
          <p className="browsepets-hero-tagline">
             Browse our wonderful pets looking for their forever homes.
          </p>
        </div>
      </section>
     

      {/* Filters Section */}
      <div className="filters-panel" >
        <div>
          <h3>Filters</h3>
          
          <div className="search-bar">
            <Search/>
            <input 
              type="text"
              placeholder="Search by name, breed"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
             
            />
          </div>
        </div>
          <div>
            <div className="species-filters">
          <span>Species:</span>
          {speciesFilters.map((species) => (
            <button
              key={species}
              
              onClick={() => setActiveSpecies(species)}
            >
              {species}
            </button>
          ))}
        </div>
        <div>
        <div className="size-filters">
          <span>Size:</span>
          {sizeFilters.map((size) => (
          <label key={size} className="size-option">
            <input
                 type="radio"
                 name="size"
                   value={size}
                  checked={activeSize === size}
                 onChange={() => setActiveSize(size)}
             />
             {size}
          </label>
          ))}
          </div>
      </div>
            {/* Available Pets Section */}
          <h2 >Available Pets</h2>
          <div className="pet-grid">
              {pets_data.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
          </div>
       </div>
       </div>
      
  
  
   
  );
}

export default BrowsePets