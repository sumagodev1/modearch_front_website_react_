import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../layoutComponent/Navbar";
import Footer from "../layoutComponent/Footer";
// import complete_project_banner_img from "./images/project/complete_project_banner_img.png";
import complete_project_bannerimgDesktop  from "./images/project/complete_project_banner_img.png";
import complete_project_bannerimgMobile from "./images/project/complete_project_bannermgMobile.png";
import complete_project_img from "./images/project/complete_project_img.png";
import world_map from "./images/project/world_map.png";
import sds2Logo from "./images/project/sds2Logo.png";
import teklaLogo from "./images/project/teklaLogo.png";
import location_logo from "./images/project/location-logo.png";
import Project from "./images/project/project.png";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Import Plugins
import {
  Fullscreen,
  Slideshow,
  Thumbnails,
  Video,
  Zoom,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/thumbnails.css";


const ProjectDetails = () => {

  const [imageSrc, setImageSrc] = useState(complete_project_bannerimgDesktop);

  // Function to update image based on screen size
  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth < 768) {
        setImageSrc(complete_project_bannerimgMobile); // Mobile image
      } else {
        setImageSrc(complete_project_bannerimgDesktop); // Desktop image
      }
    };

    updateImage(); // Set initial image
    window.addEventListener("resize", updateImage); // Listen for resize events

    return () => window.removeEventListener("resize", updateImage); // Cleanup event listener
  }, []);

  const { project_name } = useParams();
  const id = localStorage.getItem('objid');
  const [project, setProject] = useState(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   const fetchProjectDetails = async () => {
  //     try {
  //       const response = await axios.get(
  //         `/projectDetailsWithImages/projects/${id}`
  //       );
  //       console.log(response);
  //       setProject(response.data);
  //       const projectData = response.data;

  //       if (typeof projectData.project_images === "string") {
  //         projectData.project_images = JSON.parse(projectData.project_images);
  //       }

  //       if (response.data.result) {
  //         const selectedBlog = response.data.responseData.find(
  //           (project) =>
  //             project.project_name.toLowerCase().replace(/\s+/g, "-") ===
  //             project_name
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error fetching blog details:", error);
  //     }
  //   };

  //   fetchProjectDetails();
  // }, [project_name]);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`/projectDetailsWithImages/projects/${id}`);
        console.log(response);
  
        const projectData = response.data;
  
        // Ensure project_images is parsed if it's a string
        const formattedProject = {
          ...projectData,
          project_images: typeof projectData.project_images === "string"
            ? JSON.parse(projectData.project_images)
            : projectData.project_images,
        };
  
        // Only set project if isActive is true
        if (formattedProject.isActive) {
          setProject(formattedProject);
        } else {
          console.log("Project is inactive, not setting state.");
        }
  
        if (response.data.result) {
          // Filter active projects
          const activeProjects = response.data.responseData?.filter(
            (project) => project.isActive === true
          );
  
          // Find the selected project
          const selectedBlog = activeProjects?.find(
            (project) =>
              project.project_name.toLowerCase().replace(/\s+/g, "-") === project_name
          );
  
          if (selectedBlog) {
            console.log("Selected Blog:", selectedBlog);
          }
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };
  
    if (id) {
      fetchProjectDetails();
    }
  }, [project_name, id]);
  
  

  // if (!project) {
  //   return <h2 className="text-center my-5">Project not found</h2>;
  // }

  return (
    <>
      <Navbar />

      <section className="g-0">
        <div className="container-fluid px-0">
          <div className="complete_project_banner_img">
            <img
              src={imageSrc}
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

      {project?.isActive ? (
      <>
      <div className="container-fluid bg-dark py-3">
        <div className="container category_container flex-wrap d-flex justify-content-center align-items-center gap-3 text-center">
          <button className="btn text-white border-0 p-0 category-btn fw-bold">
            {project.project_category}
          </button>
        </div>
      </div>

      <div className="container my-5">
        {project && (
          <div className="row justify-content-center">
            {project.project_images?.map((img, i) => (
              <div key={i} className="col-md-3 col-sm-6 mb-3">
                <img
                  src={`${axios.defaults.baseURL}${img}`}
                  className="img-fluid rounded shadow-sm"
                  alt={`Project Image ${i + 1}`}
                  onClick={() => {
                    setIndex(i);
                    setOpen(true);
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
          </div>
        )}


        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={project.project_images.map((img, i) => ({
            src: `${axios.defaults.baseURL}${img}`,
            title: project.project_name,
            description: `Image ${i + 1}`,
          }))}
          plugins={[Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
        />


        <div className="row mt-4">
          <div className="col-md-12">
            <h2>{project.project_name}</h2>
            <p>
              {project.project_info ||
                "This is a sample description for the project."}
            </p>
          </div>
          <div className="col-md-6">
            <h5>
              <strong>Location:</strong> {project.project_name}
            </h5>
            <h5>
              <strong>Total Tonnage:</strong> {project.project_total_tonnage || "N/A"}
            </h5>
          </div>
          <div className="col-md-6">
            <h5>
              <strong>Year of Completion:</strong> {project.project_year_of_completion || "N/A"}
            </h5>
            <h5>
              <strong>Status:</strong> {project.project_status || "N/A"}
            </h5>
          </div>
        </div>
      </div>
      </>
      ) : (
        <div className="container text-center py-5">
          <h2 className="text-danger fw-bold">Project Not Found</h2>
          <p className="text-muted mb-1">
            The project you are looking for is either inactive or does not exist.
          </p>
          {/* <img
            src="https://via.placeholder.com/600x300?text=No+Project+Available"
            alt="Project Not Found"
            className="img-fluid rounded shadow-sm my-3"
          /> */}
          <p className="text-muted">
            Browse our other exciting projects and explore our expertise.
          </p>
        </div>
      )}

      <section className="expertise-section mb-1">
        <div className="container">
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-12 col-md-4 text-white">
              <h1 className="expertise-h5">Our Expertise Lies in</h1>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="our_expertise_border_projectdetails">
                <img
                  src={sds2Logo}
                  alt="SDS2 by Allplan"
                  className="expertise-logo"
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
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
