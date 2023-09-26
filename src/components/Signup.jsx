
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './../style/signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
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
  const validateUserExists = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username === formData.username) {
      alert('User with this username already exists.');
    } else {
      localStorage.setItem('user', JSON.stringify(formData));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the password
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError('Password must be at least 8 characters with at least 1 alphabet and 1 special symbol.');
      return;
    }

    // Password is valid, clear any previous error
    setPasswordError('');
    validateUserExists();
    navigate("/login");

    
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
            style={{width:'95%'}}
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
          <div id='toggle-visibility'>
            <label htmlFor="toggle-visibility">showPassword</label>
          <input
              type="checkbox"
              onClick={handleTogglePassword}
              className="toggle-password-button"
              name="toggle-visibility"
            />
            </div>
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
