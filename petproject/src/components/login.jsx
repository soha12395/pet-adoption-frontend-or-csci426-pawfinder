import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", values, { withCredentials: true })
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/browsepets");
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
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

          <button type="submit">Login</button>
        </form>

        <p className="signup-text">
          Don’t have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
