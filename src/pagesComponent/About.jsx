import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from '../layoutComponent/Navbar';
import Footer from '../layoutComponent/Footer'
import { Helmet } from 'react-helmet-async';
// import about_banner_img from './images/about/about-banner-img.png'
import aboutbannerimgDesktop  from "./images/about/about-banner-img.webp";
import aboutbannerimgMobile from "./images/about/aboutbannerimgMobile.webp";
import about_us_img from './images/about/about-us-imgg.webp'
import mission_img from './images/about/mission.png'
import visionmissionbottomimg from './images/about/vision-mission-bottom.webp'
import mission from './images/about/mission-in.png'
import vision from './images/about/vision.png'
import './About.css'
import Growth from './Growth';
import MeetExpert from './MeetExpert';
import ClientFeedback from './ClientFeedback';
// import aboutprecisionsteelimg from './images/about/about-precision-steel-img.png'
import aboutprecisionsteelimgDesktop  from "./images/about/about-precision-steel-img.webp";
import aboutprecisionsteelimgMobile from "./images/about/about-precision-steel-imgMobile.png";
import up_arrow from './images/up-arrow.svg'
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {

    useEffect(() => {
      AOS.init({
        duration: 1000, // Animation duration in milliseconds
        once: false, // Whether animation should only happen once
      });
    }, []);

  const [imageSrc, setImageSrc] = useState(aboutbannerimgDesktop);
  const [aboutprecisionsteelimageSrc, setAboutprecisionsteelimageSrc] = useState(aboutprecisionsteelimgDesktop);

  // Function to update image based on screen size
  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth < 768) {
        setImageSrc(aboutbannerimgMobile); // Mobile image
      } else {
        setImageSrc(aboutbannerimgDesktop); // Desktop image
      }
    };

    updateImage(); // Set initial image
    window.addEventListener("resize", updateImage); // Listen for resize events

    return () => window.removeEventListener("resize", updateImage); // Cleanup event listener
  }, []);

  useEffect(() => {
    const updateSteelImage = () => {
      if (window.innerWidth < 768) {
        setAboutprecisionsteelimageSrc(aboutprecisionsteelimgMobile); // Mobile image
      } else {
        setAboutprecisionsteelimageSrc(aboutprecisionsteelimgDesktop); // Desktop image
      }
    };

    updateSteelImage(); // Set initial image
    window.addEventListener("resize", updateSteelImage); // Listen for resize events

    return () => window.removeEventListener("resize", updateSteelImage); // Cleanup event listener
  }, []);

  return (
    <>

      <Helmet>
        <title>About ModeArch Steel | Our Story & Mission | Steel Detailing Experts</title>
        <meta name="description" content="Learn about ModeArch Steel's journey, mission, and values. We are a leading provider of steel detailing and BIM solutions with a global presence and a commitment to excellence." />
        <meta name="keywords" content="steel detailing, structural steel, BIM modeling, connection design, shop drawings, erection drawings, steel fabrication, Navi Mumbai, Delaware, Nashik, construction services" />
        <meta name="author" content="ModeArch Steel" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="About ModeArch Steel | Our Story & Mission | Steel Detailing Experts" />
        <meta property="og:description" content="Learn about ModeArch Steel's journey, mission, and values. We are a leading provider of steel detailing and BIM solutions with a global presence and a commitment to excellence." />
        <meta property="og:image" content="https://staging-v2.modearchsteel.com/static/media/about-banner-img.c8642c1a21176a16945f.png" />
        <meta property="og:url" content="https://staging-v2.modearchsteel.com/about" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Precision Steel Detailing & BIM Solutions | ModeArch Steel" />
        <meta name="twitter:description" content="Learn about ModeArch Steel's journey, mission, and values. We are a leading provider of steel detailing and BIM solutions with a global presence and a commitment to excellence." />
        <meta name="twitter:image" content="https://staging-v2.modearchsteel.com/static/media/about-banner-img.c8642c1a21176a16945f.png" />
        <meta name="twitter:site" content="@YourTwitterHandle" />
        <meta name="twitter:creator" content="@YourTwitterHandle" />
      </Helmet>

        <Navbar />

        <section className='g-0'>
            <div className="container-fluid px-0">
                <div className="about_banner_img">
                    <img src={imageSrc} alt="Logo" className='img-fluid' />
                </div>
            </div>
        </section>

        {/* Who We Are Section */}
        <section className='bg-dark text-light' id="about-us">
            <div className='container-fluid'>
              <div className='row align-items-center'>
                  {/* Image Column */}
                  <div className='col-md-6 col-lg-6 col-12 mt-3 text-center'>
                  <img src={about_us_img} alt="Who We Are" className='img-fluid mb-3' data-aos="fade-up" data-aos-duration="2000" data-aos-delay="600" />
                  </div>

                  {/* Content Column */}
                  <div className='col-md-6 col-lg-6 col-12 mt-3'>
                  <div className='p-3'>
                      <h2 className='fw-bold text-white ms-4 mb-3' data-aos="fade-up" data-aos-duration="2000" data-aos-delay="600">Who We Are ?</h2>
                      <div className='who-we-are-para'>
                          <p className='mb-0' data-aos="fade-up" data-aos-duration="2000" data-aos-delay="600">
                          The journey of Modearch Steel began in 2017. With a small yet passionate team, we started working on the vision of delivering precision-driven steel detailing and design solutions. After three years of dedication and growth, we established our first office in Navi Mumbai in 2022, marking a significant milestone in our business.
                          </p>
                          <p className='mb-0' data-aos="fade-up" data-aos-duration="2000" data-aos-delay="600">
                          As our expertise and demand grew, we expanded globally, setting up our second office in Delaware, USA, in 2023 to cater to the North American market. The same year, we further strengthened our presence by opening our third office in Nashik, followed by our fourth office in Nashik in 2024, reinforcing our commitment to innovation and excellence.
                          </p>
                          <p className='mb-2' data-aos="fade-up" data-aos-duration="2000" data-aos-delay="600">
                          With a decade of experience, 100+ successful projects, and a 100+ team of skilled steel detailers, we have positioned ourselves as a trusted partner for fabricators, contractors, and engineering firms worldwide. Our foundation is defined by accuracy, quality, and global collaboration, and we remain committed to shaping the future of steel detailing with cutting-edge technology and industry expertise.
                          </p>
                      </div>
                  </div>
                  </div>
              </div>
            </div>
        </section>

      {/* Vision & Mission Section */}
      <section className="vision-mission-section">
        <div className="container">
            <div className='d-flex justify-content-center mission-above-img'>
                <img src={mission_img} alt="Logo" className='img-fluid' />
            </div>
          <div className="row justify-content-center align-items-stretch vision-mission-row">
            {/* Vision Box */}
            <div className="col-md-6 mb-4 d-flex">
              <div className="p-4 bg-white vision-mission-rounded shadow text-center w-100 d-flex flex-column" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
                <div className='d-flex'>
                  <h3 className="fw-bold">
                    Vision <img src={vision} alt="Logo" className='img-fluid ms-2' style={{maxWidth:'71px'}} />
                  </h3>
                </div>
                <p className="mt-3 flex-grow-1 text-justify vision-mission-para">
                  At Modearch Steel, we aim to deliver precise, efficient, and innovative structural steel detailing solutions that streamline fabrication and construction. Through cutting-edge technology and expert collaboration, we ensure accuracy, quality, and timely execution for our clients worldwide.
                </p>
              </div>
            </div>

            {/* Mission Box */}
            <div className="col-md-6 mb-4 d-flex">
                <div className='row'>
                    <div className='col-12'>

                    </div>
                </div>
              <div className="p-4 bg-white vision-mission-rounded shadow text-center w-100 d-flex flex-column" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="600">
                <div className='d-flex'>
                  <h3 className="fw-bold">
                    Mission <img src={mission} alt="Logo" className='img-fluid ms-2' style={{maxWidth:'51px'}} />
                  </h3>
                </div>  
                <p className="mt-3 flex-grow-1 text-justify vision-mission-para">
                  We strive to be a global leader in structural steel detailing, setting new industry standards with technical excellence, reliability, and innovation. Our goal is to shape the future of steel construction with precision and sustainability.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='bottom-img'>
            <img src={visionmissionbottomimg} alt="Logo" className='img-fluid' />
        </div>
      </section>

      <Growth/>

      <MeetExpert/>

      <section className='g-0'>
        <div className="container-fluid px-0">
          <div className="about-precision-steel-img position-relative">
            <img src={aboutprecisionsteelimageSrc} alt="about-precision-steel-img" className='img-fluid w-100' />
              <Link
                to="/contactUs"
                className="text-decoration-none btn position-absolute about-precision-steel-btn2 get_in_touch_underline_animation"
                onClick={() => setTimeout(() => window.location.hash = "#contact-form", 100)}
              >
                Get In Touch{" "}
                <img
                  src={up_arrow}
                  alt="Tekla Structures"
                  className="expertise-logo img-fluid"
                />
              </Link>
            {/* <a href="#" className="btn position-absolute about-precision-steel-btn">
              Get In Touch <img src={up_arrow} alt="up_arrow" className='img-fluid' />
            </a> */}
          </div>
        </div>
      </section>

      <ClientFeedback/>

      <Footer/>
      
    </>
  )
}

export default About
