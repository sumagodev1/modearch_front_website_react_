import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../layoutComponent/Navbar';
import Footer from '../layoutComponent/Footer'
import ProjectDetails from './ProjectDetails';
import complete_project_banner_img from './images/project/complete_project_banner_img.png'
import complete_project_img from './images/project/complete_project_img.png'
import map from './images/project/map.png'
import sds2Logo from "./images/project/sds2Logo.png"; 
import teklaLogo from "./images/project/teklaLogo.png"; 
import sds2NewLogo from "./images/project/sds2NewLogo.png"; 
import teklaNewLogo from "./images/project/teklaNewLogo.png"; 
import location_logo from './images/project/location-logo.png'
import './Completed_Project.css'
import Project from './images/project/project.png'; 
import up_arrow from './images/up-arrow.png'

const projectsData = {
  Hospitals: [
    { 
      id: 1, 
      name: "Hospital Project 1", 
      location: "Nashik", 
      images: Project,
    },
    { 
      id: 2, 
      name: "Hospital Project 2", 
      location: "Nashik", 
      images: Project, 
    },
  ],
  Warehouse: [
    { 
      id: 3, 
      name: "Warehouse Project 1", 
      location: "Mumbai", 
      images: Project, 
    },
    { 
      id: 4, 
      name: "Warehouse Project 2", 
      location: "Mumbai", 
      images: Project,
    },
  ],
  Industrial: [
    { 
      id: 5, 
      name: "Industrial Project 1", 
      location: "Pune", 
      images: Project, 
    },
    { 
      id: 6, 
      name: "Industrial Project 2", 
      location: "Pune", 
      images: Project, 
    },
  ],
  Commercial: [
    { 
      id: 7, 
      name: "Commercial Project 1", 
      location: "Pune", 
      images: Project, 
    },
    { 
      id: 8, 
      name: "Commercial Project 2", 
      location: "Pune", 
      images: Project, 
    },
  ],
  School: [
    { 
      id: 9, 
      name: "School Project 1", 
      location: "Pune", 
      images: Project,
    },
    { 
      id: 10, 
      name: "School Project 2", 
      location: "Pune", 
      images: Project,
    },
  ],
  
};

const Completed_Project = () => {
  const [activeCategory, setActiveCategory] = useState("Hospitals");

  const location = useLocation(); 
  const navigate = useNavigate();

  // Check if we are on a project details page
  const isProjectDetailsPage = location.pathname.startsWith("/completed_project/project/");

  return (
    <>

    <Navbar/>

    <section className='g-0'>
        <div className="container-fluid px-0">
            <div className="complete_project_banner_img ">
                <img src={complete_project_banner_img} alt="complete_project_banner_img" className='img-fluid' />
            </div>
        </div>
    </section>  


    <section className='g-0'>
        <div className="container-fluid px-0">
            <div className="complete_project_img">
                <img src={complete_project_img} alt="complete_project_img" className='img-fluid' />
            </div>
        </div>
    </section> 
    <div>
      {/* Category Section */}
      <div className="container-fluid bg-dark py-3">
        <div className="container category_container flex-wrap d-flex justify-content-center align-items-center gap-3  text-center">
          {Object.keys(projectsData).map((category, index) => (
            <React.Fragment key={category}>
              {index !== 0 && <span className="text-white">|</span>}
              <button
                className={`btn text-white border-0 p-0 category-btn ${activeCategory === category ? "fw-bold" : "fw-normal"}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
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
              {/* ? */}
            {projectsData[activeCategory].map((project) => (
                <div key={project.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="project-card p-3">
                    <img src={project.images} className="card-img-top img-fluid project-img-effect" alt={project.name} />
                    {/* <img src={project.images[0]} className="card-img-top img-fluid project-img-effect" alt={project.name} /> */}
                    <div className="card-body p-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0 project_name">{project.name}</h5>
                        <Link to={`/completed_project/${project.id}`} className="text-decoration-none see_more_btn">
                        See More <i className="bi bi-arrow-up-right"></i>
                        </Link>
                    </div>
                    <p className="card-text mt-1">
                      <img src={location_logo} alt="location logo" className='img-fluid location_logo' /> {project.location}
                    </p>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        {/* )} */}

      {/* Nested Routes for Project Details */}
      {/* <Routes>
        <Route path="project/:id" element={<ProjectDetails projects={projectsData} />} />
      </Routes> */}
    </div>

    <section>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <img src={map} alt="Map" className='img-fluid p-4' />
          </div>
          <div className='col-md-6 expertise_lies_section'>
            <div className='expertise_section'>
              <h2 className='text-center'>Our Expertise Lies in</h2>
              <div className='row mt-4'>
                <div className='col-md-12 col-sm-6 col-lg-6'>
                  <div className='mt-4 sds2NewLogo d-flex justify-content-center'>
                    <img src={sds2NewLogo} alt="SDS2 by Allplan" className="expertise-logo" />
                  </div>
                </div>
                <div className='col-md-12 col-sm-6 col-lg-6'>
                  <div className='d-flex justify-content-start justify-content-sm-center expertise_tekla_logo_sm'>
                    <img src={teklaNewLogo} alt="Tekla Structures" className="expertise-logo" />
                  </div>
                </div>
              </div>
            </div>
            <h1 className='mt-3'>We work across the <span className='fw-bold'>world.</span></h1>
            <div className='mt-4'>
              <h4>Connect with Us</h4>
              <p className='mt-4'>Contact Modearch for professional advice on steel detailing and industry best practices.</p>
            </div>
            <div className='mb-4'>
              <Link to="/contactUs" className="text-decoration-none see_more_btn">
                Get In Touch <img src={up_arrow} alt="Tekla Structures" className="expertise-logo" />
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

    <Footer/>


    </>
  );
};

export default Completed_Project;
