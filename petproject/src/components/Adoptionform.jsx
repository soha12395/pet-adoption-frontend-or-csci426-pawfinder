
import React, { useState, useEffect } from "react";
import "../styles/Adoptionform.css";
import { useNavigate } from "react-router-dom";

const Adoptionform = () => {
  const [reason, setReason] = useState("");
  const [address, setAddress] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  const navigate = useNavigate();
useEffect(() => {
  const storedName = sessionStorage.getItem("userName");
  const storedEmail = sessionStorage.getItem("userEmail");

  if (!storedName || !storedEmail) {
    alert("You must be logged in to access the adoption form.");
    navigate("/login");
    return;
  }

  setUserInfo({ name: storedName, email: storedEmail });
}, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Your adoption application has been submitted! 🐶");

    console.log("Adoption Application Submitted:", {
      name: userInfo.name,
      email: userInfo.email,
      reason,
      address,
    });
  };

  return (
    <div className="adoption-container">
      <div className="adoption-card">
        <h2>Adoption Application</h2>

        <form onSubmit={handleSubmit}>
          <p>
            <strong>Logged in as:</strong> {userInfo.name} ({userInfo.email})
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
