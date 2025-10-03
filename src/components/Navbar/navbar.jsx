import React, { useState, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom'; 
import './navbar.css';
import { useCart } from '../CartContext/CartContext';
import logo from '../../assets/imgs/website icon.png';

library.add(fab, fas);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const { clearCart } = useCart();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('cartItems');
    clearCart();
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/"); 
  };

  return (
    <>
      <div className={`navbar-main ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container d-flex align-items-center justify-content-between py-2 nana">
          <Link className="navbar-brand d-flex align-items-center logo" to="/">
            <img src={logo} alt="Logo" className="logo me-2" />
            <span className="brand-name logo">Furniture House</span>
          </Link>

          {/* Hamburger for mobile */}
          <div className="hamburger d-lg-none" onClick={toggleMenu}>
            <FontAwesomeIcon icon={['fas', 'bars']} size="lg" style={{ backgroundColor: '#E7D1C9' }} />
          </div>

          {/* Navigation links */}
          <ul className={`nav justify-content-between menu-links ${menuOpen ? 'open' : ''}`}>
            <li className="nav-item links">
              <Link className="nav-link active links" to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li className="nav-item links">
              <Link className="nav-link links" to="/categories" onClick={() => setMenuOpen(false)}>Categories</Link>
            </li>

            {/* Toggle Login / Logout */}
            <li className="nav-item links">
              {isLoggedIn ? (
                <button className="nav-link links  btn-outline-primary px-3 py-2" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <Link className="nav-link links  btn-outline-primary px-3 py-2" to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              )}
            </li>

            <li className="nav-item links d-flex align-items-center">
              <Link className="nav-link" to="/cart" onClick={() => setMenuOpen(false)}>
                <FontAwesomeIcon className="cart" icon={['fas', 'cart-shopping']} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;