import React from 'react'
import Navbar from '../layoutComponent/Navbar';
import Footer from '../layoutComponent/Footer'
import { Helmet } from 'react-helmet-async';
import about_banner_img from './images/about/about-banner-img.png'
import about_us_img from './images/about/about-us-imgg.png'
import mission_img from './images/about/mission.png'
import visionmissionbottomimg from './images/about/vision-mission-bottom.png'
import mission from './images/about/mission-in.png'
import vision from './images/about/vision.png'
import './About.css'
import Growth from './Growth';
import MeetExpert from './MeetExpert';
import ClientFeedback from './ClientFeedback';
import aboutprecisionsteelimg from './images/about/about-precision-steel-img.png'
import up_arrow from './images/up-arrow.png'

const About = () => {
  return (
    <>

        <Helmet>
            <title>About Us - About Modearch Steel company</title>
            <meta name="description" content="About for a Modearch Steel company" />
            <meta name="keywords" content="about, about us, about modearch steel" />
        </Helmet>

        <Navbar />

        <section className='g-0'>
            <div className="container-fluid px-0">
                <div className="about_banner_img">
                    <img src={about_banner_img} alt="Logo" className='img-fluid' />
                </div>
            </div>
        </section>

        {/* Who We Are Section */}
        <section className='bg-dark text-light'>
            <div className='container-fluid'>
              <div className='row align-items-center'>
                  {/* Image Column */}
                  <div className='col-md-6 col-lg-6 col-12 mt-3 text-center'>
                  <img src={about_us_img} alt="Who We Are" className='img-fluid' />
                  </div>

                  {/* Content Column */}
                  <div className='col-md-6 col-lg-6 col-12 mt-3'>
                  <div className='p-3'>
                      <h2 className='fw-bold text-white ms-4 mb-3'>Who We Are ?</h2>
                      <div className='who-we-are-para'>
                          <p className='mb-0'>
                          The journey of Modaztech Steel began in 2017. With a small yet passionate team, we started working on the vision of delivering precision-driven steel detailing and design solutions. After three years of dedication and growth, we established our first office in Navi Mumbai in 2022, marking a significant milestone in our business.
                          </p>
                          <p className='mb-0'>
                          As our expertise and demand grew, we expanded globally, setting up our second office in Delaware, USA, in 2023 to cater to the North American market. The same year, we further strengthened our presence by opening our third office in Nashik, followed by our fourth office in Nashik in 2024, reinforcing our commitment to innovation and excellence.
                          </p>
                          <p className='mb-2'>
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
              <div className="p-4 bg-white vision-mission-rounded shadow text-center w-100 d-flex flex-column">
                <div className='d-flex'>
                  <h3 className="fw-bold">
                    Vision <img src={vision} alt="Logo" className='img-fluid ms-2' style={{maxWidth:'71px'}} />
                  </h3>
                </div>
                <p className="mt-3 flex-grow-1 text-justify">
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
              <div className="p-4 bg-white vision-mission-rounded shadow text-center w-100 d-flex flex-column">
                <div className='d-flex'>
                  <h3 className="fw-bold">
                    Mission <img src={mission} alt="Logo" className='img-fluid ms-2' style={{maxWidth:'51px'}} />
                  </h3>
                </div>  
                <p className="mt-3 flex-grow-1 text-justify">
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
            <img src={aboutprecisionsteelimg} alt="about-precision-steel-img" className='img-fluid w-100' />
            <a href="#" className="btn position-absolute about-precision-steel-btn">
              Get In Touch <img src={up_arrow} alt="up_arrow" className='img-fluid' />
            </a>
          </div>
        </div>
      </section>

      <ClientFeedback/>

      <Footer/>
      
    </>
  )
}

export default About
