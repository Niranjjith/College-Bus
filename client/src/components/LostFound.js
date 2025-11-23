import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import './LostFound.css';

const LostFound = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: '',
    item: '',
    location: '',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/lost-found');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === '') {
      setShowSuggestions(false);
      return;
    }

    const matches = items
      .filter(item =>
        item.item.toLowerCase().includes(value) ||
        item.location.toLowerCase().includes(value)
      )
      .slice(0, 10)
      .map(item => `${item.item} - ${item.location}`);

    setSuggestions(matches);
    setShowSuggestions(matches.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/lost-found', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', status: '', item: '', location: '', details: '' });
      fetchItems();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    }
  };

  const filteredItems = items.filter(item =>
    searchTerm === '' ||
    item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lost-found-page">
      <Header />
      <section className="container">
        <h1>Lost & Found</h1>
        <p>Search for items lost or found on buses and campus areas, or report a new one below.</p>

        <div className="search-box">
          <input
            type="text"
            id="searchInput"
            placeholder="Search item or location..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => searchTerm && setShowSuggestions(true)}
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        <table id="lostTable">
          <thead>
            <tr>
              <th>Item</th>
              <th>Location</th>
              <th>Date</th>
              <th>Status</th>
              <th>Reported By</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.id}>
                <td><strong style={{ color: '#333' }}>{item.item}</strong></td>
                <td style={{ color: '#555' }}>{item.location}</td>
                <td style={{ color: '#555' }}>{item.date}</td>
                <td>
                  <span className={`status-badge ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
                <td style={{ color: '#555' }}>{item.reportedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {submitted && (
          <div className="success-message">
            Report submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <h2>Report Lost / Found Item</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleFormChange}
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleFormChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
          <input
            type="text"
            name="item"
            placeholder="Item Name"
            value={formData.item}
            onChange={handleFormChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location (Bus or Area)"
            value={formData.location}
            onChange={handleFormChange}
            required
          />
          <textarea
            name="details"
            placeholder="Additional details..."
            value={formData.details}
            onChange={handleFormChange}
          ></textarea>
          <button type="submit">Submit Report</button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default LostFound;

