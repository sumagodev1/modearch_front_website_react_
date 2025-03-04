import React, { useEffect, useState } from "react";
import axios from "axios";
import "./service.css";
import Service1 from "./images/service/service1.png";
import service_banner_img from "./images/service/service_banner_img.png";
import servicenexttobanner from "./images/service/service-next-to-banner.png";
import Navbar from "../layoutComponent/Navbar";
import Faq from "./Faq";
import Footer from "../layoutComponent/Footer";

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

    const [serviceData, setServiceData] = useState([]);
  
    useEffect(() => {
      const fetchServices = async () => {
        try {
          const response = await axios.get("/infrastructure/get-infrastructure");
          console.log("hryy",response.data.responseData);
          setServiceData(response.data.responseData);
        } catch (error) {
          console.error("Error fetching service data", error);
        }
      };
      fetchServices();
    }, []);


  return (
    <>
      <Navbar />

      <section className="g-0">
        <div className="container-fluid px-0">
          <div className="about_banner_img">
            <img src={service_banner_img} alt="Logo" className="img-fluid" />
          </div>
        </div>
      </section>

      <section className="g-0 mt-5">
        <div className="container-fluid px-0">
          <div className="about_banner_img">
            <img src={servicenexttobanner} alt="Logo" className="img-fluid" />
          </div>
        </div>
      </section>

      <section className="service-section mt-5 sevices-bg-img">
        <div className="container service-section-container">
          <h2 className="text-center mb-4">Services</h2>
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
                      <h1>{service.title}</h1>
                      <h5>{service.subtitle}</h5>
                      <p>{service.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

        <section className="g-0">
          <div className="container-fluid px-0">
            <div className="design-section text-center my-5 service-years-bg-color py-4">
              <div className="container">
                {/* First Row - Stats */}
                <div className="row text-center mb-3 d-none d-md-flex">
                  <div className="col-md-4">
                    <h2 className="fw-bold" style={{ color: "#fff" }}>
                      10+
                    </h2>
                    <h5>Years of Expertise</h5>
                    <p>
                      A decade of excellence in steel detailing, connection
                      design, and BIM solutions
                    </p>
                  </div>
                  <div className="col-md-4">
                    <h2 className="fw-bold" style={{ color: "#fff" }}>
                      1000+
                    </h2>
                    <h5>Successful Projects</h5>
                    <p>
                      Delivered with unmatched precision, optimizing fabrication
                      and installation.
                    </p>
                  </div>
                  <div className="col-md-4">
                    <h2 className="fw-bold" style={{ color: "#fff" }}>
                      1,500+
                    </h2>
                    <h5>Ons of Steel Detailed Monthly</h5>
                    <p>
                      Ensuring efficiency in fabrication and erection processes.
                    </p>
                  </div>
                </div>

                {/* Responsive Layout for Small Screens */}
                <div className="row text-center mb-3 d-md-none">
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
                      Delivered with unmatched precision, optimizing fabrication
                      and installation.
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
                      Delivered with unmatched precision, optimizing fabrication
                      and installation.
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
                <div className="row text-center mt-3 d-none d-md-flex">
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
                        <h1>{service.title}</h1>
                        <h5>{service.subtitle}</h5>
                        <p>{service.desc}</p>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>

      <section className="service-faq mb-5">
        <Faq />
      </section>

      <Footer />
    </>
  );
};

export default Service;
