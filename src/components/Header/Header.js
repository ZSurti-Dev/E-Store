import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <div className = "logo">
                <Link to = '/' >
                    <img src = "/Flipkart logo.png" alt = "Logo" />
                </Link>
            </div>
            <div className='search-bar'>
                <input type="text" placeholder="Search for products, brands and more" />
                <button>Search</button>
            </div>
            <div className='header-actions'>
                <Link to="/login" className="login-btn">Login</Link>
                <Link to="/signup" className="signup-btn">Signup</Link>
            </div>
        </div>
    );
};

export default Header;


