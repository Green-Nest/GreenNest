import React, { useState } from "react";
import { BiColor } from "react-icons/bi";
import { GiWhiteBook } from "react-icons/gi";
import { Link, Navigate, useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const admEmail = "admin@test.com"
  const admPass = "admin"
  const handleLogin = (e) => {
    e.preventDefault();
    if(email == admEmail &&  password == admPass)
      navigate('/adminPage')
    else
      navigate('/productsPage')
    alert(`Logged in with ${email}`);
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center bg-success bg-opacity-10"
      style={{ minHeight: "100vh" }}
    >
      <div className="col-md-6">
        <div className="card shadow-lg">
          <div className="card-header bg-success text-red text-center">
            <h2>Login to GreenNest</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-success">
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="card-footer text-center">
            <small>
              Don't have an account? <Link to="/register">Register</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
