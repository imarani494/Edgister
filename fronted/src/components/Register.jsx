import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';  

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'email') setEmailError('');
    if (e.target.name === 'password') setPasswordError('');
  };

  
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    return emailPattern.test(email);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setEmailError('');
    setPasswordError('');

    if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address (@gmail.com or @yahoo.com).');
      setLoading(false);
      return;
    }

    
    try {
      const res = await axios.post('http://localhost:8000/auth/register', formData);

  
      if (res.status === 200) {
        setSuccess('Registration successful!');
        setFormData({ fullName: '', email: '', password: '' });  
        setTimeout(() => {
          navigate('/login');  
        }, 2000);
      }
    } catch (err) {
     
      console.error("Registration error:", err);
      if (err.response) {
       
        setError(`Registration failed: ${err.response.data.message || 'Please try again.'}`);
      } else if (err.request) {
        
        setError('No response from server. Please ensure the server is running.');
      } else {
        
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 className="form-title">Register</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
        className="input-field"
      />

      
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="input-field"
      />
      {emailError && <p className="error-container">{emailError}</p>}


      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="input-field"
      />
      {passwordError && <p className="error-container">{passwordError}</p>}

     
      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? <div className="spinner"></div> : 'Register'}
      </button>
    </form>
  );
};

export default Register;
