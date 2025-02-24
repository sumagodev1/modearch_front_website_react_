import React from 'react';
import Navbar from '../layoutComponent/Navbar';
import Footer from '../layoutComponent/Footer';
import ClientFeedback from './ClientFeedback';
import homebannerimage from './images/home/home_banner_image.png';
import craneHookImage from './images/home/crane_hook.png'; 
import steelStructureImage from './images/home/steelStructureImage.png';
import homeprecisionsteelimg from './images/home/homeprecisionsteelimg.png'
import certifiedSideImg from './images/home/certified_side_img.png'
import certified_img from './images/home/certified_img.png'
import { FaUserFriends, FaCog, FaProjectDiagram, FaHandshake } from 'react-icons/fa';
import up_arrow_white from './images/up-arrow-white.png'
import up_arrow from './images/up-arrow.png'
import employees from './images/home/employees.png'
import coreServices from './images/home/coreServices.png'
import project from './images/home/project.png'
import client from './images/home/client.png'
import './Home.css';

const Home = () => {
  return (
    <>

        <Navbar/>

        <section className='g-0'>
            <div className="container-fluid px-0">
                <div className="about_banner_img">
                    <img src={homebannerimage} alt="Logo" className='img-fluid' />
                </div>
            </div>
        </section>  

        <section className="who-we-are-section">
            <div className="container-fliud who_we_are_outer_padding">
            <div className="container-fluid">
            <div className="row who-we-are-row">
                <div className="col-md-6 image-column">
                {/* <img src={craneHookImage} alt="Crane Hook" className="img-fluid" /> */}
                </div>
                <div className="col-md-6 text-column">
                <div className="text-content-wrapper">
                    <h2 className='ms-4 mt-4'>Who We Are?</h2>
                    <div className="bordered-text">
                    <p>
                        The Journey Of Modearch Steel Began in 2017, When A Small Yet
                        Passionate Team Started Working On The Vision Of Delivering Precision-
                        Driven Steel Detailing And Design Solutions. After Five Years Of
                        Dedication And Growth, We Established Our First Office In Navi Mumbai
                        In 2022. Marking A Significant Milestone in Our Expansion.
                        As Our Expertise And Client Base Grew, We Expanded Globally, Setting
                        Up Our Second Office in Delaware. Dover. In 2023 To Cater To The North
                        American Market.
                    </p>
                    <a href="#" className="btn learn-more-button text-white button_align_left">
                        Learn More <img src={up_arrow_white} alt="up_arrow" className='img-fluid' />
                    </a>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </div>
        </section>

        <section className="steel-detailing-section steel-structure-section">
            <div className="container position-relative">
                <div className="row align-items-center">
                <div className="col-lg-6 text-content">
                    <h2 className="fw-bold">Structural Steel Detailing</h2>
                    <p>
                    At Modearch, We Pride Ourselves On Our Cutting-Edge Approach
                    To Steel Detailing. Utilizing Industry-Leading Software To Deliver
                    Exceptional Results For Our Clients. Leveraging The Power
                    Of SDS2 And Tekla, Two Of The Most Advanced Software Solutions
                    In The Field. We Ensure Precision, Efficiency, And Accuracy In Every
                    Project We Undertake.
                    </p>
                    <a href="#" className="btn fw-bold button_align_left">Check Out <img src={up_arrow} alt="up_arrow" className='img-fluid' /></a>
                </div>
                <div className="col-lg-6 position-relative image-content">
                    {/* <img src={steelStructureImage} alt="Steel Structure" className="structure-image img-fluid" /> */}
                </div>
                </div>
            </div>
        </section>

        <section className="client-feedback-home">
            <ClientFeedback />
        </section>

        <section className='detailing_crafts_section'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                        <h1 className='fw-bold'>DETAILING CRAFTSMANSHIP</h1>
                        <div>
                            <p className='text-justify'>From structural steel fabrication drawings to intricate steel connection designs, each project exemplifies our commitment to accuracy, quality, and innovation. Whether it's commercial buildings, industrial structures, or architectural marvels, our detailing work ensures strength, durability, and structural integrity. Explore our showcase to witness how we bring steel to life through meticulous detailing and craftsmanship. Trust us to elevate your projects with our unmatched expertise in steel detailing.</p>
                        </div>
                        <div className='detailing_crafts_check_out_btn mb-5'>
                            <a href="#" className="btn fw-bold">Check Out <img src={up_arrow} alt="up_arrow" className='img-fluid' /></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className='g-0'>
            <div className="container-fluid px-0">
            <div className="about-precision-steel-img position-relative">
                <img src={homeprecisionsteelimg} alt="about-precision-steel-img" className='img-fluid w-100' />
                <a href="#" className="btn position-absolute about-precision-steel-btn text-white">
                Get In Touch <img src={up_arrow_white} alt="up_arrow" className='img-fluid' />
                </a>
            </div>
            </div>
        </section>

        <section>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6 certified_text_div'>
                        <div className='certified_text_border'>
                            <h5 className='mb-3'><span className='fw-bold'>Certified </span>for Precision, <span className='fw-bold'>Trusted </span>for Excellence</h5>
                            <div className='mb-5'>
                                <p>
                                Modearch is proudly certified by AISD, NISD, and CISC, reflecting our commitment to precision, compliance, and industry-leading standards in steel detailing. These certifications ensure our expertise in delivering accurate, reliable, and high-quality detailing solutions that meet the highest structural and fabrication requirements. Backed by global standards, we guarantee excellence in every project we undertake
                                </p>
                            </div>
                            <div>
                                <img src={certified_img} alt="certified_img" className='img-fluid' />
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <img src={certifiedSideImg} alt="certifiedSideImg" className='img-fluid' />
                    </div>
                </div>
            </div>
        </section>
        
        <section className='numbers-section p-5'>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-md-6 text-content'>
                        <h2><strong>Modearch Steel</strong></h2>
                        <h3>Detailing in Numbers</h3>
                        <a href='#' className='btn button_align_left get-in-touch fw-bold'>Get In Touch <img src={up_arrow} alt="up_arrow" className='img-fluid' /></a>
                    </div>
                    <div className='col-md-6 stats-grid'>
                        <div className='row'>
                            <div className='col-6 stat-box number-section-border'>
                                <div className="stat-icon-text">
                                    <img src={employees} alt="Logo" className='img-fluid' />
                                    <h4>50+</h4>
                                </div>
                                <p>EMPLOYEES</p>
                            </div>
                            <div className='col-6 stat-box'>
                                <div className="stat-icon-text">
                                    <img src={coreServices} alt="Logo" className='img-fluid' />
                                    <h4>10+</h4>
                                </div>
                                <p>CORE SERVICE</p>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-6 stat-box number-section-border'>
                                <div className="stat-icon-text">
                                    <img src={project} alt="Logo" className='img-fluid' />
                                    <h4>5+</h4>
                                </div>
                                <p>PROJECT COMPLETED</p>
                            </div>
                            <div className='col-6 stat-box'>
                                <div className="stat-icon-text">
                                    <img src={client} alt="Logo" className='img-fluid' />
                                    <h4>23+</h4>
                                </div>
                                <p>SATISFIED CLIENT</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className='p-5'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-5 col-sm-12'>
                        <div>
                            <h4 className='fw-bold'>Stay Up to Date</h4>
                            <div>
                                <p>
                                    Visit our blog for the latest news on steel detailing, industry standards, and updates related to Modearch's services.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-7 col-sm-12'>
                        <div>
                            <h4 className='fw-bold'>Want to help shape the future of steel detailing?</h4>
                            <div>
                                <p>
                                    Modearch is looking for talented and motivated individuals to join our growing team
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <Footer/>
      
    </>
  )
}

export default Home
