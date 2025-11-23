import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header>
      <div className="logo">
        <img src="https://nilgiricollege.ac.in/images/logo-ncas-auto.png" alt="Nilgiri College Logo" />
      </div>
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
        <span className={mobileMenuOpen ? 'hamburger open' : 'hamburger'}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      <nav className={mobileMenuOpen ? 'mobile-open' : ''}>
        <Link to="/" onClick={closeMobileMenu}>Home</Link>
        <Link to="/fees" onClick={closeMobileMenu}>Fees</Link>
        <Link to="/helpdesk" onClick={closeMobileMenu}>Helpdesk</Link>
        <Link to="/lost-found" onClick={closeMobileMenu}>Lost & Found</Link>
        <Link to="/admin/login" onClick={closeMobileMenu} className="admin-link">Admin</Link>
      </nav>
    </header>
  );
};

export default Header;

