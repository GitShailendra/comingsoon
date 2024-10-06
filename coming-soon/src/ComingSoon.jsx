// src/ComingSoon.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from '../public/Artboard_1-1.png';
import coder from '../public/coder.png'
const ComingSoon = () => {
  const [progress, setProgress] = useState(70); // Set progress value here
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);
  const [isError, setIsError] = useState(false); // Track if it's an error message

  // Handle email submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null); // Reset the status message
    setIsError(false); // Reset error state

    try {
      const res = await axios.post('http://localhost:5000/api/subscribe', { email });
      setStatusMessage(res.data.message);
      setEmail(''); // Clear email field after successful submission
    } catch (err) {
      setStatusMessage(err.response?.data?.message || 'Something went wrong');
      setIsError(true); // Set error state to true if it's an error message
    }
  };

  return (
    <div className="main-div">
      
      <div className="nav">
        <img className='logo' src={logo} alt="" />
        <ul>
          <li>
            <a href=""><i class="fa-brands fa-linkedin"></i></a>
          </li>
          <li>
            <a href=""><i class="fa-brands fa-instagram"></i></a>
          </li>
          <li>
            <a href=""><i class="fa-brands fa-x-twitter"></i></a>
          </li>
         
        </ul>
      </div>

      
      <div className="svg">
        <img src={coder} alt="" />
      </div>

      <div className="center">
        <h1 className="msg">Coders At Work!</h1>
        <h3>-Coming Soon-</h3>
      </div>

     

      {/* Sign-up Form */}
      <div className="form">
        <p>sign up for early access</p>
        <form onSubmit={handleSubmit} className="">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=""
            placeholder="Enter your email"
            required
          />
          <button className="">Notify Me</button>
        </form>
      </div>

      {/* Display status message */}
      {statusMessage && (
        <div style={{color:`${isError?"red":"#green"}`}} className="err-msg">
          <p>{statusMessage}</p>
        </div>
      )}

      
    </div>
  );
};

export default ComingSoon;
