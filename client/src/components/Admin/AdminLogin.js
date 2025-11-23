import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('nilgiritransport@gmail.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError('Email and password are required');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/admin/login', {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      const { token, email: returnedEmail } = response.data || {};

      if (!token || !returnedEmail) {
        throw new Error('Invalid response from server');
      }

      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminEmail', returnedEmail);

      navigate('/admin/dashboard');
    } catch (err) {
      if (err?.response?.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Unable to sign in right now. Try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-wrapper">
        <div className="login-logo">
          <img
            src="https://nilgiricollege.ac.in/images/logo-ncas-auto.png"
            alt="Nilgiri College Logo"
          />
        </div>

        <div className="login-box">
          <div className="login-header">
            <h1>Admin Login</h1>
            <p>Nilgiri College Transport Office</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
