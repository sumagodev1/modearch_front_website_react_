import React from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Careers from "./pagesComponent/Careers";
import WebsiteContact from './Website_contact';
import ContactUs from './pagesComponent/ContactUs';
import About from './pagesComponent/About';
import Service from "./pagesComponent/Service";
import Completed_Project from "./pagesComponent/Completed_Project";
import ProjectDetails from "./pagesComponent/ProjectDetails";
import Gallery from "./pagesComponent/Gallery";
import GalleryDetails from './pagesComponent/GalleryDetails';
import Blog from "./pagesComponent/Blog";
import Blogdetails from "./pagesComponent/Blogdetails";
import './index.css';

function App() {
  // axios.defaults.baseURL = `http://localhost:8000/`;

  axios.defaults.baseURL = `https://staging-api.modearchsteel.com/`;

  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Careers />} />
          <Route path="/websiteContact" element={<WebsiteContact />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/completed_project" element={<Completed_Project />} />
          {/* <Route path="project/:id" element={<ProjectDetails />} /> */}
          <Route path="/completed_project/:id" element={<ProjectDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:id" element={<GalleryDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogdetails/:title" element={<Blogdetails />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
