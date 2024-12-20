import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import './Login.css';

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
    <div className="login-page">
      <div className="login-container">
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        <div className="login-content">
          <div className="login-header">
            <h2>Login</h2>
            <p>Get access to your Orders, Wishlist, and Recommendations</p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
              />
            </div>
            
            {error && <p className="error">{error}</p>}
            
            <button type="submit" className="button">Login</button>
            
            <div className="divider">OR</div>
            
            <button type="button" className="google-button">
              Login with Google
            </button>
          </form>
          
          <div className="signup-link">
            New to Website? <Link to="/signup">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;