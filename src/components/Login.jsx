import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../style/signup.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
  
    // Retrieve user data from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  
    // Find the user with the provided username
    const user = storedUsers.find((u) => u.username === formData.username);
  
    if (user) {
      // Check if the password matches
      if (user.password === formData.password) {
        // Successful login
        localStorage.setItem('loggedUser', user.username);
        navigate(`/todo/${user.username}`); // Redirect to the user's dashboard
      } else {
        setPasswordError('Invalid password'); // Password does not match
      }
    } else {
      setPasswordError('User not found'); // User with the provided username does not exist
    }
  };
  

  useEffect(() => {
    // Clear the login error message after 3 seconds
    const timer = setTimeout(() => {
      setPasswordError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </div>
      </form>
      <div className="login-links">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
