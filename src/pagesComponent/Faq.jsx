import React from 'react'
import { Link } from "react-router-dom";
import up_arrow from './images/up-arrow.png'

const Faq = () => {
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
                                            <span> When was Modearch Steel incorporated?</span>
                                        </button>
                                    </h2>
                                    <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Modearch Steel was founded in <strong>2017</strong> and has grown into a global leader in steel detailing, serving clients across multiple countries. 
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Item 2 */}
                                <div className="accordion-item mb-3 border-0 rounded">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed d-flex align-items-center custom-accordion-button" 
                                            type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                            <span> Where are your offices located?</span>
                                        </button>
                                    </h2>
                                    <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            We have offices in:
                                            <ul style={{ listStyleType: "lower-alpha"}}>
                                                <li><strong>Dover, Delaware, USA</strong></li>
                                                <li><strong>Navi Mumbai, India</strong></li>
                                                <li><strong>Nashik, India</strong></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Item 3 */}
                                <div className="accordion-item mb-3 border-0 rounded">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed d-flex align-items-center custom-accordion-button" 
                                            type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                            <span> What is your typical project turnaround time?</span>
                                        </button>
                                    </h2>
                                    <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Turnaround time depends on the <strong>size and complexity</strong> of the project. Small projects take <strong>1-2 weeks,</strong> while larger projects take <strong>4-8 weeks</strong>. 
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Item 4 */}
                                <div className="accordion-item mb-3 border-0 rounded">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed d-flex align-items-center custom-accordion-button" 
                                            type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                                            <span> How can I start a project with Modearch Steel?</span>
                                        </button>
                                    </h2>
                                    <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            You can get started by:
                                            <ul style={{ listStyleType: "lower-alpha"}}>
                                                <li><strong>Requesting a quote </strong>via our website</li>
                                                <li><strong><a href="mailto:Sales@modearchsteel.com" className="text-decoration-none" style={{ color: "black" }}>
                                                    Emailing us at Sales@modearchsteel.com</a> </strong>
                                                </li>
                                                <li><strong>
                                                    <a href="tel:+12138142277" className="text-decoration-none" style={{ color: "black" }}>
                                                        Calling us at (+1 213-814-2277)
                                                    </a> 
                                                    or 
                                                    <a href="tel:+918280044568" className="text-decoration-none" style={{ color: "black" }}>
                                                        (+91 8280044568)
                                                    </a>
                                                    </strong>
                                                </li>
                                                <li><strong>Filling out the contact form on our website</strong></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Item 5 */}
                                <div className="accordion-item mb-3 border-0 rounded">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed d-flex align-items-center custom-accordion-button" 
                                            type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
                                            <span> Do you provide real-time project tracking or status updates?</span>
                                        </button>
                                    </h2>
                                    <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                        Yes, we offer <strong>regular progress updates</strong> and maintain open communication with clients throughout the project lifecycle.
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

export default Faq
