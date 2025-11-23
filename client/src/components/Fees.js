import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import './Fees.css';

const Fees = () => {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await axios.get('/api/buses');
      setBuses(response.data);
    } catch (error) {
      console.error('Error fetching buses:', error);
    }
  };

  const handleBusClick = (bus) => {
    setSelectedBus(selectedBus?.id === bus.id ? null : bus);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const getAllRoutes = () => {
    const allRoutes = [];
    buses.forEach(bus => {
      bus.routes.forEach(route => {
        allRoutes.push({
          ...route,
          busNo: bus.busNo
        });
      });
    });
    return allRoutes;
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === '') {
      setShowSuggestions(false);
      return;
    }

    const allRoutes = getAllRoutes();
    const matches = allRoutes
      .filter(route => 
        route.route.toLowerCase().includes(value) ||
        route.busNo.toLowerCase().includes(value)
      )
      .slice(0, 10)
      .map(route => `${route.busNo} - ${route.route}`);

    setSuggestions(matches);
    setShowSuggestions(matches.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    const [busNo] = suggestion.split(' - ');
    
    const bus = buses.find(b => b.busNo === busNo);
    if (bus) {
      setSelectedBus(bus);
      setSearchTerm(suggestion);
      setShowSuggestions(false);
    }
  };

  const filteredRoutes = selectedBus
    ? selectedBus.routes.filter(route =>
        searchTerm === '' ||
        route.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
        selectedBus.busNo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : getAllRoutes().filter(route =>
        searchTerm === '' ||
        route.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.busNo.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="fees-page">
      <Header />
      <section className="container">
        <h1>Transport Fee Structure</h1>
        <p>Select a bus route to view details, or search by route, bus number, or driver to view fee and timing details.</p>

        <div className="search-box">
          <input
            type="text"
            id="searchInput"
            placeholder="Search route or bus no..."
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

        {!selectedBus && (
          <div className="buses-grid">
            {buses.map(bus => (
              <div
                key={bus.id}
                className="bus-card"
                onClick={() => handleBusClick(bus)}
              >
                <h3>{bus.busNo}</h3>
                <p>{bus.routes.length} routes</p>
                <span className="click-hint">Click to view routes →</span>
              </div>
            ))}
          </div>
        )}

        {selectedBus && (
          <div className="selected-bus-view">
            <div className="back-button" onClick={() => setSelectedBus(null)}>
              ← Back to All Buses
            </div>
            <h2>{selectedBus.busNo}</h2>
            <table>
              <thead>
                <tr>
                  <th>Bus No</th>
                  <th>Route</th>
                  <th>Fee (₹)</th>
                  <th>Timing</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoutes.map(route => (
                  <tr key={route.id}>
                    <td>{selectedBus.busNo}</td>
                    <td>{route.route}</td>
                    <td>{route.fee === 0 ? '-' : `₹${route.fee.toLocaleString()}`}</td>
                    <td>{route.timing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!selectedBus && (
          <table>
            <thead>
              <tr>
                <th>Bus No</th>
                <th>Route</th>
                <th>Fee (₹)</th>
                <th>Timing</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoutes.map((route, index) => (
                <tr key={index}>
                  <td>{route.busNo}</td>
                  <td>{route.route}</td>
                  <td>{route.fee === 0 ? '-' : `₹${route.fee.toLocaleString()}`}</td>
                  <td>{route.timing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Fees;

