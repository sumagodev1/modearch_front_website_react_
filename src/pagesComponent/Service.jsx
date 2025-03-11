import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { Helmet } from 'react-helmet-async';
import "./service.css";
import Service1 from "./images/service/service1.png";
// import service_banner_img from "./images/service/service_banner_img.png";
import service_bannerimgDesktop  from "./images/service/service_banner_img.png";
import service_bannerimgMobile from "./images/service/homeprecisionsteelimgMobile.png";
// import servicenexttobanner from "./images/service/service-next-to-banner.png";
import servicenexttobannerimgDesktop  from "./images/service/service-next-to-banner.png";
import servicenexttobannerimgMobile from "./images/service/servicenexttobannerimgMobile.png";
import Navbar from "../layoutComponent/Navbar";
import Service_Faq from "./Service_Faq";
import Footer from "../layoutComponent/Footer";
import up_arrow_white from "./images/up-arrow-white.png";
import AOS from "aos";
import "aos/dist/aos.css";

// const services = [
//   {
//     title: "Structural",
//     subtitle: "Sheet Detailing",
//     img: Service1,
//     desc: "Our steel detailing services deliver highly accurate and fabrication-ready drawings using advanced 3D modeling software. We ensure compliance with industry standards while optimizing material efficiency and reducing errors, facilitating smooth fabrication and installation.",
//   },
//   {
//     title: "Connection",
//     subtitle: "Design",
//     img: Service1,
//     desc: "We provide engineered connection design solutions, ensuring structural integrity and compliance with load-bearing and safety requirements. Our team collaborates closely with engineers and fabricators to develop efficient and cost-effective connection designs.",
//   },
//   {
//     title: "BIM",
//     subtitle: "3D Modeling",
//     img: Service1,
//     desc: "Leveraging Building Information Modeling (BIM), we create intelligent 3D models that enhance project coordination, detect clashes early, and optimize workflows. Our BIM expertise allows for seamless collaboration among stakeholders, reducing project delays and rework. ",
//   },
//   {
//     title: "Miscellaneous",
//     subtitle: "Sheet Detailing",
//     img: Service1,
//     desc: "From stairs and railings to ladders and platforms, our miscellaneous steel detailing services cover a wide range of secondary steel structures. We ensure precise fabrication drawings, shop drawings, and erection plans for seamless integration with primary steel structures.",
//   },
//   {
//     title: "Material",
//     subtitle: "Take-Off & Estimation",
//     img: Service1,
//     desc: "Our material take-off (MTO) and estimation services help fabricators and contractors accurately determine project costs, minimize waste, and streamline procurement. We provide precise quantity take-offs and cost analysis, ensuring budget efficiency.",
//   },
//   {
//     title: "CNC",
//     subtitle: "&Fabrication Support",
//     img: Service1,
//     desc: "We generate CNC-compatible files and fabrication-ready drawings to enhance production efficiency. Our detailing ensures seamless integration with automated fabrication processes, reducing errors and improving turnaround times.",
//   },
//   {
//     title: "Quality Control",
//     subtitle: "&Compliance",
//     img: Service1,
//     desc: "At Modearch Steel, we prioritize accuracy, compliance, and quality assurance. Our services adhere to global standards such as AISC, NISD, CISC, and OSHA, ensuring that our deliverables meet the highest industry benchmarks.",
//   },
// ];

const Service = () => {

      useEffect(() => {
        AOS.init({
          duration: 1000, // Animation duration in milliseconds
          once: true, // Whether animation should only happen once
        });
      }, []);

  const [imageSrc, setImageSrc] = useState(service_bannerimgDesktop);
  const [servicenexttobannerimageSrc, setServicenexttobannerimageSrc] = useState(servicenexttobannerimgDesktop);

  // Function to update image based on screen size
  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth < 768) {
        setImageSrc(service_bannerimgMobile); // Mobile image
      } else {
        setImageSrc(service_bannerimgDesktop); // Desktop image
      }
    };

    updateImage(); // Set initial image
    window.addEventListener("resize", updateImage); // Listen for resize events

    return () => window.removeEventListener("resize", updateImage); // Cleanup event listener
  }, []);

  useEffect(() => {
    const updateServiceImage = () => {
      if (window.innerWidth < 768) {
        setServicenexttobannerimageSrc(servicenexttobannerimgMobile); // Mobile image
      } else {
        setServicenexttobannerimageSrc(servicenexttobannerimgDesktop); // Desktop image
      }
    };

    updateServiceImage(); // Set initial image
    window.addEventListener("resize", updateServiceImage); // Listen for resize events

    return () => window.removeEventListener("resize", updateServiceImage); // Cleanup event listener
  }, []);


    const [serviceData, setServiceData] = useState([]);
  
    useEffect(() => {
      const fetchServices = async () => {
        try {
          const response = await axios.get("/infrastructure/get-infrastructure");
                // Filter data to only include items where isActive is true
            const activeServices = response.data.responseData.filter(service => service.isActive === true);
            console.log("Active Services:", activeServices);
          setServiceData(activeServices);
        } catch (error) {
          console.error("Error fetching service data", error);
        }
      };
      fetchServices();
    }, []);

    useEffect(() => {
      const counters = document.querySelectorAll(".counter");
      const speed = 50; // Adjust speed
  
      const countUp = (counter) => {
        const target = +counter.getAttribute("data-count");
        let count = 0;
  
        const updateCount = () => {
          count += Math.ceil(target / 50); // Control increment step
          if (count >= target) {
            counter.innerText = target + "+";
          } else {
            counter.innerText = count;
            setTimeout(updateCount, speed);
          }
        };
  
        updateCount();
      };
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              countUp(entry.target);
              observer.unobserve(entry.target); // Stop observing after animation
            }
          });
        },
        { threshold: 0.5 }
      );
  
      counters.forEach((counter) => observer.observe(counter));
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
  
    const handleShow = (service) => {
      setSelectedService(service);
      setShowModal(true);
    };

    // for sevices text limit

    const [isMobile, setIsMobile] = useState(false);

    // Set the limit based on whether it's mobile or not
    const charLimit = isMobile ? 200 : 350;
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); // Adjust 768px if needed
      };
  
      handleResize(); // Check the screen size initially
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);


  return (
    <>

      <Helmet>
        <title>Steel Detailing Services | BIM, Connection Design | ModeArch Steel</title>
        <meta name="description" content="Explore ModeArch Steel's comprehensive services, including structural steel detailing, connection design, BIM modeling, and more. We deliver high-quality solutions for diverse industries." />
        <meta name="keywords" content="steel detailing services, BIM modeling, connection design, shop drawings, erection drawings, miscellaneous steel, material take-off, CNC fabrication, quality control, construction services" />
        <meta name="author" content="ModeArch Steel" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Steel Detailing Services | BIM, Connection Design | ModeArch Steel" />
        <meta property="og:description" content="Explore ModeArch Steel's comprehensive services, including structural steel detailing, connection design, BIM modeling, and more. We deliver high-quality solutions for diverse industries." />
        <meta property="og:image" content="https://staging-v2.modearchsteel.com/static/media/service_banner_img.49804b99476f5993dade.png" />
        <meta property="og:url" content="https://staging-v2.modearchsteel.com/service" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Precision Steel Detailing & BIM Solutions | ModeArch Steel" />
        <meta name="twitter:description" content="Explore ModeArch Steel's comprehensive services, including structural steel detailing, connection design, BIM modeling, and more. We deliver high-quality solutions for diverse industries." />
        <meta name="twitter:image" content="https://staging-v2.modearchsteel.com/static/media/service_banner_img.49804b99476f5993dade.png" />
        <meta name="twitter:site" content="@YourTwitterHandle" />
        <meta name="twitter:creator" content="@YourTwitterHandle" />
      </Helmet>

      <Navbar />

      <section className="g-0">
        <div className="container-fluid px-0">
          <div className="about_banner_img">
            <img src={imageSrc} alt="Logo" className="img-fluid" />
          </div>
        </div>
      </section>

      <section className="g-0 mt-5">
        <div className="container-fluid px-0">
          <div className="about_banner_img">
            <img src={servicenexttobannerimageSrc} alt="Logo" className="img-fluid" />
          </div>
        </div>
      </section>

      <section className="service-section mt-5 sevices-bg-img" id="service">
        <div className="container service-section-container">
          <h2 className="text-center mb-4 fw-bold" >Services</h2>
          <div className="row">
            {serviceData.slice(0, 3).map((service, index) => (
              <div key={index} className="col-md-12 mb-4">
                <div
                  className={`service-box d-flex flex-column flex-md-row ${
                    index % 2 !== 0 ? "flex-md-row-reverse" : ""
                  } gap-0`}
                >
                  <img
                    src={service.img}
                    alt={service.title}
                    className="img-fluid col-md-6"
                  />
                  <div
                    className={`service-text col-md-6 d-flex align-items-center bg-dark text-white p-4 service-right-side ${
                      index % 2 !== 0
                        ? "text-md-start text-md-end service-left-side"
                        : ""
                    }`}
                  >
                    {/* <div className='service-text col-md-6 d-flex align-items-center bg-dark text-white p-4'> */}
                    <div className="w-100">
                      <h1 data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="400">{service.title}</h1>
                      <h5 data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="400">{service.subtitle}</h5>
                      {/* <p className="text-justify" data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="400">{service.desc}</p> */}
                      <p className="text-justify" data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="400">
                        {service.desc.length > charLimit ? (
                          <>
                            {service.desc.slice(0, charLimit)}...
                            <span
                              className="fw-bold cursor-pointer"
                              onClick={() => handleShow(service)}
                              style={{ cursor: "pointer" }}
                            >
                              {" "}
                              Read More
                              {/* <img
                                src={up_arrow_white}
                                alt="Tekla Structures"
                                className="expertise-logo img-fluid"
                              /> */}
                            </span>
                          </>
                        ) : (
                          service.desc
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>{selectedService?.title}</Modal.Title>
              {/* <Modal.Title>{selectedService?.subtitle}</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
              <p>{selectedService?.desc}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

        </div>
      </section>

        <section className="g-0">
          <div className="container-fluid px-0">
            <div className="design-section text-center service_section_padding service-years-bg-color py-4">
              <div className="container mt-5 mb-5">
                {/* First Row - Stats */}
                <div className="row text-center mb-4 d-none d-md-flex">
                  <div className="col-md-4">
                    <h2 className="fw-bold counter" data-count="10" style={{ color: "#fff" }}>
                      0+
                    </h2>
                    <h5>Years of Expertise</h5>
                    <p>
                      A decade of excellence in steel detailing, connection
                      design, and BIM solutions
                    </p>
                  </div>
                  <div className="col-md-4">
                    <h2 className="fw-bold counter" data-count="1000" style={{ color: "#fff" }}>
                      0+
                    </h2>
                    <h5>Successful Projects</h5>
                    <p>
                      Delivered with unmatched precision, optimizing fabrication
                      and installation.
                    </p>
                  </div>
                  <div className="col-md-4">
                    <h2 className="fw-bold counter" data-count="1500" style={{ color: "#fff" }}>
                      0+
                    </h2>
                    <h5>Tons of Steel Detailed Monthly</h5>
                    <p>
                      Ensuring efficiency in fabrication and erection processes.
                    </p>
                  </div>
                </div>

                {/* Responsive Layout for Small Screens */}
                <div className="row text-center mb-4 d-md-none">
                  <div className="col-6">
                    <h2
                      className="fw-bold mobile-total-year"
                      style={{ color: "#fff" }}
                    >
                      10+
                    </h2>
                    <h5 className="mobile-subheading">Years of Expertise</h5>
                  </div>
                  <div className="col-6 d-flex align-items-center">
                    <p className="mobile-para">
                      A decade of excellence in steel detailing, connection
                      design, and BIM solutions
                    </p>
                  </div>
                  <div className="col-6">
                    <h2
                      className="fw-bold mobile-total-year"
                      style={{ color: "#fff" }}
                    >
                      1000+
                    </h2>
                    <h5 className="mobile-subheading">Successful Projects</h5>
                  </div>
                  <div className="col-6 d-flex align-items-center">
                    <p className="mobile-para">
                      Delivered with unmatched precision, optimizing fabrication
                      and installation.
                    </p>
                  </div>
                  <div className="col-6">
                    <h2
                      className="fw-bold mobile-total-year"
                      style={{ color: "#fff" }}
                    >
                      1,500+
                    </h2>
                    <h5 className="mobile-subheading">
                      Ons of Steel Detailed Monthly
                    </h5>
                  </div>
                  <div className="col-6 d-flex align-items-center">
                    <p className="mobile-para">
                      Ensuring efficiency in fabrication and erection processes.
                    </p>
                  </div>
                </div>

                {/* Second Row - Line with Circles (Hidden on Small Screens) */}
                <div className="position-relative d-none d-md-block">
                  <hr
                    className="border-white"
                    style={{
                      height: "4px",
                      backgroundColor: "#D5D5D5",
                      margin: "20px 0",
                    }}
                  />
                  <div
                    className="d-flex justify-content-between position-relative"
                    style={{ top: "-2rem" }}
                  >
                    <div className="service-line-circle first-circle"></div>
                    <div className="service-line-circle"></div>
                    <div className="service-line-circle"></div>
                  </div>
                </div>

                {/* Third Row - Labels */}
                <div className="row text-center d-none d-md-flex">
                  <div className="col-md-4">
                    <h5 className="fw-bold text-start">Our Track Record</h5>
                  </div>
                  <div className="col-md-4">
                    <h5 className="text-center">Industries We Serve</h5>
                  </div>
                  <div className="col-md-4">
                    <h5 className="text-end">Compliance</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container mb-5">
            <div className="row">
                {serviceData.slice(3).map((service, index) => (
                <div key={index} className="col-md-12 mb-4">
                    <div
                    className={`service-box d-flex flex-column flex-md-row ${
                        index % 2 !== 0 ? "flex-md-row-reverse" : ""
                    } gap-0`}
                    >
                    <img
                        src={service.img}
                        alt={service.title}
                        className="img-fluid col-md-6"
                    />
                    <div
                        className={`service-text col-md-6 d-flex align-items-center bg-dark text-white p-4 service-right-side ${
                        index % 2 !== 0
                            ? "text-md-start text-md-end service-left-side"
                            : ""
                        }`}
                    >
                        {/* <div className='service-text col-md-6 d-flex align-items-center bg-dark text-white p-4'> */}
                        <div className="w-100">
                        <h1 data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="400">{service.title}</h1>
                        <h5 data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="400">{service.subtitle}</h5>
                        {/* <p className="text-justify" data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="400">{service.desc}</p> */}
                        <p className="text-justify" data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="400">
                          {service.desc.length > charLimit ? (
                            <>
                              {service.desc.slice(0, charLimit)}...
                              <span
                                className="fw-bold cursor-pointer"
                                onClick={() => handleShow(service)}
                                style={{ cursor: "pointer" }}
                              >
                                {" "}
                                Read More
                                {/* <img
                                  src={up_arrow_white}
                                  alt="Tekla Structures"
                                  className="expertise-logo img-fluid"
                                /> */}
                              </span>
                            </>
                          ) : (
                            service.desc
                          )}
                        </p>
                    </div>
                    </div>
                  </div>
                </div>
                ))}
            </div>

              <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>{selectedService?.title}</Modal.Title>
                  {/* <Modal.Title>{selectedService?.subtitle}</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                  <p>{selectedService?.desc}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>

          </div>
        </section>

      <section className="service-faq mb-5">
        <Service_Faq />
      </section>

      <Footer />
    </>
  );
};

export default Service;
