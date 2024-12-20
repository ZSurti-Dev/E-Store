import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Homepage from './Pages/Homepage';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Header from './components/Header/Header';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className='App'>
          <Header /> {/* Add this line */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}



export default App;
