// Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const[showPassword,setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the password
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError(
        'Password must be at least 8 characters with at least 1 alphabet and 1 special symbol.'
      );
      return;
    }

    // Password is valid, clear any previous error
    setPasswordError('');

    // Retrieve existing users from local storage or initialize as an empty array
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the user already exists by username
    const userExists = existingUsers.some((user) => user.username === formData.username);

    if (userExists) {
      alert('User with this username already exists.');
    } else {
      // Add the new user to the array of existing users
      const updatedUsers = [...existingUsers, formData];

      // Store the updated users array in local storage
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Clear input fields
      setFormData({
        username: '',
        password: '',
      });

      // Redirect to the login page
      navigate('/login');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username <span className="asterisk">*</span></label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            required
            onChange={handleChange}
            
          />
        </div>
        <div>
          <label htmlFor="password">Password <span className="asterisk">*</span></label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            required
            onChange={handleChange}
          />
        </div>
        <div id="toggle-visibility">
          <label htmlFor="toggle-visibility">Show Password</label>
          <input
            type="checkbox"
            onClick={handleTogglePassword}
            className="toggle-password-button"
            name="toggle-visibility"
          />
        </div>
        {passwordError && <p className="error-message">{passwordError}</p>}
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <div className="signup-links">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
