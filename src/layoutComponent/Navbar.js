import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from 'react-router-dom';
import logo from './website-logo.png';
import { FaFacebookF, FaInstagram, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const [contacts, setContacts] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});
  const [error, setError] = useState(null);

  const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location.pathname]);

  useEffect(() => {
    // Fetch Contact Info
    axios
      .get("/header-contact/getheaderContacts")
      .then((response) => {
        if (response.data.result) {
          setContacts(response.data.responseData || []);
        } else {
          setError(response.data.message);
        }
      })
      .catch(() => setError("Failed to fetch contact info"));

    // Fetch Social Media Links
    axios
      .get("/social-contact/get-socialcontacts")
      .then((response) => {
        setSocialLinks(response.data.responseData[0] || {});
      })
      .catch((error) => {
        console.error("Error fetching social media links:", error);
      });
  }, []);

  return (
    <>
    
      <div className="sticky-top">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 position-relative modearch_navbar">
          <div className="container">
            <Link className={`navbar-brand position-absolute top-50 translate-middle-y ${!isNavCollapsed ? "d-none" : ""}`} to="/">
              <img src={logo} alt="Logo" height="138" style={{ position: 'absolute', top: '-30px' }} />
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
                  <Link className={`nav-link text-white text-uppercase ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link  className={`nav-link text-white text-uppercase ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link  className={`nav-link text-white text-uppercase ${location.pathname === '/service' ? 'active' : ''}`} to="/service">Services</Link>
                </li>
                <li className="nav-item">
                  <Link  className={`nav-link text-white text-uppercase ${location.pathname === '/completed_project' ? 'active' : ''}`} to="/completed_project">Projects</Link>
                </li>
                <li className="nav-item">
                  <Link  className={`nav-link text-white text-uppercase ${location.pathname === '/gallery' ? 'active' : ''}`} to="/gallery">Gallery</Link>
                </li>
                <li className="nav-item">
                  <Link  className={`nav-link text-white text-uppercase ${location.pathname === '/blog' ? 'active' : ''}`} to="/blog">Blog</Link>
                </li>
                <li className="nav-item">
                  <Link  className={`nav-link text-white text-uppercase ${location.pathname === '/careers' ? 'active' : ''}`} to="/careers">Careers</Link>
                </li>
                <li className="nav-item">
                  <Link  className={`nav-link text-white text-uppercase ${location.pathname === '/contactUs' ? 'active' : ''}`} to="/contactUs">Contact</Link>
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
        <div className="bg-light py-3 text-dark">
          <div className="container">
            <div className="row align-items-center justify-content-md-end">
              {/* Contact Info Section */}
              <div className="col-12 col-md-auto text-center text-md-end mb-2 mb-md-0 header-mail-number">
                {/* <span className="me-3 d-block d-md-inline">+91 {contacts[0]?.phone1 || "213-814-2277"}</span> */}
                <a href={`tel:+1${contacts[0]?.phone1 || "213-814-2277"}`} className="me-3 d-block d-md-inline" style={{ textDecoration: "none", color: "#000" }}>
                  +1 {contacts[0]?.phone1 || "213-814-2277"}
                </a>
                {/* <span className="me-3 d-block d-md-inline">sales@modearchsteel.com</span> */}
                <a
                  href={`mailto:${socialLinks.email || "sales@modearchsteel.com"}`}
                  className="me-3 d-block d-md-inline"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  {socialLinks.email || "sales@modearchsteel.com"}
                </a>
              </div>
              {/* Social Icons Section */}
              <div className="col-12 col-md-auto d-flex justify-content-center justify-content-md-end flex-wrap">
                <a href={socialLinks.facebook} className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
                  style={{ width: '30px', height: '30px', backgroundColor: '#fff' }} target="_blank" rel="noopener noreferrer"  >
                  <FaFacebookF style={{ height: '0.8rem' }} />
                </a>
                <a href={socialLinks.instagram} className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
                  style={{ width: '30px', height: '30px', backgroundColor: '#fff' }} target="_blank" rel="noopener noreferrer" >
                  <FaInstagram style={{ height: '0.8rem' }} />
                </a>
                {/* <a href="mailto:sales@modearchsteel.com" className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
                  style={{ width: '30px', height: '30px', backgroundColor: '#fff' }}>
                  <FaEnvelope style={{ height: '0.8rem' }} />
                </a> */}
                {socialLinks.email && (
                  <a
                    href={`mailto:${socialLinks.email}`}
                    className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
                    style={{ width: "30px", height: "30px", backgroundColor: "#fff" }} target="_blank" rel="noopener noreferrer" 
                  >
                    <FaEnvelope style={{ height: "0.8rem" }} />
                  </a>
                )}
                {/* <a href="#" className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
                  style={{ width: '30px', height: '30px', backgroundColor: '#fff' }}>
                  <FaWhatsapp style={{ height: '0.8rem' }} />
                </a> */}
                {socialLinks.whatsapp && (
                  <a
                    href={`https://wa.me/${socialLinks.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
                    style={{ width: "30px", height: "30px", backgroundColor: "#fff" }}
                  >
                    <FaWhatsapp style={{ height: "0.8rem" }} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Navbar;
