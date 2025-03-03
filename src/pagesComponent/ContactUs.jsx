import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios'; 
import Navbar from '../layoutComponent/Navbar';
import Footer from '../layoutComponent/Footer'
import Faq from './Faq';
import ReCAPTCHA from 'react-google-recaptcha';
import './ContactUs.css'
import contact_banner_img from './images/contact/contact-banner-img.jpg'
import reachus from './images/contact/reachus.png'
import call from './images/contact/call.png'
import location from './images/contact/location.png'
import mail from './images/contact/mail.png'
import connect from './images/contact/connect.png'
import up_arrow from './images/up-arrow.png'
import { FaFacebookF, FaInstagram, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ContactUs = () => {

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
      });
    
      const [errors, setErrors] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
        recaptcha: ''
      });
    
      const [recaptchaResponse, setRecaptchaResponse] = useState(null);
      const captchaRef = useRef();
    
      const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };
    
        // Name validation
        if (!formData.name) {
          newErrors.name = 'Please enter your name';
          valid = false;
        } else {
          newErrors.name = '';
        }
    
        // Phone validation
        const phoneRegex = /^[0-9]{10}$/;
        if (!formData.phone) {
          newErrors.phone = 'Please enter your phone number';
          valid = false;
        } else if (!phoneRegex.test(formData.phone)) {
          newErrors.phone = 'Please enter a valid 10-digit phone number';
          valid = false;
        } else {
          newErrors.phone = '';
        }
    
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
          newErrors.email = 'Please enter your email';
          valid = false;
        } else if (!emailRegex.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
          valid = false;
        } else {
          newErrors.email = '';
        }
    
        // Message validation
        if (!formData.message) {
          newErrors.message = 'Please enter a message';
          valid = false;
        } else {
          newErrors.message = '';
        }
    
        // ReCAPTCHA validation
        if (!recaptchaResponse) {
          newErrors.recaptcha = 'Please complete the ReCAPTCHA';
          valid = false;
        } else {
          newErrors.recaptcha = '';
        }
    
        setErrors(newErrors);
        return valid;
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;

        // Allow only alphabets and spaces in Name field
        if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) return;

        // Allow only numbers in Phone field
        if (name === "phone" && !/^\d*$/.test(value)) return;

        // Allow only valid email characters
        if (name === "email" && !/^[a-zA-Z0-9@.]*$/.test(value)) return;

        // Word limit for message field
        if (name === "message") {
          const words = value.trim().split(/\s+/);
          if (words.length > 300) return; // Restrict input if over 300 words
      }

        setFormData((prevState) => ({
          ...prevState,
          [name]: value
        }));
    
        // setErrors((prevState) => ({
        //   ...prevState,
        //   [name]: '' // Reset error message when user types
        // }));
      };
    
      const handleRecaptchaChange = (value) => {
        setRecaptchaResponse(value);  // Store CAPTCHA response
        setErrors((prevState) => ({
          ...prevState,
          recaptcha: '' // Reset ReCAPTCHA error when user solves it
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
          try {
            const response = await axios.post("/carousal-form/addcarousalform", {
              name: formData.name,
              mobile: formData.phone,
              email: formData.email,
              message: formData.message
            });
    
            console.log('Form submitted', response.data);
            // alert('Form submitted successfully!');
              // SweetAlert2 success message
              Swal.fire({
                title: 'Success!',
                text: 'Form submitted successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            
            // Reset form after submission
            setFormData({ name: '', phone: '', email: '', message: '' });
            setErrors({});
          } catch (error) {
            // let newErrors = {};
            
            // Handle API error for existing phone number or email
            // if (
            //   error.response?.data?.message === "Validation error: Phone number already exists."
            // ) {
            //   newErrors.phone = "Mobile number already exists.";
            //   alert("Mobile number already exists. Please enter a new one.");
            // } else if (
            //   error.response?.data?.message === "Validation error: Email already exists."
            // ) {
            //   newErrors.email = "Email already exists.";
            //   alert("Email already exists. Please enter a new one.");
            // } else {
            //   newErrors.general = "Failed to submit data. Please try again later.";
            //   alert("Failed to submit data. Please try again later.");
            // }
    
            console.error('Failed to submit form:', error);
            // alert("Failed to submit data. Please try again later.");

              // SweetAlert2 error message
              Swal.fire({
                title: 'Error!',
                text: 'Failed to submit data. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
          }
        }
    };    

    const [socialLinks, setSocialLinks] = useState({});

    useEffect(() => {
  
        axios
        .get("/social-contact/get-socialcontacts")
        .then((response) => {
          setSocialLinks(response.data.responseData[0] || {});
        })
        .catch((error) => {
          console.error("Error fetching social media links:", error);
        });
  
    }, []);

  return (
    <>

        <Helmet>
            <title>Contact Us - Contact to company</title>
            <meta name="description" content="Contact for a some need of steel or product" />
            <meta name="keywords" content="contact, contact us, contact modearch steel, send contact, send" />
        </Helmet>

        <Navbar />

        <section className='g-0'>
            <div className="container-fluid px-0">
                <div className="contact_banner_img">
                    <img src={contact_banner_img} alt="Logo" className='img-fluid' />
                </div>
            </div>
        </section>

        <section className="reach-us py-1 reach-us-bg-img">
            <div className="container">
                <div className="row align-items-center">
                {/* Left Column - Text Content */}
                <div className="col-md-6 text-center text-md-start">
                    <h2 className="fw-bold">WAYS TO REACH US</h2>
                        <p className="text-muted text-justify">
                        Ask a question, drop your queries, or want to schedule a meeting with us? Fill out the form below,
                        and a Modearch representative will contact you within 24 hours.
                        </p>
                        <div className="border-bottom-below-para mt-3"></div>

                    <div className="row mt-4 reach-us-contact-details">
                    <div className="col-12">
                        <div className="row reach-us-contact-details-row">
                        <div className="col-md-6 col-lg-6 col-sm-6 mb-5 text-center text-md-start d-flex align-items-center">
                            {/* <FaPhoneAlt className="icon me-2" /> */}
                            <img src={call} className="img-fluid icon me-2" alt="General Inquiries" style={{ maxHeight: '30px' }} /> 
                            <div>
                                <h5 className="fw-bold mb-0">CALL</h5>
                                <p className="text-muted mb-0">+1 213-814-2277</p>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-6 col-sm-6 mb-4 text-center text-md-start d-flex align-items-center">
                            {/* <FaMapMarkerAlt className="icon me-2" /> */}
                            <img src={location} className="img-fluid icon me-2 mb-6 location-icon" alt="General Inquiries" style={{ maxHeight: '30px' }} />
                            <div>
                                <h5 className="fw-bold mb-0">FIND US</h5>
                                <p className="text-muted mb-0">05, B-11, Gharkul, Sector-15, Kharghar, Navi Mumbai - 410210</p>
                            </div>
                        </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 col-lg-6 col-sm-6 mb-4 text-center text-md-start d-flex align-items-center">
                                {/* <FaEnvelope className="icon me-2" /> */}
                                <img src={mail} className="img-fluid icon me-2" alt="General Inquiries" style={{ maxHeight: '30px' }} />
                                <div>
                                    <h5 className="fw-bold mb-0">EMAIL ID</h5>
                                    <p className="text-muted mb-0" style={{ wordBreak: "break-word", maxWidth: "100%" }}>sales@armstrongtgal.com</p>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-6 col-sm-6 mb-4 text-center text-md-start d-flex align-items-center">
                                {/* <FaEnvelope className="icon me-2" /> */}
                                <img src={connect} className="img-fluid icon me-2 mb-4" alt="General Inquiries" style={{ maxHeight: '30px' }} />
                                <div>
                                    <h5 className="fw-bold mb-0 mt-3">CONNECT</h5>
                                    <div className="d-flex justify-content-center justify-content-md-start gap-1 mt-3">
                                        <a href={socialLinks.facebook} className="text-dark me-2 d-inline-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: '25px', height: '25px', backgroundColor: '#fff' }}><FaFacebookF style={{ height: '0.8rem' }} /></a>
                                        <a href={socialLinks.instagram} className="text-dark me-2 d-inline-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: '25px', height: '25px', backgroundColor: '#fff' }}><FaInstagram style={{ height: '0.8rem' }} /></a>
                                        {socialLinks.email && (
                                        <a href={`mailto:${socialLinks.email}`} className="text-dark me-2 d-inline-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: '25px', height: '25px', backgroundColor: '#fff' }}><FaEnvelope style={{ height: '0.8rem' }} /></a>
                                        )}
                                        {socialLinks.whatsapp && (
                                        <a href={`https://wa.me/${socialLinks.whatsapp.replace(/\D/g, "")}`} className="text-dark me-2 d-inline-flex align-items-center justify-content-center rounded-circle shadow" style={{ width: '25px', height: '25px', backgroundColor: '#fff' }}><FaWhatsapp style={{ height: '0.8rem' }} /></a>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    </div>
                </div>

                {/* Right Column - Image */}
                <div className="col-md-6 text-center">
                    <img src={reachus} alt="Contact Us" className="img-fluid" />
                </div>
                </div>
            </div>
        </section>

        <div className='container-fluid bg-dark black-color-div'>

        </div>

        <div className="container-fluid">
            <div className="container contact-bg contact-position">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6 ps-0">
                    <div className="bg-white p-4 contact-form-rounded shadow-sm">
                        <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            onKeyPress={(e) => {
                              if (!/^[a-zA-Z\s]+$/.test(e.key)) e.preventDefault();
                          }}
                            />
                            {errors.name && <small className="text-danger">{errors.name}</small>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input
                            type="tel"
                            name="phone"
                            className="form-control"
                            placeholder="Your Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            maxLength="10"
                            onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) e.preventDefault();
                            }}
                            />
                            {errors.phone && <small className="text-danger">{errors.phone}</small>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="xyz.abc@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            onKeyPress={(e) => {
                              if (!/^[a-zA-Z0-9@.]*$/.test(e.key)) e.preventDefault();
                          }}
                            />
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Message</label>
                            <textarea
                            name="message"
                            className="form-control"
                            rows="3"
                            placeholder="What can we help you with?"
                            value={formData.message}
                            onChange={handleChange}
                            />
                            <div className="text-end">
                              <small>{formData.message.trim().split(/\s+/).filter(Boolean).length}/300</small>
                            </div>
                            {errors.message && <small className="text-danger">{errors.message}</small>}
                        </div>

                        <div className="mb-3 d-flex align-items-center justify-content-between flex-column flex-md-row">
                            <div className="me-3">
                                <ReCAPTCHA
                                ref={captchaRef}
                                // sitekey="6Le657EpAAAAADHl0EnUi-58y19XOcORV9dehjAz"
                                sitekey="6Lc7EOEqAAAAAKU4rKmaZVNBihgNpj0wrllf-EGq"
                                secretkey="6Lc7EOEqAAAAAEyrHgdGXHyxdd5pAedSzss0-5cl"
                                onChange={handleRecaptchaChange}  // Handle ReCAPTCHA response change
                                />
                                {errors.recaptcha && <small className="text-danger">{errors.recaptcha}</small>}
                            </div>

                            {/* <button type="submit" className="btn btn-dark">Submit →</button> */}
                            <button type="submit" className="submit-button">
                                Submit <img src={up_arrow} alt="up_arrow" className='img-fluid' />
                            </button>
                        </div>
                        </form>
                    </div>
                    </div>

                    <div className="col-md-6 d-none d-md-block">
                    {/* <img src={logo} className="img-fluid rounded" alt="General Inquiries" /> */}
                    </div>
                </div>
            </div>
        </div>

      <section className='faq-bg-img mb-5'>
        <Faq/>
      </section>
        

        <Footer/>
      
    </>
  )
}

export default ContactUs
