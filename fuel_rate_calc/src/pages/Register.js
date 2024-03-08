import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, Link } from "react-router-dom";
import "../FuelQuoteForm.css";
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '', // Confirm password
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      //setErrors({ ...errors, password2: "Passwords do not match." });
      toast.error("Passwords do not match.");
      return;
    }

    try {
      // Replace URL with your actual registration endpoint
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          password2: formData.password2,
        }),
      });

      if (response.ok) {
        toast.success("Registration successful!");
        setTimeout(() => navigate('/login'), 2000); // Redirect after showing success message
      } else {
        const errorData = await response.json();
        // Handle errors from backend
        if (errorData.errors) {
          Object.keys(errorData.errors).forEach((key) => {
            const message = errorData.errors[key].join(' '); // Join messages if array
            toast.error(`${message}`); //`${key}: ${message}`
          });
        } else {
          // Fallback error message
          toast.error("An error occurred during registration. Please try again.");
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error("An error occurred during registration. Please try again.");
    }
  };


  return (
      <div className="form-container">
        {/*<ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />*/}
        <ToastContainer />      
      <div className="title">
        <h2>Register</h2>
      </div>
        <form className="fuel-quote-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" 
            name="username" 
            className="retrieve-address" 
            placeholder="Enter username" 
            value={formData.username}
            onChange={handleChange}
            required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              className="retrieve-address"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
        <label>Confirm Password:</label>
        <input
          type="password"
          name="password2"
          className="retrieve-address"
          placeholder="Confirm password"
          value={formData.password2}
          onChange={handleChange}
          required
        />
        {errors.password2 && <p style={{ color: 'red' }}>{errors.password2}</p>}
      </div>
          <button type="submit">Register</button>
          <div className="button-container">
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button type="button" className="button-back_to_login">
                Back to Login
              </button>
            </Link>
          </div>
        </form>
      </div>
  );
};

export default Register;
