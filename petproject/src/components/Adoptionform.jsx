import React, { useState, useEffect } from "react";
import "../styles/Adoptionform.css";

const Adoptionform= () => {
  const [reason, setReason] = useState("");
  const [address, setAddress] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  useEffect(() => {
    
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");

    if (storedName && storedEmail) {
      setUserInfo({ name: storedName, email: storedEmail });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adoption Application Submitted:", {
      name: userInfo.name,
      email: userInfo.email,
      reason,
      address,
    });
    alert("Your adoption application has been submitted! 🐶");
  };

  return (
    <div className="adoption-container">
      <div className="adoption-card">
        <h2>Adoption Application</h2>
        <form onSubmit={handleSubmit}>
          <p><strong>Logged in as:</strong> {userInfo.name} ({userInfo.email})</p>

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
