import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/admin/login', { email, password });
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminEmail', response.data.email);
      navigate('/admin/dashboard');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-logo-header">
        <img src="https://nilgiricollege.ac.in/images/logo-ncas-auto.png" alt="Nilgiri College Logo" />
        <span>Transport Office</span>
      </div>
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <div className="admin-icon">🔐</div>
            <h1>Admin Portal</h1>
            <p className="subtitle">Nilgiri College Transport Office</p>
          </div>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
            <button type="submit" className="login-button">
              <span>Sign In</span>
              <span className="arrow">→</span>
            </button>
          </form>
          <div className="login-footer">
            <p>🔒 Secure Admin Access Only</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

