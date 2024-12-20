import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setSuccessMessage } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (name === '' || email === '' || password === '' || confirmPassword === '') {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        name,
        email,
        password
      });

      if (response.status === 201) {
        setSuccessMessage('Registration successful! Please login to continue.');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Wait 2 seconds before redirecting
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during registration');
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-content">
          <div className="signup-header">
            <h2>Sign Up</h2>
            <p>Create your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                required
              />
            </div>
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
            <div className="input-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
                required
              />
            </div>
            
            {error && <p className="error">{error}</p>}
            
            <button type="submit" className="button">Sign Up</button>
          </form>
          
          <div className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;