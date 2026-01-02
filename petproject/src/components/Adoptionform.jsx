import React, { useState, useEffect } from "react";
import "../styles/Adoptionform.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Adoptionform = () => {
  const [reason, setReason] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [pet, setPet] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPet = sessionStorage.getItem("selectedPet");
    if (!storedPet) {
      alert("No pet selected!");
      navigate("/browsepets");
    } else {
      setPet(JSON.parse(storedPet));
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth", { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          setEmail(res.data.email);
          setName(res.data.name);
        } else {
          navigate("/login");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  if (loading || !pet) return <p>Loading...</p>;

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      pet_id: pet.id,
      user_name: name,
      user_email: email,
      address,
      reason,
    };
    axios
      .post("http://localhost:5000/adopt", data)
      .then((res) => {
        if (res.data.Status === "Success") {
          alert(res.data.Message);
          navigate("/browsepets");
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className="adoption-container">
      <div className="adoption-card">
        <h2>Adoption Application</h2>

        <form onSubmit={handleSubmit}>
          <p>
            <strong>Logged in as:</strong> {name}
          </p>

          <label>Address</label>
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <label>Why do you want to adopt?</label>
          <textarea
            placeholder="Tell us why you’d love to adopt 🐱 this pet"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />

          <button type="submit">Submit Application</button>
        </form>
      </div>
    </div>
  );
};

export default Adoptionform;
