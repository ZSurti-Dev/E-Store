import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { successMessage, setSuccessMessage, setUser } = useUser();

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, setSuccessMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });

      if (response.data.user) {
        setUser(response.data.user);
        navigate('/');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="card shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        {successMessage && (
          <div className="alert alert-success m-3 mb-0 py-2" role="alert">
            {successMessage}
          </div>
        )}
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Login</h2>
            <p className="text-muted">Get access to your Orders, Wishlist, and Recommendations</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {error && (
              <div className="alert alert-danger py-2" role="alert">
                {error}
              </div>
            )}
            
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Login
            </button>
            
            <div className="position-relative my-4">
              <hr />
              <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                OR
              </span>
            </div>
            
            <button type="button" className="btn btn-outline-secondary w-100 mb-3">
              Login with Google
            </button>
          </form>
          
          <div className="text-center">
            <p className="mb-0">
              New to Website?{' '}
              <Link to="/signup" className="text-decoration-none">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;