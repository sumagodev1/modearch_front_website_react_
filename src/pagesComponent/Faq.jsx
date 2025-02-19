import React from 'react'
import up_arrow from './images/up-arrow.png'

const Faq = () => {
  return (
    <>

        <section className='faq-bg-img mb-5'>
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
                            <a href="#" className="d-flex justify-content-end faq-contact-us-btn mb-1">
                                Contact Us <img src={up_arrow} alt="up_arrow" className='img-fluid ms-1' />
                            </a>
                            </div>
                        </div>

                        {/* Right Content - Accordion */}
                        <div className="col-12 col-md-6 col-lg-6 mt-2">
                            <div className="accordion" id="faqAccordion">
                                {/* FAQ Item 1 */}
                                <div className="accordion-item mb-3 border-0 rounded">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed d-flex align-items-center" 
                                            type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                            <span> Lorem Ipsum is simply dummy text of the printing?</span>
                                        </button>
                                    </h2>
                                    <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Item 2 */}
                                <div className="accordion-item mb-3 border-0 rounded">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed d-flex align-items-center" 
                                            type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                            <span> Lorem Ipsum is simply dummy text of the printing?</span>
                                        </button>
                                    </h2>
                                    <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Item 3 */}
                                <div className="accordion-item mb-3 border-0 rounded">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed d-flex align-items-center" 
                                            type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                            <span> Lorem Ipsum is simply dummy text of the printing?</span>
                                        </button>
                                    </h2>
                                    <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Item 4 */}
                                <div className="accordion-item border-0 rounded">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed d-flex align-items-center" 
                                            type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                                            <span> Lorem Ipsum is simply dummy text of the printing?</span>
                                        </button>
                                    </h2>
                                    <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
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
