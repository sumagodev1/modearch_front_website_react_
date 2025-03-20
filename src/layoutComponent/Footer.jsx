import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from './images/website-logo.png'
import footerimg from './images/footer/footer-img.png'
import '../pagesComponent/Careers.css'
import { FaFacebookF, FaLinkedin, FaEnvelope, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import './Footer.css'
import call from './images/footer/call.png'
import mail from './images/footer/mail.png'
import add1 from './images/footer/add1.png'
import add2 from './images/footer/add2.png'

const Footer = () => {

  const [contacts, setContacts] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch Contact Info
    axios
      .get("/header-contact/getheaderContacts")
      .then((response) => {
        if (response.data.result) {
          setContacts(response.data.responseData || []);
        } else {
          setError(response.data.message);
        }
      })
      .catch(() => setError("Failed to fetch contact info"));

    // Fetch Social Media Links
    axios
      .get("/social-contact/get-socialcontacts")
      .then((response) => {
        setSocialLinks(response.data.responseData[0] || {});
      })
      .catch((error) => {
        console.error("Error fetching social media links:", error);
      });
  }, []);

  const currentYear = new Date().getFullYear(); // Get current year dynamically

  return (
    <>

        <section className="footer footer-padding text-white footer-section">
          <div className="container">
            <div className="row text-center text-md-start">
              
              {/* Contact Section */}
              <div className="col-md-4 col-lg-3 col-sm-6 mb-4 mt-4">
                <h5 className="fw-bold">CONTACT US</h5>
                {/* align-items-center */}
                <div className="d-flex align-items-center mb-3">
                  {/* <i className="bi bi-telephone-fill me-2"></i>  */}
                  <img src={call} alt="call" className='img-fluid me-2' />
                  {/* <a href="tel:+1238142227" className="text-white text-decoration-none">+1 123-814-2227</a> */}
                  <a href={`tel:${contacts[0]?.phone1 || "213-814-2277"}`} className="text-white text-decoration-none" style={{ textDecoration: "none", color: "#000" }}>
                    {contacts[0]?.phone1 || "213-814-2277"}
                  </a>
                </div>

                <div className="d-flex align-items-center mb-3">
                  {/* <i className="bi bi-telephone-fill me-2"></i>  */}
                  <img src={call} alt="call" className='img-fluid me-2' />
                  {/* <a href="tel:+1238142227" className="text-white text-decoration-none">+1 123-814-2227</a> */}
                  <a href={`tel:${contacts[0]?.phone2 || "213-814-2277"}`} className="text-white text-decoration-none" style={{ textDecoration: "none", color: "#000" }}>
                    {contacts[0]?.phone2 || "213-814-2277"}
                  </a>
                </div>

                <div className="d-flex align-items-center mb-3">
                  {/* <i className="bi bi-envelope-fill me-2"></i>  */}
                  <img src={mail} alt="mail" className='img-fluid me-2' />
                  <a href={`mailto:${socialLinks.email || "sales@modearchsteel.com"}`} className="text-white text-decoration-none" style={{wordBreak: "break-word"}}>{socialLinks.email || "sales@modearchsteel.com"}</a>
                </div>

                <div className="d-flex mb-3">
                  {/* <i className="bi bi-geo-alt-fill me-2"></i>  */}
                  <img src={add1} alt="add1" className='img-fluid me-2' style={{height:"1.5rem"}} />
                  <span style={{textAlign:"left"}}>05, B-11, Charkul, Sector-15, Kharghar, Navi Mumbai - 410210</span>
                </div>

                <div className="d-flex">
                  {/* <i className="bi bi-geo-alt-fill me-2"></i>  */}
                  <img src={add2} alt="add2" className='img-fluid me-2' style={{height:"2rem"}} />
                  <span>8, The Green Suite A, Dover, Delaware</span>
                </div>
              </div>

              {/* Quick Links Section */}
              <div className="col-md-4 col-lg-3 col-sm-6 mb-4 mt-4">
                <h5 className="fw-bold">QUICK LINKS</h5>
                <div className="row">
                  <div className="col-6">
                    <ul className="list-unstyled quick-link-ul">
                      <li className="d-flex align-items-center"><i className="bi bi-chevron-right me-2"></i><a href="/" className="text-white text-decoration-none">Home</a></li>
                      <li className="d-flex align-items-center"><i className="bi bi-chevron-right me-2"></i><a href="/about" className="text-white text-decoration-none">About</a></li>
                      <li className="d-flex align-items-center"><i className="bi bi-chevron-right me-2"></i><a href="/service" className="text-white text-decoration-none">Services</a></li>
                      <li className="d-flex align-items-center text-nowrap"><i className="bi bi-chevron-right me-2"></i><a href="/completed_project" className="text-white text-decoration-none">Project</a></li>
                      
                    </ul>
                  </div>

                  <div className="col-6">
                    <ul className="list-unstyled quick-link-ul">
                    <li className="d-flex align-items-center"><i className="bi bi-chevron-right me-2"></i><a href="/gallery" className="text-white text-decoration-none">Gallery</a></li>
                      <li className="d-flex align-items-center"><i className="bi bi-chevron-right me-2"></i><a href="/blog" className="text-white text-decoration-none">Blog</a></li>
                      <li className="d-flex align-items-center"><i className="bi bi-chevron-right me-2"></i><a href="/careers" className="text-white text-decoration-none">Careers</a></li>
                      <li className="d-flex align-items-center"><i className="bi bi-chevron-right me-2"></i><a href="/contactUs" className="text-white text-decoration-none">Contact</a></li>
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
                  <p className='text-juatify'>A dynamic and innovative steel detailing company committed to delivering high-quality structural detailing services to the construction and engineering industries.</p>
                  
                  {/* Social Media Links */}
                  <h6 className="fw-bold mt-3 text-center">Follow Moderach</h6>
                  <div className='d-flex justify-content-center'>
                    <a href={socialLinks.facebook} className="text-dark me-2 d-inline-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: '25px', height: '25px', backgroundColor: '#fff' }} target="_blank" rel="noopener noreferrer"  ><FaFacebookF style={{ height: '0.8rem' }} /></a>
                    <a href={socialLinks.instagram} className="text-dark me-2 d-inline-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: '25px', height: '25px', backgroundColor: '#fff' }} target="_blank" rel="noopener noreferrer"  ><FaInstagram style={{ height: '0.8rem' }} /></a>
                    {socialLinks.email && (
                    <a href={socialLinks.email}  className="text-dark me-2 d-inline-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: '25px', height: '25px', backgroundColor: '#fff' }} target="_blank" rel="noopener noreferrer"  ><FaEnvelope style={{ height: '0.8rem' }} /></a>
                    )}
                    {socialLinks.whatsapp && (
                    <a href={`https://wa.me/${socialLinks.whatsapp.replace(/\D/g, "")}`} className="text-dark me-2 d-inline-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: '25px', height: '25px', backgroundColor: '#fff' }} target="_blank" rel="noopener noreferrer"  ><FaWhatsapp style={{ height: '0.8rem' }} /></a>
                    )}
                    <a href={socialLinks.linkedin}  className="text-dark me-2 d-inline-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: '25px', height: '25px', backgroundColor: '#fff' }} target="_blank" rel="noopener noreferrer"  ><FaLinkedin style={{ height: '0.8rem' }} /></a>
                  </div>
                </div>
              </div>

              <div className="col-md-2 col-lg-2 col-sm-6">
                {/* <img src={footerimg} alt="Company Logo" className="mb-3 img-fluid" style={{ maxWidth: "120px" }} /> */}
              </div>
              
            </div>

          </div>
          <div className="container-fluid">
            <div className="row text-center text-md-start">
              <div className="col-md-12 col-lg-12 col-sm-12 mt-5 text-center footer-copyright-section">
                © {currentYear} Copyright: <a href="https://sumagoinfotech.com" className="text-white" target="_blank" rel="noopener noreferrer">Made with Passion by Sumago Infotech</a>🤍
               {/* © {currentYear} Copyright : Made with Passion by Sumago Infotech 🤍 */}
              </div>
            </div>
          </div>
        </section>
      
    </>
  )
}

export default Footer
