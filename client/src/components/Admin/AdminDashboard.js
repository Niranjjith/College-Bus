import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [showBusForm, setShowBusForm] = useState(false);
  const [showRouteForm, setShowRouteForm] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const [busFormData, setBusFormData] = useState({ busNo: '', routes: [] });
  const [routeFormData, setRouteFormData] = useState({ route: '', fee: '', timing: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchBuses();
  }, [navigate]);

  const fetchBuses = async () => {
    try {
      const response = await axios.get('/api/buses');
      setBuses(response.data);
    } catch (error) {
      console.error('Error fetching buses:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const handleAddBus = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('/api/admin/buses', busFormData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBusFormData({ busNo: '', routes: [] });
      setShowBusForm(false);
      fetchBuses();
    } catch (error) {
      console.error('Error adding bus:', error);
      alert('Failed to add bus. Please try again.');
    }
  };

  const handleEditBus = (bus) => {
    setSelectedBus(bus);
    setBusFormData({ busNo: bus.busNo, routes: bus.routes });
    setShowBusForm(true);
  };

  const handleUpdateBus = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const busId = selectedBus._id || selectedBus.id;
      await axios.put(`/api/admin/buses/${busId}`, busFormData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedBus(null);
      setBusFormData({ busNo: '', routes: [] });
      setShowBusForm(false);
      fetchBuses();
    } catch (error) {
      console.error('Error updating bus:', error);
      alert('Failed to update bus. Please try again.');
    }
  };

  const handleDeleteBus = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bus?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/admin/buses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBuses();
    } catch (error) {
      console.error('Error deleting bus:', error);
      alert('Failed to delete bus. Please try again.');
    }
  };

  const handleAddRoute = () => {
    setEditingRoute(null);
    setRouteFormData({ route: '', fee: '', timing: '' });
    setShowRouteForm(true);
  };

  const handleEditRoute = (route) => {
    setEditingRoute(route);
    setRouteFormData({ route: route.route, fee: route.fee, timing: route.timing });
    setShowRouteForm(true);
  };

  const handleSaveRoute = async (e) => {
    e.preventDefault();
    if (!selectedBus) {
      alert('Please select a bus first');
      return;
    }
    
    try {
      const token = localStorage.getItem('adminToken');
      const busId = selectedBus._id || selectedBus.id;
      const routeId = editingRoute?._id || editingRoute?.id;

      if (editingRoute) {
        await axios.put(`/api/admin/buses/${busId}/routes/${routeId}`, routeFormData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`/api/admin/buses/${busId}/routes`, routeFormData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setRouteFormData({ route: '', fee: '', timing: '' });
      setShowRouteForm(false);
      setEditingRoute(null);
      
      // Refresh selected bus to show updated routes
      const updatedBuses = await axios.get('/api/buses');
      const selectedId = selectedBus._id || selectedBus.id;
      const updatedBus = updatedBuses.data.find(b => (b._id || b.id) === selectedId);
      if (updatedBus) {
        setSelectedBus(updatedBus);
        setBuses(updatedBuses.data);
      }
    } catch (error) {
      console.error('Error saving route:', error);
      alert('Failed to save route. Please try again.');
    }
  };

  const handleDeleteRoute = async (busId, routeId) => {
    if (!window.confirm('Are you sure you want to delete this route?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/admin/buses/${busId}/routes/${routeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Refresh selected bus to show updated routes
      const updatedBuses = await axios.get('/api/buses');
      const updatedBus = updatedBuses.data.find(b => b.id === busId);
      if (updatedBus) {
        setSelectedBus(updatedBus);
        setBuses(updatedBuses.data);
      }
    } catch (error) {
      console.error('Error deleting route:', error);
      alert('Failed to delete route. Please try again.');
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-actions">
          <span>👤 {localStorage.getItem('adminEmail')}</span>
          <button onClick={handleLogout} className="logout-btn">
            <span>🚪</span> Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="sidebar">
              <h2>Buses</h2>
              <button onClick={() => { setSelectedBus(null); setShowBusForm(true); setBusFormData({ busNo: '', routes: [] }); }} className="add-btn">
                + Add New Bus
              </button>
              <div className="buses-list">
                {buses.map(bus => {
                  const busId = bus._id || bus.id;
                  const selectedId = selectedBus?._id || selectedBus?.id;
                  return (
                  <div
                    key={busId}
                    className={`bus-item ${selectedId === busId ? 'active' : ''}`}
                    onClick={() => setSelectedBus(bus)}
                  >
                    <div className="bus-item-header">
                      <strong>{bus.busNo}</strong>
                      <div className="bus-item-actions">
                        <button onClick={(e) => { e.stopPropagation(); handleEditBus(bus); }} className="edit-btn">Edit</button>
                        <button onClick={(e) => { e.stopPropagation(); handleDeleteBus(bus.id); }} className="delete-btn">Delete</button>
                      </div>
                    </div>
                    <span className="route-count">{bus.routes.length} routes</span>
                  </div>
                  );
                })}
              </div>
        </div>

        <div className="main-content">
          {showBusForm && (
            <div className="form-modal">
              <div className="modal-content">
                <h2>{selectedBus ? 'Edit Bus' : 'Add New Bus'}</h2>
                <form onSubmit={selectedBus ? handleUpdateBus : handleAddBus}>
                  <input
                    type="text"
                    placeholder="Bus Number (e.g., BUS NO - 2)"
                    value={busFormData.busNo}
                    onChange={(e) => setBusFormData({ ...busFormData, busNo: e.target.value })}
                    required
                  />
                  <div className="form-actions">
                    <button type="submit">{selectedBus ? 'Update' : 'Add'} Bus</button>
                    <button type="button" onClick={() => { setShowBusForm(false); setSelectedBus(null); setBusFormData({ busNo: '', routes: [] }); }}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {selectedBus && !showBusForm && (
            <div className="bus-details">
              <div className="bus-details-header">
                <h2>{selectedBus.busNo}</h2>
                <button onClick={handleAddRoute} className="add-btn">+ Add Route</button>
              </div>

              {showRouteForm && (
                <div className="form-modal">
                  <div className="modal-content">
                    <h2>{editingRoute ? 'Edit Route' : 'Add New Route'}</h2>
                    <form onSubmit={handleSaveRoute}>
                      <input
                        type="text"
                        placeholder="Route Name"
                        value={routeFormData.route}
                        onChange={(e) => setRouteFormData({ ...routeFormData, route: e.target.value })}
                        required
                      />
                      <input
                        type="number"
                        placeholder="Fee (₹)"
                        value={routeFormData.fee}
                        onChange={(e) => setRouteFormData({ ...routeFormData, fee: e.target.value })}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Timing (e.g., 8:00 AM)"
                        value={routeFormData.timing}
                        onChange={(e) => setRouteFormData({ ...routeFormData, timing: e.target.value })}
                        required
                      />
                      <div className="form-actions">
                        <button type="submit">{editingRoute ? 'Update' : 'Add'} Route</button>
                        <button type="button" onClick={() => { setShowRouteForm(false); setEditingRoute(null); setRouteFormData({ route: '', fee: '', timing: '' }); }}>Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <table>
                <thead>
                  <tr>
                    <th>Route</th>
                    <th>Fee (₹)</th>
                    <th>Timing</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBus.routes.map(route => (
                    <tr key={route.id}>
                      <td>{route.route}</td>
                      <td>{route.fee === 0 ? '-' : `₹${route.fee.toLocaleString()}`}</td>
                      <td>{route.timing}</td>
                      <td>
                        <button onClick={() => handleEditRoute(route)} className="edit-btn">Edit</button>
                        <button onClick={() => handleDeleteRoute(selectedBus._id || selectedBus.id, route._id || route.id)} className="delete-btn">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!selectedBus && !showBusForm && (
            <div className="welcome-message">
              <h2>Welcome to Admin Dashboard</h2>
              <p>Select a bus from the sidebar to manage its routes, or add a new bus.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

