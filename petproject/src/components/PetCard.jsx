     
const PetCard = ({ pet }) => {
  
  return (
    <div className="pet-card" >
      <img src={pet.image} alt={pet.name}  />
      <div>
        <h3>{pet.name}</h3>
        <p> {pet.species} • {pet.age} • {pet.gender}</p>
        <p>{pet.description}</p>
        <div >  ${pet.price} (Adoption Fee)
        </div>
        <button className="adopt-button" >
          View Details
        </button>
      </div>
    </div>
  );
};
export default PetCard;