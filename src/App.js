import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ManageEmployees from './pages/ManageEmployees';
import ManageRooms from './pages/ManageRooms';
import ManageBookings from './pages/ManageBookings';
import Reviews from './pages/Reviews';
import './assets/styles/global.css'; 

const App = () => {
  return (
    <Router>
      <header>
        <nav className="navbar">
          <h1>Hotel Admin Portal</h1>
          <ul className="nav-links">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/employees">Manage Employees</Link></li>
            <li><Link to="/rooms">Manage Rooms</Link></li>
            <li><Link to="/bookings">Manage Bookings</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
          </ul>
        </nav>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<ManageEmployees />} />
          <Route path="/rooms" element={<ManageRooms />} />
          <Route path="/bookings" element={<ManageBookings />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
