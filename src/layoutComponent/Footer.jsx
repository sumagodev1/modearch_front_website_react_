import React from 'react'
import logo from './images/website-logo.png'
import footerimg from './images/footer/footer-img.png'
import '../pagesComponent/Careers.css'
import { FaFacebookF, FaYoutube, FaLinkedin } from 'react-icons/fa';
import './Footer.css'

const Footer = () => {
  return (
    <>

        <section className="footer py-5 text-white footer-section">
          <div className="container">
            <div className="row text-center text-md-start">
              
              {/* Contact Section */}
              <div className="col-md-4 col-lg-3 col-sm-6 mb-4 mt-4">
                <h5 className="fw-bold">CONTACT US</h5>
                {/* align-items-center */}
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-telephone-fill me-2"></i> 
                  <a href="tel:+1238142227" className="text-white text-decoration-none">+1 123-814-2227</a>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-envelope-fill me-2"></i> 
                  <a href="mailto:sales@amstrongltd.com" className="text-white text-decoration-none">sales@amstrongltd.com</a>
                </div>

                <div className="d-flex mb-3">
                  <i className="bi bi-geo-alt-fill me-2"></i> 
                  <span>05, B-11, Charkul, Sector-15, Kharghar, Navi Mumbai - 410210</span>
                </div>

                <div className="d-flex">
                  <i className="bi bi-geo-alt-fill me-2"></i> 
                  <span>8, The Green Suite A, Dover, Delaware</span>
                </div>
              </div>

              {/* Quick Links Section */}
              <div className="col-md-4 col-lg-3 col-sm-6 mb-4 mt-4">
                <h5 className="fw-bold">QUICK LINKS</h5>
                <div className="row">
                  <div className="col-6">
                    <ul className="list-unstyled quick-link-ul">
                      <li className="d-flex align-items-center"><i className="bi bi-chevron-right me-2"></i><a href="#" className="text-white text-decoration-none">Home</a></li>
                      <li className="d-flex align-items-center"><i className="bi bi-chevron-right me-2"></i><a href="#" className="text-white text-decoration-none">About Us</a></li>
                      <li className="d-flex align-items-center"><i className="bi bi-chevron-right me-2"></i><a href="#" className="text-white text-decoration-none">Services</a></li>
                      <li className="d-flex align-items-center text-nowrap"><i className="bi bi-chevron-right me-2"></i><a href="#" className="text-white text-decoration-none">Completed Project</a></li>
                      <li className="d-flex align-items-center"><i className="bi bi-chevron-right me-2"></i><a href="#" className="text-white text-decoration-none">Gallery</a></li>
                    </ul>
                  </div>

                  <div className="col-6">
                    <ul className="list-unstyled quick-link-ul">
                      <li className="d-flex align-items-center"><i className="bi bi-chevron-right me-2"></i><a href="#" className="text-white text-decoration-none">Blog</a></li>
                      <li className="d-flex align-items-center"><i className="bi bi-chevron-right me-2"></i><a href="#" className="text-white text-decoration-none">Careers</a></li>
                      <li className="d-flex align-items-center"><i className="bi bi-chevron-right me-2"></i><a href="#" className="text-white text-decoration-none">Contact</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Company Info and Social Media */}
              <div className="col-md-4 col-lg-4 col-sm-6">
                <div className="text-center text-md-start">
                  <div className='website-logo d-flex justify-content-center'>
                    <img src={logo} alt="Company Logo" className="mb-3 img-fluid" style={{ maxWidth: "120px" }} />
                  </div>
                  <p>A dynamic and innovative steel detailing company committed to delivering high-quality structural detailing services to the construction and engineering industries.</p>
                  
                  {/* Social Media Links */}
                  <h6 className="fw-bold mt-3 text-center">Follow Moderach</h6>
                  <div className='d-flex justify-content-center'>
                    <a href="#" className="text-dark me-2 d-inline-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: '25px', height: '25px', backgroundColor: '#fff' }}><FaFacebookF style={{ height: '0.8rem' }} /></a>
                    <a href="#" className="text-dark me-2 d-inline-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: '25px', height: '25px', backgroundColor: '#fff' }}><FaYoutube style={{ height: '0.8rem' }} /></a>
                    <a href="#" className="text-dark me-2 d-inline-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: '25px', height: '25px', backgroundColor: '#fff' }}><FaLinkedin style={{ height: '0.8rem' }} /></a>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-lg-2 col-sm-6">
                {/* <img src={footerimg} alt="Company Logo" className="mb-3 img-fluid" style={{ maxWidth: "120px" }} /> */}
              </div>
              
            </div>
          </div>
        </section>
      
    </>
  )
}

export default Footer
