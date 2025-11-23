import React, { useState, useEffect } from 'react';
import api from '../config/axios';
import Header from './Header';
import Footer from './Footer';
import './Fees.css';

const Fees = () => {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await api.get('/api/buses');
      setBuses(response.data);
    } catch (error) {
      console.error('Error fetching buses:', error);
    }
  };

  const getAllRoutes = () => {
    const allRoutes = [];
    buses.forEach(bus => {
      bus.routes.forEach(route => {
        allRoutes.push({
          ...route,
          busNo: bus.busNo,
          busId: bus._id || bus.id
        });
      });
    });
    return allRoutes;
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === '') {
      setShowSuggestions(false);
      return;
    }

    const allRoutes = getAllRoutes();
    const matches = allRoutes
      .filter(route => 
        route.route.toLowerCase().includes(value.toLowerCase()) ||
        route.busNo.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 8)
      .map(route => ({
        display: `${route.busNo} - ${route.route}`,
        busNo: route.busNo,
        route: route.route,
        busId: route.busId
      }));

    setSuggestions(matches);
    setShowSuggestions(matches.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    const bus = buses.find(b => (b._id || b.id) === suggestion.busId);
    if (bus) {
      setSelectedBus(bus._id || bus.id);
      setSearchTerm(suggestion.display);
      setShowSuggestions(false);
    }
  };

  const handleBusSelect = (e) => {
    const busId = e.target.value;
    setSelectedBus(busId);
    if (busId) {
      const bus = buses.find(b => (b._id || b.id) === busId);
      setSearchTerm(bus ? bus.busNo : '');
    } else {
      setSearchTerm('');
    }
    setShowSuggestions(false);
  };

  const selectedBusData = buses.find(b => (b._id || b.id) === selectedBus);
  
  const filteredRoutes = selectedBusData
    ? selectedBusData.routes.filter(route =>
        searchTerm === '' ||
        route.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
        selectedBusData.busNo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : getAllRoutes().filter(route =>
        searchTerm === '' ||
        route.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.busNo.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="fees-page">
      <Header />
      <section className="fees-container">
        <div className="fees-header">
          <h1>Bus Routes & Fee Structure</h1>
          <p>Search for routes or select a bus to view detailed information</p>
        </div>

        <div className="fees-controls">
          <div className="search-wrapper">
            <div className="search-icon">🔍</div>
            <input
              type="text"
              className="search-input"
              placeholder="Search by route name or bus number..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => searchTerm && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="suggestions-dropdown">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <span className="suggestion-bus">{suggestion.busNo}</span>
                    <span className="suggestion-route">{suggestion.route}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="select-wrapper">
            <select
              className="bus-select"
              value={selectedBus}
              onChange={handleBusSelect}
            >
              <option value="">All Buses</option>
              {buses.map(bus => (
                <option key={bus._id || bus.id} value={bus._id || bus.id}>
                  {bus.busNo} ({bus.routes?.length || 0} routes)
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedBusData && (
          <div className="selected-bus-info">
            <h2>{selectedBusData.busNo}</h2>
            <p className="route-count-badge">{selectedBusData.routes?.length || 0} Routes Available</p>
          </div>
        )}

        <div className="table-wrapper">
          <table className="routes-table">
            <thead>
              <tr>
                <th>Bus No</th>
                <th>Route</th>
                <th>Fee</th>
                <th>Timing</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoutes.length === 0 ? (
                <tr>
                  <td colSpan="4" className="no-results">
                    No routes found. Try a different search term or select a different bus.
                  </td>
                </tr>
              ) : (
                filteredRoutes.map((route, index) => (
                  <tr key={route._id || route.id || index}>
                    <td className="bus-number">
                      {selectedBusData ? selectedBusData.busNo : route.busNo}
                    </td>
                    <td className="route-name">{route.route}</td>
                    <td className="fee-amount">
                      {route.fee === 0 ? (
                        <span className="free-badge">Free</span>
                      ) : (
                        `₹${route.fee.toLocaleString()}`
                      )}
                    </td>
                    <td className="timing">{route.timing}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fees;

