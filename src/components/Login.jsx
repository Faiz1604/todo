import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './../style/signup.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

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

    // Simulate user authentication (replace with actual authentication logic)
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      if (storedUser.username === formData.username && storedUser.password === formData.password) {
        // Successful login, navigate to the /todo page
        localStorage.setItem("loggedUser",JSON.stringify(formData.username))
        navigate(`/todo/${formData.username}`);
      } else {
        setPasswordError('Invalid username or password');
      }
    } else {
      setPasswordError('User not found');
    }
  };
  useEffect(()=>{
    setTimeout(()=>{
      setPasswordError('');
    },3000)
  },[]);
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
        </div>
        <div id='toggle-visibility'>
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
