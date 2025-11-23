import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import './Helpdesk.css';

const Helpdesk = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/helpdesk', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting ticket:', error);
      alert('Failed to submit ticket. Please try again.');
    }
  };

  return (
    <div className="helpdesk-page">
      <Header />
      <section className="helpdesk">
        <h1>Helpdesk Support</h1>
        <p>Have a query or issue related to bus service? Submit your request below and our transport office will get back to you soon.</p>

        {submitted && (
          <div className="success-message">
            Ticket submitted successfully! We'll get back to you soon.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Describe your issue..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Submit Ticket</button>
        </form>

        <div className="info">
          <div className="info-card">
            <h3>Office Hours</h3>
            <p>Mon - Fri: 9:00 AM to 4:00 PM<br />Sat: 9:00 AM to 12:30 PM</p>
          </div>
          <div className="info-card">
            <h3>Contact</h3>
            <p>Email: transport@nilgiri.edu<br />Phone: +91 12345 67890</p>
          </div>
          <div className="info-card">
            <h3>Location</h3>
            <p>Nilgiri College Transport Office,<br />Thaloor, Wayanad, Kerala</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Helpdesk;

