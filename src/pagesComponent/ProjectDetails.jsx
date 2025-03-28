import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from 'react-helmet-async';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../layoutComponent/Navbar";
import Footer from "../layoutComponent/Footer";
// import complete_project_banner_img from "./images/project/complete_project_banner_img.png";
import complete_project_bannerimgDesktop  from "./images/project/complete_project_banner_img.webp";
import complete_project_bannerimgMobile from "./images/project/complete_project_bannermgMobile.webp";
// import complete_project_img from "./images/project/complete_project_img.png";
import complete_projectimgDesktop  from "./images/project/complete_project_img.webp";
import complete_projectimgMobile from "./images/project/complete_projectimgMobile.png";
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
  const [complete_projectimageSrc, setComplete_projectimageSrc] = useState(complete_projectimgDesktop);

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

  useEffect(() => {
    const updateServiceImage = () => {
      if (window.innerWidth < 768) {
        setComplete_projectimageSrc(complete_projectimgMobile); // Mobile image
      } else {
        setComplete_projectimageSrc(complete_projectimgDesktop); // Desktop image
      }
    };

    updateServiceImage(); // Set initial image
    window.addEventListener("resize", updateServiceImage); // Listen for resize events

    return () => window.removeEventListener("resize", updateServiceImage); // Cleanup event listener
  }, []);

  const { project_name } = useParams();
  const id = localStorage.getItem('objid');
  const [project, setProject] = useState(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const [projectdetails, setProjectdetails] = useState(null);

    // Fetch project data from localStorage
    useEffect(() => {
      const storedProjectData = JSON.parse(localStorage.getItem('projectData'));
      
      if (storedProjectData) {
        setProjectdetails(storedProjectData);
      } else {
        // If no data in localStorage, redirect to the homepage or an error page
        navigate("/completed_project"); // You can change this to another page if needed
      }
    }, [navigate]);

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
        console.log("API Response:", response);
  
        if (!response.data) {
          console.log("No data received from API.");
          return;
        }
  
        const projectData = response.data;
  
        // Ensure project_images is parsed correctly
        const formattedProject = {
          ...projectData,
          project_images: typeof projectData.project_images === "string"
            ? JSON.parse(projectData.project_images)
            : projectData.project_images,
        };
  
        console.log("Formatted Project Data:", formattedProject);
  
        // Check if project is inactive or marked for deletion before setting state
        if (!formattedProject.isActive && !formattedProject.isDelete) {
          setProject(formattedProject);
          console.log("Project set in state:", formattedProject);
        } else if (formattedProject.isDelete) {
          console.log("Project is marked for deletion, ignoring.");
        } else {
          console.log("Project is active, ignoring.");
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };
  
    if (id) {
      fetchProjectDetails();
    }
  }, [id]);  
  
  useEffect(() => {
    if (location.hash === "#project") {
      setTimeout(() => {
        const projectSection = document.getElementById("project");
        if (projectSection) {
          const yOffset = -90; // Adjust this value for more or less offset
          const y = projectSection.getBoundingClientRect().top + window.scrollY + yOffset;

          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 300); // Ensure the DOM is loaded before scrolling
    }
  }, [location]);
  

  // if (!project) {
  //   return <h2 className="text-center my-5">Project not found</h2>;
  // }

  return (
    <>

      <Helmet>
        <title>Completed Steel Detailing Projects | ModeArch Steel Portfolio</title>
        <meta name="description" content="Explore our portfolio of completed steel detailing projects. See how ModeArch Steel delivers precision and quality in various industries. View project descriptions and highlights." />
        <meta name="keywords" content="completed steel projects, steel detailing portfolio, construction projects, case studies, project highlights, industrial projects, commercial projects, infrastructure projects." />
        <meta name="author" content="ModeArch Steel" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Completed Steel Detailing Projects | ModeArch Steel Portfolio" />
        <meta property="og:description" content="Explore our portfolio of completed steel detailing projects. See how ModeArch Steel delivers precision and quality in various industries. View project descriptions and highlights." />
        <meta property="og:image" content="https://staging-v2.modearchsteel.com/static/media/…plete_project_banner_img.b95ddf64f782ffa954b5.png" />
        <meta property="og:url" content="https://staging-v2.modearchsteel.com//completed_project" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Precision Steel Detailing & BIM Solutions | ModeArch Steel" />
        <meta name="twitter:description" content="Explore our portfolio of completed steel detailing projects. See how ModeArch Steel delivers precision and quality in various industries. View project descriptions and highlights." />
        <meta name="twitter:image" content="https://staging-v2.modearchsteel.com/static/media/…plete_project_banner_img.b95ddf64f782ffa954b5.png" />
        <meta name="twitter:site" content="@YourTwitterHandle" />
        <meta name="twitter:creator" content="@YourTwitterHandle" />
      </Helmet>

      <Navbar />

      {/* <section className="g-0">
        <div className="container-fluid px-0">
          <div className="complete_project_banner_img">
            <img
              src={imageSrc}
              alt="complete_project_banner_img"
              className="img-fluid"
            />
          </div>
        </div>
      </section> */}

      <section className="g-0" id="project">
        <div className="container-fluid px-0">
          <div className="complete_project_img">
            <img
              src={complete_projectimageSrc}
              alt="complete_project_img"
              className="img-fluid"
            />
          </div>
        </div>
      </section>

      {/* {project?.isActive ? ( */}
      {project ? (
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
          // <div className="row justify-content-center">
          //   {project.project_images?.map((img, i) => (
          //     <div key={i} className="col-md-3 col-sm-6 mb-3 d-flex justify-content-center">
          //       <img
          //         src={`${axios.defaults.baseURL}${img}`}
          //         className="img-fluid rounded shadow-sm"
          //         alt={`Project Image ${i + 1}`}
          //         onClick={() => {
          //           setIndex(i);
          //           setOpen(true);
          //         }}
          //         style={{ cursor: "pointer" }}
          //       />
          //     </div>
          //   ))}
          // </div>
          <div className="row justify-content-center">
            {project.project_images?.map((img, i) => (
              <div key={i} className="col-md-3 col-sm-6 mb-3 d-flex justify-content-center">
                <img
                  src={`${axios.defaults.baseURL}${img}`}
                  className="img-fluid rounded shadow-sm"
                  alt={`Project Image ${i + 1}`}
                  onClick={() => {
                    setIndex(i);
                    setOpen(true);
                  }}
                  style={{
                    cursor: "pointer",
                    objectFit: 'cover',   // Ensure the image covers the container
                    height: '200px',      // Set a fixed height for all images
                    width: '100%',        // Set width to 100% to make it responsive
                  }}
                />
              </div>
            ))}
          </div>

        )}


        {/* <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={project.project_images.map((img, i) => ({
            src: `${axios.defaults.baseURL}${img}`,
            title: project.project_name,
            description: `Image ${i + 1}`,
          }))}
          plugins={[Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
        /> */}

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={project.project_images.map(img => ({
            src: `${axios.defaults.baseURL}${img}`,
            title: project.project_name,
            width: 1600,  // Add width and height for proper zooming
            height: 1200,
          }))}
          plugins={[Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
          zoom={{
            maxZoomPixelRatio: 5,   // Increase zoom limit
            zoomInMultiplier: 2,    // Control zoom speed
            doubleTapDelay: 300,    // Allow double-tap to zoom
            doubleClickDelay: 300,  // Allow double-click to zoom
            doubleTapMaxDelay: 500,
          }}
          captions={{ showToggle: true }}
          className="custom-lightbox"
        />


        <div className="row mt-4">
          <div className="col-md-12">
            <h2>{project.project_name}</h2>
            <p>
              {projectdetails.project_info ||
                "This is a sample description for the project."}
            </p>
          </div>
          <div className="col-md-6">
            <h5>
              <strong>Location:</strong> {projectdetails.project_name}
            </h5>
            <h5>
              <strong>Total Tonnage:</strong> {projectdetails.project_total_tonnage || "N/A"}
            </h5>
          </div>
          <div className="col-md-6">
            <h5>
              <strong>Year of Completion:</strong> {projectdetails.project_year_of_completion || "N/A"}
            </h5>
            <h5>
              <strong>Status:</strong> {projectdetails.project_status || "N/A"}
            </h5>
          </div>
        </div>
      </div>
      </>
      ) : (
        <>
        <div className="container text-center py-5">
            {/* text-danger */}
          <h2 className="fw-bold">Project Images Not Found</h2>
          <p className="text-muted mb-1">
            The project images you are looking for is either inactive or does not exist.
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

        {projectdetails && (
            // <div className="container mt-5">
            //   <h3>Project Details from Location</h3>
            //   <p><strong>Project Info:</strong> {projectdetails.project_info || "No project information available."}</p>
            //   <p><strong>Location:</strong> {projectdetails.project_name}</p>
            //   <p><strong>Total Tonnage:</strong> {projectdetails.project_total_tonnage || "N/A"}</p>
            //   <p><strong>Year of Completion:</strong> {projectdetails.project_year_of_completion || "N/A"}</p>
            //   <p><strong>Status:</strong> {projectdetails.project_status || "N/A"}</p>
            // </div>
            <div className="container mb-5">
              <div className="row mt-4">
                <div className="col-md-12">
                  <h2>{projectdetails.project_name}</h2>
                  <p>
                    {projectdetails.project_info ||
                      "This is a sample description for the project."}
                  </p>
                </div>
                <div className="col-md-6">
                  <h5>
                    <strong>Location:</strong> {projectdetails.project_name}
                  </h5>
                  <h5>
                    <strong>Total Tonnage:</strong> {projectdetails.project_total_tonnage || "N/A"}
                  </h5>
                </div>
                <div className="col-md-6">
                  <h5>
                    <strong>Year of Completion:</strong> {projectdetails.project_year_of_completion || "N/A"}
                  </h5>
                  <h5>
                    <strong>Status:</strong> {projectdetails.project_status || "N/A"}
                  </h5>
                </div>
              </div>
            </div>
          )}
        </>
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
