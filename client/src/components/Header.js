import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        closeMobileMenu();
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header>
      <div className="logo">
        <img src="https://nilgiricollege.ac.in/images/logo-ncas-auto.png" alt="Nilgiri College Logo" />
      </div>
      <nav ref={navRef} className={mobileMenuOpen ? 'mobile-open' : ''}>
        <Link to="/" onClick={closeMobileMenu}>Home</Link>
        <Link to="/fees" onClick={closeMobileMenu}>Fees</Link>
        <Link to="/admin/login" onClick={closeMobileMenu} className="admin-link">Admin</Link>
      </nav>
      <button 
        ref={toggleRef}
        className="mobile-menu-toggle" 
        onClick={toggleMobileMenu} 
        aria-label="Toggle menu"
      >
        <span className={mobileMenuOpen ? 'hamburger open' : 'hamburger'}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      {mobileMenuOpen && <div className="mobile-overlay" onClick={closeMobileMenu}></div>}
    </header>
  );
};

export default Header;

