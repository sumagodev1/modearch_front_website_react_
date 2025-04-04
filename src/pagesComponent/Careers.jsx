import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../layoutComponent/Navbar';
import Footer from '../layoutComponent/Footer';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
// import careers_banner_img from './images/careers/careers_banner_img.png'
import careers_bannerimgDesktop  from "./images/careers/careers_banner_img.webp";
import careers_bannerimgMobile from "./images/careers/careers_bannerimgMobile.webp";
import precision from './images/careers/precision.png'
import globle from './images/careers/globle.png'
import work from './images/careers/work.png'
import careers from './images/careers/careers.png'
import up_arrow from './images/up-arrow.svg'
import './Careers.css'
import Swal from 'sweetalert2';

const Careers = () => {

  const [imageSrc, setImageSrc] = useState(careers_bannerimgDesktop);

  // Function to update image based on screen size
  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth < 768) {
        setImageSrc(careers_bannerimgMobile); // Mobile image
      } else {
        setImageSrc(careers_bannerimgDesktop); // Desktop image
      }
    };

    updateImage(); // Set initial image
    window.addEventListener("resize", updateImage); // Listen for resize events

    return () => window.removeEventListener("resize", updateImage); // Cleanup event listener
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    cv: null,
    message: '',
  });
  
  const [errors, setErrors] = useState({});

  const [recaptchaResponse, setRecaptchaResponse] = useState(null);
  const captchaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

        // Allow only alphabets and spaces in Name field
        if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) return;

        // Allow only numbers in mobile field
        // if (name === "mobile" && !/^\d*$/.test(value)) return;
        if (name === "mobile" && !/^[\d+]*$/.test(value)) return;
    
        // Allow only valid email characters
        if (name === "email" && !/^[a-zA-Z0-9@.]*$/.test(value)) return;

        // Word limit for message field
        if (name === "message") {
          const words = value.trim().split(/\s+/);
          if (words.length > 300) return; // Restrict input if over 300 words
        }

    if (type === 'file') {
        const file = files[0];
    
        if (file) {
          // Validate file type (PDF)
          if (file.type !== 'application/pdf') {
            setErrors((prev) => ({
              ...prev,
              cv: 'Please upload a valid PDF file',
            }));
            return;
          }
    
          // Validate file size (< 1MB)
          if (file.size > 1 * 1024 * 1024) { // 1MB
            setErrors((prev) => ({
              ...prev,
              cv: 'File size should be less than 1MB',
            }));
            return;
          }
    
          // If file is valid, clear the error
          setErrors((prev) => ({
            ...prev,
            cv: undefined,
          }));
        }
    }
  
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value
    }));
  
    // Remove error when user starts typing or selects a file
    // setErrors((prevErrors) => ({
    //   ...prevErrors,
    //   [name]: undefined
    // }));
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[0-9]*$/; // Allows only numbers and '+'
  
    if (!phoneRegex.test(phone)) return false; // Only numbers and '+' are allowed
  
    if (phone.startsWith("+91")) {
      // Indian number validation: after '+91', check if the number starts with 9, 8, 7, or 6
      const indianNumber = phone.slice(3); // Remove '+91'
      if (/^[6789]\d{9}$/.test(indianNumber)) return true;  // Number should start with 6, 7, 8, or 9 and be 10 digits long
      return false; // If it doesn't match, return false
    } else if (phone.startsWith("+1")) {
      // US number validation
      const usNumber = phone.slice(2); // Remove '+1'
      if (/^\d{10}$/.test(usNumber)) return true;  // US number must be exactly 10 digits
    }
  
    return false;  // If the phone doesn't start with '+91' or '+1'
  };
  
  

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    // if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    // if (!formData.mobile.trim()) {
    //     newErrors.mobile = 'Mobile number is required';
    //   } else if (!/^[9876][0-9]{9}$/.test(formData.mobile)) {
    //     newErrors.mobile = 'Mobile number must start with 9, 8, 7, or 6 and must be 10 digits long';
    // }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!validatePhone(formData.mobile)) {
      newErrors.mobile = 'Indian Mobile number must start with 9, 8, 7, or 6 and must be 10 digits after +91 (Indian number) or a valid US number (+1)';
    }

    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.cv) newErrors.cv = 'Upload CV file is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!recaptchaResponse) newErrors.recaptcha = 'Please complete the CAPTCHA';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true); // Start loader
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.mobile);
        formDataToSend.append('subject', formData.subject);
        formDataToSend.append('message', formData.message);
        
        if (formData.cv) {
          formDataToSend.append('cv', formData.cv); 
        }
        console.log('vc',formDataToSend);
  
        const response = await axios.post("uploadcv/create-uploadcv", formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        });
  
        console.log('Form submitted', response.data);
        // alert('Form submitted successfully!');
          // SweetAlert2 success message
          Swal.fire({
            title: 'Success!',
            text: 'Thank you! We will contact you soon.',
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'custom-confirm-button' // Apply a custom class for styling
          }
        });

        setFormData({ name: '', email: '', mobile: '', subject: '', cv: null, message: '' });
        setErrors({});
      } catch (error) {
        // let newErrors = {};
  
        // if (
        //   error.response?.data?.message ===
        //   "Validation error: Phone number already exists."
        // ) {
        //   newErrors.mobile = "Mobile number already exists.";
        //   alert("Mobile number already exists.");
        // } else if (
        //   error.response?.data?.message ===
        //   "Validation error: Email already exists."
        // ) {
        //   newErrors.email = "Email already exists.";
        //   alert("Email already exists.");
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
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'custom-confirm-button' // Apply a custom class for styling
            }
          });
          } finally {
                setLoading(false); // Stop loader
          }
    }
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaResponse(value);  // Store CAPTCHA response
  };

  return (
    <>
    <Helmet>
      <title>Careers at ModeArch Steel | Join Our Team | Steel Detailing Experts</title>
      <meta name="description" content="Explore exciting career opportunities at ModeArch Steel. Join our growing team of steel detailing experts and contribute to innovative projects in the structural steel industry." />
      <meta name="keywords" content="careers at ModeArch Steel, steel detailing jobs, BIM modeling careers, connection design jobs, engineering jobs, structural steel, join our team, construction industry careers" />
      <meta name="author" content="ModeArch Steel" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content="Careers at ModeArch Steel | Join Our Team | Steel Detailing Experts" />
      <meta property="og:description" content="Explore exciting career opportunities at ModeArch Steel. Join our growing team of steel detailing experts and contribute to innovative projects in the structural steel industry." />
      <meta property="og:image" content="https://staging-v2.modearchsteel.com/static/media/careers_banner_img.e01b1b19c22c885ea69a.png" /> 
      <meta property="og:url" content="https://staging-v2.modearchsteel.com/careers" />
      <meta property="og:type" content="website" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Careers at ModeArch Steel | Join Our Team | Steel Detailing Experts" />
      <meta name="twitter:description" content="Explore exciting career opportunities at ModeArch Steel. Join our growing team of steel detailing experts and contribute to innovative projects in the structural steel industry." />
      <meta name="twitter:image" content="https://staging-v2.modearchsteel.com/static/media/careers_banner_img.e01b1b19c22c885ea69a.png" /> 
      <meta name="twitter:site" content="@YourTwitterHandle" />
      <meta name="twitter:creator" content="@YourTwitterHandle" />
    </Helmet>
        
        <Navbar />

        <section className='g-0'>
            <div className="container-fluid px-0">
                <div className="careers_banner_img">
                    <img src={imageSrc} alt="Logo" className='img-fluid' />
                </div>
            </div>
        </section>

        <section className="core-values-section text-white py-5">
          <div className="container">
            <div className="row g-4">
              {/* Precision with Agility */}
              <div className="col-md-6 d-flex align-items-start pe-5">
                <img src={precision} alt="Logo" className='fs-2 me-2 img-fluid core-values-section-img' />
                <div>
                  <h3 className="fw-bold mb-3 career-title">PRECISION WITH AGILITY</h3>
                  <p className='core-values-section-para'>
                    We may be a compact team, but our expertise and technology enable
                    us to deliver big results. Our focus on efficiency, creativity,
                    and flexibility ensures every project is executed with excellence.
                  </p>
                </div>
              </div>

              {/* A Global Perspective */}
              <div className="col-md-6 d-flex align-items-start pe-5">
                <img src={globle} alt="Logo" className='fs-2 me-2 img-fluid core-values-section-img' />
                <div>
                  <h3 className="fw-bold mb-3 career-title">A GLOBAL PERSPECTIVE</h3>
                  <p className='core-values-section-para'>
                    With a diverse team and international collaborations, we bring
                    together expertise from around the world to deliver top-tier steel
                    detailing solutions.
                  </p>
                </div>
              </div>

              {/* Work That Matters */}
              <div className="col-md-6 d-flex align-items-start pe-5">
                <img src={work} alt="Logo" className='fs-2 me-2 img-fluid core-values-section-img' />
                <div>
                  <h3 className="fw-bold mb-3 career-title">WORK THAT MATTERS</h3>
                  <p className='core-values-section-para'>
                    At Moderach Steel, every detail counts. We take pride in crafting
                    solutions that optimize fabrication, enhance efficiency, and bring
                    designs to life with precision.
                  </p>
                </div>
              </div>

              {/* Career Growth & Learning */}
              <div className="col-md-6 d-flex align-items-start pe-5">
                <img src={careers} alt="Logo" className='fs-2 me-2 img-fluid core-values-section-img' />
                <div>
                  <h3 className="fw-bold mb-3 career-title">CAREER GROWTH & LEARNING</h3>
                  <p className='core-values-section-para'>
                    We empower our team to grow—whether it's mastering new skills,
                    taking on new challenges, or exploring innovative projects that
                    push boundaries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container-fluid mt-3 join-our-team-title">
          <h2 className="text-center fw-bold">JOIN OUR TEAM</h2>
        </div>

        <section className='careers-form-section mb-4'>
          <div className="container mt-5">
              
              <div className="card p-4 mx-auto career-form-shadow" style={{ backgroundColor: '#D3D3D3', top:'-2rem', border:'1px solid #D3D3D3' }}>
              <h4 className="mb-4">UPLOAD YOUR CV</h4>

              <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                  <div className="col-md-6">
                  <label class="form-label fw-bold mb-0">Name <span className='text-danger'>*</span></label>
                      <input type="text" name="name" className="form-control" placeholder="Enter your name" value={formData.name} onChange={handleChange} onKeyPress={(e) => {if (!/^[a-zA-Z\s]+$/.test(e.key)) e.preventDefault(); }}/>
                      {errors.name && <small className="text-danger">{errors.name}</small>}
                  </div>
                  <div className="col-md-6">
                      <label class="form-label fw-bold mb-0">Email Id <span className='text-danger'>*</span></label>
                      <input type="email" name="email" className="form-control" placeholder="Enter your email" value={formData.email} onChange={handleChange} onKeyPress={(e) => {if (!/^[a-zA-Z0-9@.]*$/.test(e.key)) e.preventDefault();}} />
                      {errors.email && <small className="text-danger">{errors.email}</small>}
                  </div>
                  </div>

                  <div className="row mb-3">
                  <div className="col-md-6">
                      <label class="form-label fw-bold mb-0">Enter mobile number with country code. <span className='text-danger'>*</span></label>
                      <input type="text" name="mobile" className="form-control" placeholder="Enter your mobile no." value={formData.mobile} onChange={handleChange} minLength="13" maxLength="13" onKeyPress={(e) => { if (!/[0-9+]/.test(e.key)) e.preventDefault(); }} />
                      {/* onKeyPress={(e) => {if (!/[0-9]/.test(e.key)) e.preventDefault();}} */}
                      <p className='mt-2'>(e.g., +91XXXXXXXXXX for India, +1XXXXXXXXXX for USA)</p>
                      {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
                  </div>
                  <div className="col-md-6">
                      <label class="form-label fw-bold mb-0">Subject <span className='text-danger'>*</span></label>
                      <input type="text" name="subject" className="form-control" placeholder="Enter your subject" value={formData.subject} onChange={handleChange} />
                      {errors.subject && <small className="text-danger">{errors.subject}</small>}
                  </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold mb-0">
                        Upload CV <span className='text-danger'>*</span> <span className="text-danger" style={{ fontSize: '13px' }}>(size should be less than 1MB and PDF only)</span>
                    </label>
                    <div 
                        className="mb-3 d-flex justify-content-between align-items-center border" 
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '0.4rem',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <span 
                            className='ms-2 text-truncate' 
                            style={{
                                display: 'block',
                                width: '70%',  // Adjust width as per your layout
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {formData.cv ? formData.cv.name : 'No file chosen'}
                        </span>
                        <label 
                            className="btn btn-dark text-white ms-3" 
                            style={{ 
                                padding: '0.3rem .8rem', 
                                fontSize: '.9rem', 
                                flexShrink: 0
                            }}
                        >
                            Choose File
                            <input type="file" accept=".pdf" name="cv" className="d-none" onChange={handleChange} />
                        </label>
                    </div>
                    {errors.cv && <small className="text-danger d-block">{errors.cv}</small>}
                  </div>

                  <div className="mb-3">
                      <label class="form-label fw-bold mb-0">Message <span className='text-danger'>*</span></label>
                  <textarea name="message" className="form-control" rows="4" placeholder="Enter your message" value={formData.message} onChange={handleChange}></textarea>
                  <div className="text-end">
                    <small>{formData.message.trim().split(/\s+/).filter(Boolean).length}/300</small>
                  </div>
                  {errors.message && <small className="text-danger">{errors.message}</small>}
                  </div>

                    {/* mb-3 d-flex align-items-center justify-content-between  */}
                  <div className="d-flex align-items-center justify-content-between flex-column flex-md-row">
                    <div className="mb-3">
                    <ReCAPTCHA
                        ref={captchaRef}
                        // sitekey="6Le657EpAAAAADHl0EnUi-58y19XOcORV9dehjAz"

                        // sitekey="6LcvPesqAAAAADOOYwjQlAP7YuXckifnTPJ9rvVS"
                        // secretkey="6LcvPesqAAAAAEasHj8-Rc9jAH8znHjyfD_6dgAO"
                        // sitekey = "6LckIvEqAAAAAPdy1kCNcZ-VEnwUf6zcJAw1zjK8"
                        // secretkey = "6LckIvEqAAAAAJokDpuRBhmJLdCAz2Y3wHkjQhuU"

                        // sitekey = "6LeAZfoqAAAAAMc5CwBV3EdVbedy9IhxloDVUFNm"
                        // sumagdemo
                        sitekey = "6Lee9gkrAAAAACIG8szun_Hc6Jbn--2D_Cm79cqj"

                        onChange={handleRecaptchaChange}  // Handle ReCAPTCHA response change

                            // positive.ae
                            // sitekey="6LdscT8qAAAAAPbFHPpVbW3vesSLNAIEqdZuB8Dq"
                            // sitekey={captchaKey}
                            // onChange={onChange}

                    />
                    {errors.recaptcha && <small className="text-danger">{errors.recaptcha}</small>}
                    </div>

                    <div className="text-center">
                      {/* <button type="submit" className="submit-button submit_btn_underline_animation">
                          Submit <img src={up_arrow} alt="up_arrow" className='img-fluid' />
                      </button> */}
                      <button type="submit" className="submit-button submit_btn_underline_animation" disabled={loading}>
                          {loading ? (
                              <span>
                                  <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                                  Submitting...
                              </span>
                          ) : (
                              <>
                                  Submit <img src={up_arrow} alt="up_arrow" className='img-fluid' />
                              </>
                          )}
                      </button>
                    </div>
                  </div>

                  {/* <div className="text-center">
                  <button type="submit" className="btn btn-dark px-4">Send</button>
                  </div> */}
              </form>
              </div>
          </div>
        </section>

        <Footer/>


    </>
  );
};

export default Careers;
