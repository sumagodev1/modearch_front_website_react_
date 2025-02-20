import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../layoutComponent/Navbar";
import Footer from "../layoutComponent/Footer";
import complete_project_banner_img from "./images/project/complete_project_banner_img.png";
import complete_project_img from "./images/project/complete_project_img.png";
import world_map from "./images/project/world_map.png";
import sds2Logo from "./images/project/sds2Logo.png";
import teklaLogo from "./images/project/teklaLogo.png";
import location_logo from "./images/project/location-logo.png";
import Project from './images/project/project.png'; 

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Import Plugins
import { Fullscreen, Slideshow, Thumbnails, Video, Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const staticProjectDetails = {
  1: {
    name: "City Hospital",
    location: "New York",
    Total_Tonnage: "500 Tons",
    year: "2022",
    status: "Completed",
    images: [
      Project,
      Project,
      Project,
    ],
  },
  2: {
    name: "Metro Medical Center",
    location: "Los Angeles",
    Total_Tonnage: "750 Tons",
    year: "2023",
    status: "Completed",
    images: [
      Project,
      Project,
    ],
  },
  3: {
    name: "Sunrise High School",
    location: "Chicago",
    Total_Tonnage: "600 Tons",
    year: "2021",
    status: "Completed",
    images: [
      Project,
      Project,
    ],
  },
};

const ProjectDetails = () => {
  const { id } = useParams();
  const project = staticProjectDetails[id];

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!project) {
    return <h2 className="text-center my-5">Project not found</h2>;
  }
  

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
      {/* <div className="container-fluid bg-dark py-3">
        <div className="container category_container flex-wrap d-flex justify-content-center align-items-center gap-3 text-center">
          <button className="btn text-white border-0 p-0 category-btn fw-bold">
            {project.category}
          </button>
        </div>
      </div> */}

      <div className="container my-5">
        {/* <h2 className="text-center">{project.name}</h2> */}

        {/* Image Gallery */}

        <div className="row">
          {project.images.map((img, i) => (
            <div key={i} className="col-md-3 col-sm-6 mb-3">
              <img
                src={img}
                className="img-fluid rounded shadow-sm"
                alt={`Project Image ${i + 1}`}
                onClick={() => { setIndex(i); setOpen(true); }}
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}
        </div>

        {/* Lightbox Component */}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={project.images.map((img, i) => ({
            src: img,
            title: project.name,
            description: `Image ${i + 1}`,
          }))}
          plugins={[Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
        />

        {/* Project Details */}
        <div className="row mt-4">
          <div className="col-md-12">
            <h2>{project.name}</h2>
            <p>{project.description || "This is a sample description for the project."}</p>
          </div>
          <div className="col-md-6">
            <h5><strong>Location:</strong> {project.location}</h5>
            <h5><strong>Total Tonnage:</strong> {project.Total_Tonnage}</h5>
          </div>
          <div className="col-md-6">
            <h5><strong>Year of Completion:</strong> {project.year}</h5>
            <h5><strong>Status:</strong> {project.status}</h5>
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
