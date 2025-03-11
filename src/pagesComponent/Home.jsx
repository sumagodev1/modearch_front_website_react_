import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import Navbar from "../layoutComponent/Navbar";
import Footer from "../layoutComponent/Footer";
import ClientFeedback from "./ClientFeedback";
import homebannerimage from "./images/home/home_banner_image.png";
import craneHookImage from "./images/home/crane_hook.png";
import craneHookImageSmall from "./images/home/crane_hook_mobile_img.png";
import steelStructureImage from "./images/home/steelStructureImage.png";
import homeprecisionsteelimgDesktop  from "./images/home/homeprecisionsteelimg.png";
import homeprecisionsteelimgMobile from "./images/home/homeprecisionsteelimgMobile.png";
import certifiedSideImg from "./images/home/certified_side_img.png";
import certifiedSideImageSmall from "./images/home/certified_side_mobile_img.png";
import certified_img from "./images/home/certified_img.png";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import up_arrow_white from "./images/up-arrow-white.png";
import up_arrow from "./images/up-arrow.png";
import employees from "./images/home/employees.png";
import coreServices from "./images/home/coreServices.png";
import project from "./images/home/project.png";
import client from "./images/home/client.png";
import "./Home.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [homeslider, setHomeslider] = useState([]);
  console.log(homeslider);
  const [socialLinks, setSocialLinks] = useState({});

  // const homebannerimage_dynamic = homeslider.find((slide) => slide.view === "Desktop")?.image || "https://staging-api-v2.modearchsteel.com/uploads/homeslider/1741250790964-home_banner_image.png";

  const baseURL = axios.defaults.baseURL; // Dynamically set the baseURL
  const homebannerimage_dynamic = homeslider.find((slide) => slide.view === "Desktop")?.image;

  // Ensure the image URL is absolute
  const absoluteHomeBannerImage = homebannerimage_dynamic
    ? `${baseURL.replace(/\/$/, '')}/${homebannerimage_dynamic.replace(/^\//, '')}`
    : "https://staging-api-v2.modearchsteel.com/uploads/homeslider/1741250790964-home_banner_image.png";

  console.log("Final Open Graph Imagee:", absoluteHomeBannerImage);


  const [imageSrc, setImageSrc] = useState(homeprecisionsteelimgDesktop);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should only happen once
    });
  }, []);

  // Function to update image based on screen size
  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth < 768) {
        setImageSrc(homeprecisionsteelimgMobile); // Mobile image
      } else {
        setImageSrc(homeprecisionsteelimgDesktop); // Desktop image
      }
    };

    updateImage(); // Set initial image
    window.addEventListener("resize", updateImage); // Listen for resize events

    return () => window.removeEventListener("resize", updateImage); // Cleanup event listener
  }, []);

  useEffect(() => {
    axios
      .get("/homeslider/get-homeslider")
      .then((response) => {
        const data = response.data.responseData;
        console.log(
          "There was an error fetching the data!",
          response.data
        );
        const desktopSlides = data.filter((slide) => slide.view === "Desktop");
        const mobileSlides = data.filter((slide) => slide.view === "Mobile");

        const finalSlides = [
          ...(desktopSlides.length ? desktopSlides : []),
          ...(mobileSlides.length ? mobileSlides : []),
        ];
        setHomeslider(finalSlides);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setHomeslider([]);
      });

      axios
      .get("/social-contact/get-socialcontacts")
      .then((response) => {
        setSocialLinks(response.data.responseData[0] || {});
      })
      .catch((error) => {
        console.error("Error fetching social media links:", error);
      });

  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

//   const homebannerimage =
//     homeslider.find((slide) =>
//       isMobile ? slide.view === "Mobile" : slide.view === "Desktop"
//     )?.image || "";

  const [cranehookimageimagesrc, setCranehookimageimagesrc] = useState(craneHookImage);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCranehookimageimagesrc(craneHookImageSmall);
      } else {
        setCranehookimageimagesrc(craneHookImage);
      }

      if (window.innerWidth <= 820) {
        setCranehookimageimagesrc(craneHookImageSmall);
      } else {
        setCranehookimageimagesrc(craneHookImage);
      }

      if (window.innerWidth <= 1024) {
        setCranehookimageimagesrc(craneHookImageSmall);
      } else {
        setCranehookimageimagesrc(craneHookImage);
      }
    };

    // Initial check
    handleResize();

    // Listen for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [certifiedSideimagesrc, setCertifiedSideimagesrc] = useState(certifiedSideImg);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCertifiedSideimagesrc(certifiedSideImageSmall);
      } else {
        setCertifiedSideimagesrc(certifiedSideImg);
      }

      if (window.innerWidth <= 820) {
        setCertifiedSideimagesrc(certifiedSideImageSmall);
      } else {
        setCertifiedSideimagesrc(certifiedSideImg);
      }

      if (window.innerWidth <= 1024) {
        setCertifiedSideimagesrc(certifiedSideImageSmall);
      } else {
        setCertifiedSideimagesrc(certifiedSideImg);
      }
    };

    // Initial check
    handleResize();

    // Listen for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>

      <Helmet>
        <title>Home ModeArch Steel |Precision Steel Detailing & BIM Solutions | ModeArch Steel</title>
        <meta name="description" content="ModeArch Steel provides expert structural steel detailing, connection design, and BIM solutions worldwide. We deliver accurate, efficient, and high-quality services. Request a quote today!" />
        <meta name="keywords" content="steel detailing, structural steel, BIM modeling, connection design, shop drawings, erection drawings, steel fabrication, Navi Mumbai, Delaware, Nashik, construction services" />
        <meta name="author" content="ModeArch Steel" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Precision Steel Detailing & BIM Solutions | ModeArch Steel" />
        <meta property="og:description" content="ModeArch Steel provides expert structural steel detailing, connection design, and BIM solutions worldwide. We deliver accurate, efficient, and high-quality services. Request a quote today!" />
        <meta property="og:image" content={absoluteHomeBannerImage} />
        <meta property="og:url" content="https://staging-v2.modearchsteel.com/contactUs" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Precision Steel Detailing & BIM Solutions | ModeArch Steel" />
        <meta name="twitter:description" content="ModeArch Steel provides expert structural steel detailing, connection design, and BIM solutions worldwide. We deliver accurate, efficient, and high-quality services. Request a quote today!" />
        <meta name="twitter:image" content={absoluteHomeBannerImage} />
        <meta name="twitter:site" content="@YourTwitterHandle" />
        <meta name="twitter:creator" content="@YourTwitterHandle" />
      </Helmet>

      <Navbar />
     
      <section className="g-0">
        <div className="container-fluid px-0">
          <div className="about_banner_img">
            {/* <img src={homebannerimage} alt="Logo" className="img-fluid" /> */}
            {homeslider
            .filter(
                (a) =>
                a.isActive &&
                (isMobile ? a.view === "Mobile" : a.view === "Desktop")
            ).slice(0, 2)
            .map((a, index) => (
                <>
                <img src={a.img} alt="Logo" className="img-fluid" />
                </>
            ))}
          </div>
        </div>
      </section>

      <section className="who-we-are-section">
        <div className="container-fliud who_we_are_outer_padding mt-2">
          <div className="container-fluid">
            <div className="row who-we-are-row">
              <div className="col-md-6 image-column">
                <img
                  src={cranehookimageimagesrc}
                  alt="Crane Hook"
                  className="img-fluid"
                  data-aos="zoom-in"
                  data-aos-duration="2000"
                  data-aos-delay="900"
                />
              </div>
              <div className="col-md-6 text-column">
                <div className="text-content-wrapper">
                  <h2 className="ms-4 mt-4">Who We Are?</h2>
                  <div className="bordered-text">
                    <p className="text-justify" data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="900">
                      The Journey Of Modearch Steel Began in 2017, When A Small
                      Yet Passionate Team Started Working On The Vision Of
                      Delivering Precision- Driven Steel Detailing And Design
                      Solutions. After Five Years Of Dedication And Growth, We
                      Established Our First Office In Navi Mumbai In 2022.
                      Marking A Significant Milestone in Our Expansion. As Our
                      Expertise And Client Base Grew, We Expanded Globally,
                      Setting Up Our Second Office in Delaware. Dover. In 2023
                      To Cater To The North American Market.
                    </p>
                    <Link
                      to="/about" data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="900"
                      className="btn learn-more-button text-white button_align_left fw-bold underline_animation"
                      onClick={() => setTimeout(() => window.location.hash = "#about-us", 100)}
                    >
                      Learn More{" "}
                      <img
                        src={up_arrow_white}
                        alt="up_arrow"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="steel-detailing-section steel-structure-section">
        <div className="container-fliud steel-structure-section-outer-padding">
          <div className="container-fluid position-relative">
            <div className="row align-items-center steel-structure-section-row">
              <div className="col-lg-6 text-content">
                <h2 className="fw-bold" data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="900">Structural Steel Detailing</h2>
                <p data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="900">
                  At Modearch, We Pride Ourselves On Our Cutting-Edge Approach
                  To Steel Detailing. Utilizing Industry-Leading Software To
                  Deliver Exceptional Results For Our Clients. Leveraging The
                  Power Of SDS2 And Tekla, Two Of The Most Advanced Software
                  Solutions In The Field. We Ensure Precision, Efficiency, And
                  Accuracy In Every Project We Undertake.
                </p>
                <Link
                  to="/service" data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="900"
                  className="text-decoration-none btn fw-bold button_align_left get_in_touch_underline_animation"
                  onClick={() => setTimeout(() => window.location.hash = "#service", 100)}
                >
                  Check Our Services{" "}
                  <img
                    src={up_arrow}
                    alt="Tekla Structures"
                    className="expertise-logo img-fluid"
                  />
                </Link>
                {/* <a href="#" className="btn fw-bold button_align_left">
                  Check Out{" "}
                  <img src={up_arrow} alt="up_arrow" className="img-fluid" />
                </a> */}
              </div>
              <div className="col-lg-6 position-relative image-content">
                <img
                  src={steelStructureImage}
                  alt="Steel Structure"
                  className="structure-image img-fluid"
                  data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="900"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="client-feedback-home">
        <ClientFeedback />
      </section>

      <section className="craftsmanship_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-lg-5 craftsmanship-text mb-4">
              <h1 className="fw-bold mt-4" data-aos="fade-right" data-aos-duration="2000" data-aos-delay="900">DETAILING CRAFTSMANSHIP</h1>
              <div>
                <p className="text-capitalize text-justify mt-3" data-aos="fade-right" data-aos-duration="2000" data-aos-delay="900">
                  From structural steel fabrication drawings to intricate steel
                  connection designs, each project exemplifies our commitment to
                  accuracy, quality, and innovation. Whether it's commercial
                  buildings, industrial structures, or architectural marvels,
                  our detailing work ensures strength, durability, and
                  structural integrity. Explore our showcase to witness how we
                  bring steel to life through meticulous detailing and
                  craftsmanship. Trust us to elevate your projects with our
                  unmatched expertise in steel detailing.
                </p>
              </div>
              <div className="detailing_crafts_check_out_btn mb-5">
                <Link
                  to="/completed_project"
                  className="text-decoration-none btn fw-bold get_in_touch_underline_animation"
                  onClick={() => setTimeout(() => window.location.hash = "#completed_project", 100)}
                  data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="900"
                >
                  Check Out{" "}
                  <img
                    src={up_arrow}
                    alt="Tekla Structures"
                    className="expertise-logo img-fluid"
                  />
                </Link>
                {/* <a href="#" className="btn fw-bold">
                  Check Out{" "}
                  <img src={up_arrow} alt="up_arrow" className="img-fluid" />
                </a> */}
              </div>
            </div>
            <div className="col-md-6 col-lg-7 detailing_crafts_section"></div>
          </div>
        </div>
      </section>

      <section className="g-0">
        <div className="container-fluid px-0">
          <div className="about-precision-steel-img position-relative">
            <img
              src={imageSrc}
              alt="about-precision-steel-img"
              className="img-fluid w-100 home-precision-img"
              data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="900"
            />
            <Link
              to="/contactUs"
              className="text-decoration-none btn position-absolute about-precision-steel-btn text-white get_in_white_underline_animation"
              onClick={() => setTimeout(() => window.location.hash = "#contact-form", 100)}
              data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="900"
            >
              Get In Touch{" "}
              <img
                src={up_arrow_white}
                alt="Tekla Structures"
                className="expertise-logo img-fluid"
              />
            </Link>
            {/* <a
              href="#"
              className="btn position-absolute about-precision-steel-btn text-white"
            >
              Get In Touch{" "}
              <img
                src={up_arrow_white}
                alt="up_arrow"
                className="img-fluid about-precision-steel-btn-icon"
              />
            </a> */}
          </div>
        </div>
      </section>

      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 col-md-1 certified_text_div"></div>
            <div className="col-sm-12 col-md-6 certified_text_div">
              <div className="certified_text_border">
                <h5 className="mb-3" data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="900">
                  <span className="fw-bold">Certified </span>for Precision,{" "}
                  <span className="fw-bold">Trusted </span>for Excellence
                </h5>
                <div className="mb-5">
                  <p className="certified_para">
                    Modearch is proudly certified by AISD, NISD, and CISC,
                    reflecting our commitment to precision, compliance, and
                    industry-leading standards in steel detailing. These
                    certifications ensure our expertise in delivering accurate,
                    reliable, and high-quality detailing solutions that meet the
                    highest structural and fabrication requirements. Backed by
                    global standards, we guarantee excellence in every project
                    we undertake
                  </p>
                </div>
                <div>
                  <img
                    src={certified_img}
                    alt="certified_img"
                    className="img-fluid"
                    data-aos="zoom-in-up" data-aos-duration="2000" data-aos-delay="900"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-5">
              <img
                src={certifiedSideimagesrc}
                alt="certifiedSideImg"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="numbers-section p-4">
        <div className="container">
          <div className="row align-items-center mt-4 mb-4">
            <div className="col-md-6 text-content">
              <h2>
                <strong>Modearch Steel</strong>
              </h2>
              <h3>Detailing in Numbers</h3>
              <Link
                to="/contactUs"
                className="text-decoration-none btn button_align_left get-in-touch fw-bold get_in_touch_underline_animation"
                onClick={() => setTimeout(() => window.location.hash = "#contact-form", 100)}
              >
                Get In Touch{" "}
                <img
                  src={up_arrow}
                  alt="Tekla Structures"
                  className="expertise-logo img-fluid"
                />
              </Link>
              {/* <a
                href="#"
                className="btn button_align_left get-in-touch fw-bold"
              >
                Get In Touch{" "}
                <img src={up_arrow} alt="up_arrow" className="img-fluid" />
              </a> */}
            </div>
            <div className="col-md-6 stats-grid">
              <div className="row mb-2">
                <div className="col-6 stat-box number-section-border">
                  <div className="stat-icon-text">
                    <img src={employees} alt="Logo" className="img-fluid" />
                    <h1 className="fw-bold">50+</h1>
                  </div>
                  <p>EMPLOYEES</p>
                </div>
                <div className="col-6 stat-box">
                  <div className="stat-icon-text">
                    <img src={coreServices} alt="Logo" className="img-fluid" />
                    <h1 className="fw-bold">10+</h1>
                  </div>
                  <p>CORE SERVICE</p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-6 stat-box number-section-border">
                  <div className="stat-icon-text">
                    <img src={project} alt="Logo" className="img-fluid" />
                    <h1 className="fw-bold">5+</h1>
                  </div>
                  <p>PROJECT COMPLETED</p>
                </div>
                <div className="col-6 stat-box">
                  <div className="stat-icon-text">
                    <img src={client} alt="Logo" className="img-fluid" />
                    <h1 className="fw-bold">23+</h1>
                  </div>
                  <p>SATISFIED CLIENT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="p-3 mt-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-sm-12">
              <div>
                <h4 className="fw-bold" data-aos="fade-down" data-aos-duration="1500" data-aos-delay="700"  data-aos-easing="linear">Stay Up to Date</h4>
                <div>
                  <p data-aos="fade-down" data-aos-duration="1500" data-aos-delay="700"  data-aos-easing="linear">
                    Visit our blog for the latest news on steel detailing,
                    industry standards, and updates related to Modearch's
                    services.
                  </p>
                </div>
                <div>
                <Link
                  to="/blog"
                  className="text-decoration-none btn button_align_left fw-bold read_blog_underline_animation"
                  onClick={() => setTimeout(() => window.location.hash = "#blog", 100)}
                  data-aos="fade-down" data-aos-duration="1500" data-aos-delay="700"  data-aos-easing="linear"
                >
                  Read Our Blog{" "}
                  <img
                    src={up_arrow}
                    alt="Tekla Structures"
                    className="expertise-logo img-fluid"
                  />
                </Link>
                  {/* <a href="#" className="btn button_align_left fw-bold">
                    Read Our Blog{" "}
                    <img src={up_arrow} alt="up_arrow" className="img-fluid" />
                  </a> */}
                </div>
              </div>
            </div>
            <div className="col-md-7 col-sm-12 mt-5 mt-md-0">
              <div>
                <h4 className="fw-bold" data-aos="fade-down" data-aos-duration="1500" data-aos-delay="700"  data-aos-easing="linear">
                  Want to help shape the future of steel detailing?
                </h4>
                <div>
                  <p data-aos="fade-down" data-aos-duration="1500" data-aos-delay="700"  data-aos-easing="linear">
                    Modearch is looking for talented and motivated individuals
                    to join our growing team
                  </p>
                </div>
                <div>
                  <Link
                    to="/about"
                    className="text-decoration-none btn button_align_left fw-bold join_team_underline_animation"
                    onClick={() => setTimeout(() => window.location.hash = "#modearch_team", 100)}
                    data-aos="fade-down" data-aos-duration="1500" data-aos-delay="700"  data-aos-easing="linear"
                  >
                    Join the Modearch Team{" "}
                    <img
                      src={up_arrow}
                      alt="Tekla Structures"
                      className="expertise-logo img-fluid"
                      data-aos="fade-down" data-aos-duration="1500" data-aos-delay="700"  data-aos-easing="linear"
                    />
                  </Link>
                  {/* <a href="#" className="btn button_align_left fw-bold">
                    Join the Modearch Team{" "}
                    <img src={up_arrow} alt="up_arrow" className="img-fluid" />
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="social-media-section text-center">
        <h4 className="mb-3 fw-bold">Follow Us On</h4>
        <div className="d-flex justify-content-center gap-3">
          <a
            href={socialLinks.facebook}
            className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle gallery_social_logo_shadow"
            style={{ width: "45px", height: "45px", backgroundColor: "#fff" }}
          >
            <FaFacebookF style={{ height: "1.2rem", fill: "#444444" }} />
          </a>
          <a
            href={socialLinks.instagram}
            className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
            style={{ width: "45px", height: "45px", backgroundColor: "#fff" }}
          >
            <FaInstagram style={{ height: "1.2rem", fill: "#444444" }} />
          </a>
          {socialLinks.email && (
          <a
            href={`mailto:${socialLinks.email}`}
            className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
            style={{ width: "45px", height: "45px", backgroundColor: "#fff" }}
          >
            <FaEnvelope style={{ height: "1.2rem", fill: "#444444" }} />
          </a>
          )}
          {socialLinks.whatsapp && (
          <a
            href={`https://wa.me/${socialLinks.whatsapp.replace(/\D/g, "")}`}
            className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
            style={{ width: "45px", height: "45px", backgroundColor: "#fff" }}
          >
            <FaWhatsapp style={{ height: "1.2rem", fill: "#444444" }} />
          </a>
          )}
        </div>
      </section>

      <section className="gallery_last_bg_color_sec p-4">
        <div className="container-fluid"></div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
