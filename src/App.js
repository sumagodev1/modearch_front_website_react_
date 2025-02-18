// import logo from './logo.svg';
import React from "react";
// import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Careers from "./pagesComponent/Careers"
import WebsiteContact from './Website_contact';
import ContactUs from './pagesComponent/ContactUs';
import About from './pagesComponent/About';
import './index.css'

function App() {

  // axios.defaults.baseURL = `http://localhost:8000/`;
  axios.defaults.baseURL = `https://staging-api.modearchsteel.com/`;
  

  return (
    <>

      <HelmetProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Careers />} />
            <Route path="/websiteContact" element={<WebsiteContact />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </HelmetProvider>

    </>
  );
}

export default App;
