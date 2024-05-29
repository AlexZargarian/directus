import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome</h1>
      <div className="options">
        <Link to="/products-and-services" className="option">
          Products and Services
        </Link>
        <Link to="/classes" className="option">
          Classes
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
