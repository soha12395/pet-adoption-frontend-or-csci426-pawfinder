import React, { useState } from "react";
import "../styles/Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log(values);

    axios
      .post("http://localhost:5000/signup", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/login");
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>
        <h3>Please fill in this form to create an account</h3>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
