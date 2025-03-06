import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../layoutComponent/Navbar";
import Footer from "../layoutComponent/Footer";
import ProjectDetails from "./ProjectDetails";
// import complete_project_banner_img from "./images/project/complete_project_banner_img.png";
import complete_project_bannerimgDesktop  from "./images/project/complete_project_banner_img.png";
import complete_project_bannerimgMobile from "./images/project/complete_project_bannermgMobile.png";
// import complete_project_img from "./images/project/complete_project_img.png";
import complete_projectimgDesktop  from "./images/project/complete_project_img.png";
import complete_projectimgMobile from "./images/project/complete_projectimgMobile.png";
import map from "./images/project/map.png";
import sds2Logo from "./images/project/sds2Logo.png";
import teklaLogo from "./images/project/teklaLogo.png";
import sds2NewLogo from "./images/project/sds2NewLogo.png";
import teklaNewLogo from "./images/project/teklaNewLogo.png";
import location_logo from "./images/project/location-logo.png";
import "./Completed_Project.css";
import Project from "./images/project/project.png";
import up_arrow from "./images/up-arrow.png";


const Completed_Project = () => {

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



  // const [activeCategory, setActiveCategory] = useState("Hospitals");
  const [categories, setCategories] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch project data from API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("category/get-category");
        console.log("response", response.data.responseData);
        setCategories(response.data.responseData);

        if (response.data.responseData.length > 0) {
          setActiveCategory(response.data.responseData[0].id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch project data when the active category changes
  useEffect(() => {
    if (activeCategory) {
      const fetchProjectsData = async () => {
        try {
          const response = await axios.get(
            `projectDetails/get-projectDetails?project_category_id=${activeCategory}`
          );
          console.log("responseeeeeeee", response);
          const filteredProjects = response.data.responseData.filter(
            (project) => project.project_category_id === activeCategory && project.isActive===true
          );
          setProjectsData(filteredProjects);
        } catch (error) {
          console.error("Error fetching project data:", error);
        }
      };

      fetchProjectsData();
    }
  }, [activeCategory]);

  // Check if we are on a project details page
  const isProjectDetailsPage = location.pathname.startsWith(
    "/completed_project/project/"
  );

  return (
    <>
      <Navbar />

      <section className="g-0">
        <div className="container-fluid px-0">
          <div className="complete_project_banner_img ">
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
              src={complete_projectimageSrc}
              alt="complete_project_img"
              className="img-fluid"
            />
          </div>
        </div>
      </section>
      <div id="completed_project">
        {/* Category Section */}
        <div className="container-fluid bg-dark py-3">
          {/* old className : container category_container flex-wrap d-flex justify-content-center align-items-center gap-3  text-center */}
          <div className="container category_container d-flex align-items-center text-center">
            {categories.map((category, index) => (
              <React.Fragment key={category.id}>
                {index !== 0 && <span className="text-white">|</span>}
                <button
                  className={`btn text-white border-0 p-0 category-btn ${
                    activeCategory === category.id ? "fw-bold" : "fw-normal"
                  }`}
                  onClick={() => setActiveCategory(category.id)} // Set category ID as active
                >
                  {category.title} {/* Display category name */}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        {/* Only show projects section if not on project details page */}
        {/* {!isProjectDetailsPage && ( */}
        <div className="container my-4">
          <div className="row">
            {projectsData.length > 0 ? (
              projectsData.map((project) => (
                <div
                  key={project.id}
                  className="col-lg-4 col-md-6 col-sm-12 mb-4"
                >
                  <div className="project-card p-3">
                    <img
                      src={project.img}
                      className="card-img-top img-fluid project-img-effect"
                      alt={project.project_name}
                    />
                    <div className="card-body p-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0 project_name">
                          {project.project_name}
                        </h5>
                        <Link
                          to={`/completed_project/${project.project_name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="text-decoration-none see_more_btn see_more_underline_animation"
                          onClick={()=>localStorage.setItem('objid',project.id)}
                        >
                          See More{" "}
                          <img
                            src={up_arrow}
                            alt="Tekla Structures"
                            className="expertise-logo"
                          />
                        </Link>
                      </div>
                      <p className="card-text mt-1">
                        <img
                          src={location_logo}
                          alt="location logo"
                          className="img-fluid location_logo"
                        />{" "}
                        {project.project_location}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="container text-center py-2">
                <h2 className="text-danger fw-bold">No projects available for the selected category.</h2>
              </div>
            )}
          </div>
        </div>
        {/* )} */}

        {/* Nested Routes for Project Details */}
        {/* <Routes>
        <Route path="project/:id" element={<ProjectDetails projects={projectsData} />} />
      </Routes> */}
      </div>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src={map} alt="Map" className="img-fluid p-4" />
            </div>
            <div className="col-md-6 expertise_lies_section">
              <div className="expertise_section">
                <h1 className="text-center fw-bold">Our Expertise Lies in</h1>
                <div className="row mt-4">
                  <div className="col-md-12 col-sm-6 col-lg-6">
                    <div className="mt-4 sds2NewLogo d-flex justify-content-center">
                      <img
                        src={sds2NewLogo}
                        alt="SDS2 by Allplan"
                        className="expertise-logo"
                      />
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-6 col-lg-6">
                    <div className="d-flex justify-content-start justify-content-sm-center expertise_tekla_logo_sm">
                      <img
                        src={teklaNewLogo}
                        alt="Tekla Structures"
                        className="expertise-logo"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="mt-3">
                We work across the <span className="fw-bold">world.</span>
              </h1>
              <div className="mt-4">
                <h4 className="fw-bold">Connect with Us</h4>
                <p className="mt-3">
                  Contact Modearch for professional advice on steel detailing
                  and industry best practices.
                </p>
              </div>
              <div className="mb-4">
                {/* <Link
                  to="/contactUs"
                  className="text-decoration-none see_more_btn contact_us_underline_animation"
                  onClick={() => setTimeout(() => window.location.hash = "#contact-form", 100)}
                >
                  Get In Touch{" "}
                  <img
                    src={up_arrow}
                    alt="Tekla Structures"
                    className="expertise-logo"
                  />
                </Link> */}

                <Link
                  to="/contactUs"
                  className="text-decoration-none btn button_align_left fw-bold get_in_touch_underline_animation"
                  onClick={() => setTimeout(() => window.location.hash = "#modearch_team", 100)}
                >
                  Get In Touch{" "}
                  <img
                    src={up_arrow}
                    alt="Tekla Structures"
                    className="expertise-logo img-fluid"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="expertise-section">
      <div className="container">
        <div className="row align-items-center justify-content-center text-center">
          <div className="col-12 col-md-4 text-white">
            <h1 className='expertise-h5'>Our Expertise Lies in</h1>
          </div>
          <div className="col-6 col-md-4">
            <img src={sds2Logo} alt="SDS2 by Allplan" className="expertise-logo" />
          </div>
          <div className="col-6 col-md-4">
            <img src={teklaLogo} alt="Tekla Structures" className="expertise-logo" />
          </div>
        </div>
      </div>
    </section> */}

      <Footer />
    </>
  );
};

export default Completed_Project;
