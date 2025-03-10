import React, { useState } from "react";
import { Link } from 'react-router-dom';
import logo from './website-logo.png';
import { FaFacebookF, FaInstagram, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 position-relative">
        <div className="container">
          <Link className={`navbar-brand position-absolute top-50 translate-middle-y ${!isNavCollapsed ? "d-none" : ""}`} to="/">
            <img src={logo} alt="Logo" height="128" style={{ position: 'absolute', top: '-22px' }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            // aria-expanded="false"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
            style={{ marginLeft: 'auto' }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active text-white" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/about">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/service">Services</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/projects">Completed Projects</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/gallery">Gallery</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/blog">Blog</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/careers">Careers</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/contactUs">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <div className="bg-light py-2 text-dark">
        <div className="container d-flex justify-content-end">
          <span className="me-3">+1 213-814-2277</span>
          <span className="me-3">sales@modearchsteel.com</span>
          <a href="#" className="text-dark me-2 d-inline-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: '25px', height: '25px', backgroundColor: '#fff' }}><FaFacebookF style={{ height: '0.8rem' }} /></a>
          <a href="#" className="text-dark me-2 d-inline-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: '25px', height: '25px', backgroundColor: '#fff' }}><FaInstagram style={{ height: '0.8rem' }} /></a>
          <a href="mailto:sales@modearchsteel.com" className="text-dark me-2 d-inline-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: '25px', height: '25px', backgroundColor: '#fff' }}><FaEnvelope style={{ height: '0.8rem' }} /></a>
          <a href="#" className="text-dark me-2 d-inline-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: '25px', height: '25px', backgroundColor: '#fff' }}><FaWhatsapp style={{ height: '0.8rem' }} /></a>
        </div>
      </div> */}
      <div className="bg-light py-2 text-dark">
  <div className="container">
    <div className="row align-items-center justify-content-md-end">
      {/* Contact Info Section */}
      <div className="col-12 col-md-auto text-center text-md-end mb-2 mb-md-0">
        <span className="me-3 d-block d-md-inline">+1 213-814-2277</span>
        <span className="me-3 d-block d-md-inline">sales@modearchsteel.com</span>
      </div>
      {/* Social Icons Section */}
      <div className="col-12 col-md-auto d-flex justify-content-center justify-content-md-end flex-wrap">
        <a href="#" className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
           style={{ width: '30px', height: '30px', backgroundColor: '#fff' }}>
          <FaFacebookF style={{ height: '0.8rem' }} />
        </a>
        <a href="#" className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
           style={{ width: '30px', height: '30px', backgroundColor: '#fff' }}>
          <FaInstagram style={{ height: '0.8rem' }} />
        </a>
        <a href="mailto:sales@modearchsteel.com" className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
           style={{ width: '30px', height: '30px', backgroundColor: '#fff' }}>
          <FaEnvelope style={{ height: '0.8rem' }} />
        </a>
        <a href="#" className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
           style={{ width: '30px', height: '30px', backgroundColor: '#fff' }}>
          <FaWhatsapp style={{ height: '0.8rem' }} />
        </a>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default Navbar;
