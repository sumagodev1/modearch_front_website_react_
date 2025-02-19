import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from "react-router-dom";
import Navbar from "../layoutComponent/Navbar";
import Footer from "../layoutComponent/Footer";
import complete_project_banner_img from "./images/project/complete_project_banner_img.png";
import complete_project_img from "./images/project/complete_project_img.png";
import world_map from "./images/project/world_map.png";
import sds2Logo from "./images/project/sds2Logo.png";
import teklaLogo from "./images/project/teklaLogo.png";
import location_logo from "./images/project/location-logo.png";

import { SlideshowLightbox } from "lightbox.js-react";
// import 'lightbox.js-react/dist/index.css';

const ProjectDetails = () => {
  
  const { state } = useLocation();
  const location = useLocation();
  
  useEffect(() => {
    if (!state || !state.project) {
      return <h2>Project not found</h2>;
    }

  }, [location]);
  

  return (
    <>
      <Navbar />

      <section className="g-0">
        <div className="container-fluid px-0">
          <div className="complete_project_banner_img">
            <img
              src={complete_project_banner_img}
              alt="complete_project_banner_img"
              className="img-fluid"
            />
          </div>
        </div>
      </section>

      <section className="g-0">
        <div className="container-fluid px-0">
          <div className="complete_project_img">
            <img
              src={complete_project_img}
              alt="complete_project_img"
              className="img-fluid"
            />
          </div>
        </div>
      </section>

      {/* Category Section */}
      <div className="container-fluid bg-dark py-3">
        <div className="container category_container flex-wrap d-flex justify-content-center align-items-center gap-3 text-center">
          <button className="btn text-white border-0 p-0 category-btn fw-bold">
            {location.state.category}
          </button>
        </div>
      </div>

      <div className="container my-5">
        {/* <h2 className="text-center">{project.name}</h2> */}

        {/* Image Gallery */}
        <div className="row">
          {location.state.project.images.map((img, index) => (
            <div key={index} className="col-md-3 col-sm-6 mb-3">
              <SlideshowLightbox className="container grid grid-cols-3 gap-2 mx-auto">
                <img
                  src={img}
                  className="img-fluid rounded shadow-sm"
                  alt={`Project Image ${index + 1}`}
                />
              </SlideshowLightbox>
            </div>
          ))}
        </div>

        {/* Project Details */}
        <div className="row mt-4">
          <div className="col-md-12">
            <h2>{location.state.project.name}</h2>
            <p>{location.state.project.para}</p>
          </div>
          <div className="col-md-6">
            <h5>
              <strong>Location:</strong> {location.state.project.location}
            </h5>
            <h5>
              <strong>Total Tonnage:</strong> {location.state.project.Total_Tonnage}
            </h5>
          </div>
          <div className="col-md-6">
            <h5>
              <strong>Year of Completion:</strong> {location.state.project.year}
            </h5>
            <h5>
              <strong>Status:</strong> {location.state.project.status}
            </h5>
          </div>
        </div>
      </div>

      <section className="expertise-section">
        <div className="container">
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-12 col-md-4 text-white">
              <h1 className="expertise-h5">Our Expertise Lies in</h1>
            </div>
            <div className="col-6 col-md-4">
              <img
                src={sds2Logo}
                alt="SDS2 by Allplan"
                className="expertise-logo"
              />
            </div>
            <div className="col-6 col-md-4">
              <img
                src={teklaLogo}
                alt="Tekla Structures"
                className="expertise-logo"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProjectDetails;
