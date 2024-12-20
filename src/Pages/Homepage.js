import React from 'react';
import { useUser } from '../context/UserContext';
// import './Homepage.css';

const Homepage = () => {
  const { user } = useUser();

  return (
    <div className="homepage">
      {user && (
        <div className="welcome-message">
          <h2>Welcome, {user.name}! 👋</h2>
        </div>
      )}
      {/* Rest of your homepage content */}
    </div>
  );
};

export default Homepage;