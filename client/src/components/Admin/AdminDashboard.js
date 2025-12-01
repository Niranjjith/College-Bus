import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [showBusForm, setShowBusForm] = useState(false);
  const [showRouteForm, setShowRouteForm] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const [busFormData, setBusFormData] = useState({ busNo: '', routes: [] });
  const [routeFormData, setRouteFormData] = useState({ route: '', fee: '', timing: '' });
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [accountForm, setAccountForm] = useState({
    currentPassword: '',
    newEmail: localStorage.getItem('adminEmail') || '',
    newPassword: '',
    confirmPassword: '',
  });
  const [accountStatus, setAccountStatus] = useState({ type: '', message: '' });
  const [isUpdatingAccount, setIsUpdatingAccount] = useState(false);
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
      const response = await api.get('/api/buses');
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

  const openAccountForm = () => {
    setAccountStatus({ type: '', message: '' });
    setAccountForm((prev) => ({
      ...prev,
      newEmail: localStorage.getItem('adminEmail') || prev.newEmail,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
    setShowAccountForm(true);
  };

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    setAccountStatus({ type: '', message: '' });

    if (!accountForm.currentPassword.trim()) {
      setAccountStatus({ type: 'error', message: 'Please enter your current password.' });
      return;
    }

    if (accountForm.newPassword && accountForm.newPassword !== accountForm.confirmPassword) {
      setAccountStatus({ type: 'error', message: 'New passwords do not match.' });
      return;
    }

    setIsUpdatingAccount(true);
    try {
      const payload = {
        currentPassword: accountForm.currentPassword,
      };

      if (
        accountForm.newEmail &&
        accountForm.newEmail.trim().toLowerCase() !==
          (localStorage.getItem('adminEmail') || '').toLowerCase()
      ) {
        payload.newEmail = accountForm.newEmail.trim();
      }

      if (accountForm.newPassword) {
        payload.newPassword = accountForm.newPassword.trim();
      }

      const { data } = await api.put('/api/admin/profile/credentials', payload);

      if (data?.token && data?.email) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminEmail', data.email);
      }

      setAccountStatus({
        type: 'success',
        message: 'Login details updated successfully.',
      });

      setTimeout(() => {
        setShowAccountForm(false);
      }, 800);
    } catch (error) {
      const msg =
        error?.response?.data?.error ||
        'Unable to update credentials. Please try again.';
      setAccountStatus({ type: 'error', message: msg });
    } finally {
      setIsUpdatingAccount(false);
    }
  };

  const handleAddBus = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/admin/buses', busFormData);
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
      const busId = selectedBus._id || selectedBus.id;
      await api.put(`/api/admin/buses/${busId}`, busFormData);
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
      await api.delete(`/api/admin/buses/${id}`);
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
      const busId = selectedBus._id || selectedBus.id;
      const routeId = editingRoute?._id || editingRoute?.id;

      if (editingRoute) {
        await api.put(`/api/admin/buses/${busId}/routes/${routeId}`, routeFormData);
      } else {
        await api.post(`/api/admin/buses/${busId}/routes`, routeFormData);
      }

      setRouteFormData({ route: '', fee: '', timing: '' });
      setShowRouteForm(false);
      setEditingRoute(null);
      
      // Refresh selected bus to show updated routes
      const updatedBuses = await api.get('/api/buses');
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
      await api.delete(`/api/admin/buses/${busId}/routes/${routeId}`);
      
      // Refresh selected bus to show updated routes
      const updatedBuses = await api.get('/api/buses');
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
          <button
            onClick={() => {
              setSelectedBus(null);
              setShowBusForm(true);
              setBusFormData({ busNo: '', routes: [] });
            }}
            className="add-btn"
          >
            + Add New Bus
          </button>
          <div className="buses-list">
            {buses.map((bus) => {
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditBus(bus);
                        }}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBus(bus.id);
                        }}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <span className="route-count">{bus.routes.length} routes</span>
                </div>
              );
            })}
          </div>

          <div className="account-card">
            <h3>Admin Account</h3>
            <p>Update your login email and password securely.</p>
            <button type="button" className="account-btn" onClick={openAccountForm}>
              Change Login Details
            </button>
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
                  {selectedBus.routes.map((route) => (
                    <tr key={route.id || route._id}>
                      <td>{route.route}</td>
                      <td>{route.fee === 0 ? '-' : `₹${route.fee.toLocaleString()}`}</td>
                      <td>{route.timing}</td>
                      <td>
                        <div className="route-actions">
                          <button
                            type="button"
                            onClick={() => handleEditRoute(route)}
                            className="edit-btn"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteRoute(
                                selectedBus._id || selectedBus.id,
                                route._id || route.id
                              )
                            }
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </div>
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

      {showAccountForm && (
        <div className="form-modal">
          <div className="modal-content">
            <h2>Update Admin Login</h2>
            {accountStatus.message && (
              <div
                className={
                  accountStatus.type === 'success'
                    ? 'account-status success'
                    : 'account-status error'
                }
              >
                {accountStatus.message}
              </div>
            )}
            <form onSubmit={handleAccountSubmit}>
              <input
                type="email"
                placeholder="New email (leave as is to keep current)"
                value={accountForm.newEmail}
                onChange={(e) =>
                  setAccountForm({ ...accountForm, newEmail: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Current password (required)"
                value={accountForm.currentPassword}
                onChange={(e) =>
                  setAccountForm({ ...accountForm, currentPassword: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="New password (optional)"
                value={accountForm.newPassword}
                onChange={(e) =>
                  setAccountForm({ ...accountForm, newPassword: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={accountForm.confirmPassword}
                onChange={(e) =>
                  setAccountForm({ ...accountForm, confirmPassword: e.target.value })
                }
              />
              <div className="form-actions">
                <button type="submit" disabled={isUpdatingAccount}>
                  {isUpdatingAccount ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAccountForm(false);
                    setAccountStatus({ type: '', message: '' });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

