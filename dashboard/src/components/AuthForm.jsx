import React, { useState } from 'react';
import axios from 'axios'; // Import Axios if you installed it
import "../components/style.css"
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ setIsAuthenticated }) => {
  const [mode, setMode] = useState('sign-up');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    let userData = { username, email, password };
    console.log('Sending userData:', userData);

    try {
      let response;
      if (mode === 'sign-up') {
        response = await axios.post('http://localhost:5500/signup', userData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else if (mode === 'sign-in') {
        response = await axios.post('http://localhost:5500/signin', { email, password }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else if (mode === 'reset-password') {
        response = await axios.post('http://localhost:5500/reset-password', {
          email: userData.email,
          newPassword: userData.password,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      const data = response.data;

      if (response.status === 200 || response.status === 201) {
        if (mode === 'sign-up') {
          alert('Signup successful! You can now sign in.');
          setMode('sign-in'); // Switch to sign-in mode after signup
        } else if (mode === 'sign-in') {
          alert('Signin successful! Welcome back.');
          setIsAuthenticated(true); // Update the authentication state
          navigate('/budget'); // Redirect to the budget page
        } else if (mode === 'reset-password') {
          alert('Password reset successful! You can now sign in with your new password.');
          setMode('sign-in'); // Switch to sign-in mode after password reset
        }
      } else {
        throw new Error(data.error || 'Request failed: Server error');
      }
    } catch (error) {
      console.error('Request failed:', error.message);
      alert('Request failed: ' + error.message);
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };


  return (
    <div className="form-container">
    <div className="sign-up form">
      <h2 id="title">{mode === 'reset-password' ? 'Reset Password' : mode}</h2>
      <form onSubmit={handleSubmit} id="authForm">
        {mode !== 'reset-password' && (
          <div className="input-field" style={{ maxHeight: mode === 'sign-in' ? '0' : '60px' }}>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={mode === 'sign-up'}
            />
          </div>
        )}
        <div className="input-field" style={{ maxHeight: '60px' }}>
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-field" style={{ maxHeight: '60px' }}>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" id="submitButton">
          {mode === 'reset-password' ? 'Reset Password' : mode === 'sign-up' ? 'Sign Up' : 'Sign In'}
        </button>
        {mode !== 'reset-password' && (
          <p>
            <a href="#" onClick={() => handleModeChange('reset-password')} id="resetPasswordLink">
              Lost password? Click here
            </a>
          </p>
        )}
        <div className="reg-button">
          <button
            type="button"
            id="sign-upbtn"
            className={mode === 'sign-up' ? 'active' : ''}
            onClick={() => handleModeChange('sign-up')}
          >
            Sign Up
          </button>
          <button
            type="button"
            id="sign-inbtn"
            className={mode === 'sign-in' ? 'active' : ''}
            onClick={() => handleModeChange('sign-in')}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AuthForm;

