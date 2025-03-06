import React from 'react'
import { Link } from "react-router-dom";
import up_arrow from './images/up-arrow.png'

const Service_Faq = () => {
  return (
    <>

        <section className=''>
            <div className='container py-3'>
                <div className="container">
                    <div className="row">
                        {/* Left Content */}
                        <div className="col-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center">
                            <div className='px-5'>
                            <h2 className="fw-bold mt-2">FAQ's</h2>
                            <p className="fw-semibold faq-title">Have questions about our steel detailing services?</p>
                            <p className="text-muted text-justify">
                                Explore our FAQs for quick answers on workflows, software expertise, and industry standards. For further assistance, reach out to us.
                            </p>
                            <Link
                                to="/contactUs"
                                className="text-decoration-none d-flex justify-content-start faq-contact-us-btn mb-1 contact_us_underline_animation"
                                onClick={() => setTimeout(() => window.location.hash = "#contact-form", 100)}
                                >
                                Contact Us{" "}
                                <img
                                    src={up_arrow}
                                    alt="Tekla Structures"
                                    className="expertise-logo"
                                />
                            </Link>
                            {/* <a href="#" className="d-flex justify-content-end faq-contact-us-btn mb-1">
                                Contact Us <img src={up_arrow} alt="up_arrow" className='img-fluid ms-1' />
                            </a> */}
                            </div>
                        </div>

                        {/* Right Content - Accordion */}
                        <div className="col-12 col-md-6 col-lg-6 mt-2">
                            <div className="accordion" id="faqAccordion">
                                {/* FAQ Item 1 */}
                                <div className="accordion-item mb-3 border-0 rounded">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button d-flex align-items-center custom-accordion-button" 
                                            type="button" data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="true">
                                            <span> What types of steel detailing services does Modearch Steel provide?</span>
                                        </button>
                                    </h2>
                                    <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            We offer <strong>structural steel detailing, connection design, miscellaneous steel detailing (stairs, railings, ladders, etc.), BIM & 3D modeling, material take-off & estimation, CNC & fabrication support, and quality control & compliance services.</strong>
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Item 2 */}
                                <div className="accordion-item mb-3 border-0 rounded">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed d-flex align-items-center custom-accordion-button" 
                                            type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                            <span> Do you follow international standards for steel detailing?</span>
                                        </button>
                                    </h2>
                                    <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Yes, we adhere to <strong>AISC, NISD, CISC, and OSHA</strong> standards to ensure compliance, accuracy, and safety in all our projects.
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Item 3 */}
                                <div className="accordion-item mb-3 border-0 rounded">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed d-flex align-items-center custom-accordion-button" 
                                            type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                            <span> Can you handle large-scale and complex projects?</span>
                                        </button>
                                    </h2>
                                    <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Absolutely! With <strong>10+ years of experience, 1,000+ projects completed, and 1,500+ tons of steel detailing per month,</strong> we have the capacity and expertise to manage large and complex projects efficiently.
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Item 4 */}
                                <div className="accordion-item border-0 rounded">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed d-flex align-items-center custom-accordion-button" 
                                            type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                                            <span> How does your BIM & 3D modeling service help in construction?</span>
                                        </button>
                                    </h2>
                                    <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Our <strong>BIM expertise enables clash detection, optimized project coordination, reduced errors, and seamless collaboration</strong> among stakeholders, ensuring fewer delays and efficient execution. 
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Item 5 */}
                                <div className="accordion-item mb-3 border-0 rounded">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed d-flex align-items-center custom-accordion-button" 
                                            type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
                                            <span> Can you work as per US and Canada time zones?</span>
                                        </button>
                                    </h2>
                                    <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Yes, we operate according to <strong>US and Canadian time zones,</strong> ensuring smooth communication and project execution for our international clients.
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      
    </>
  )
}

export default Service_Faq
