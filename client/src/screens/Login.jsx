import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Add authentication logic here
    alert(`Logged in with ${email}`);
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center bg-success bg-opacity-10"
      style={{ minHeight: "100vh" }}
    >
      <div className="col-md-6">
        <div className="card shadow-lg">
          <div className="card-header bg-success text-white text-center">
            <h3>Login to GreenNest</h3>
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
