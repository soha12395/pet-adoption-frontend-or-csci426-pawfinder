import React, { useState } from "react";
import "../styles/Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // هون ممكن تعمل check للـ credentials
    console.log("Email:", email, "Password:", password);
    onLogin(); // استدعاء function للانتقال بعد login
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
        <p className="signup-text">
          Don't have an account? <a href="#">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
