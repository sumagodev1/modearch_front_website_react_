import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../layoutComponent/Navbar';
import Footer from '../layoutComponent/Footer';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import careers_banner_img from './images/careers/careers_banner_img.png'
import precision from './images/careers/precision.png'
import globle from './images/careers/globle.png'
import work from './images/careers/work.png'
import careers from './images/careers/careers.png'
import './Careers.css'

const Careers = () => {
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
  

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    // if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!formData.mobile.trim()) {
        newErrors.mobile = 'Mobile number is required';
      } else if (!/^[9876][0-9]{9}$/.test(formData.mobile)) {
        newErrors.mobile = 'Mobile number must start with 9, 8, 7, or 6 and must be 10 digits long';
    }

    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.cv) newErrors.cv = 'Upload CV file is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!recaptchaResponse) newErrors.recaptcha = 'Please complete the CAPTCHA';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
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
        alert('Form submitted successfully!');
        setFormData({ name: '', email: '', mobile: '', subject: '', cv: null, message: '' });
        setErrors({});
      } catch (error) {
        let newErrors = {};
  
        if (
          error.response?.data?.message ===
          "Validation error: Phone number already exists."
        ) {
          newErrors.mobile = "Mobile number already exists.";
          alert("Mobile number already exists.");
        } else if (
          error.response?.data?.message ===
          "Validation error: Email already exists."
        ) {
          newErrors.email = "Email already exists.";
          alert("Email already exists.");
        } else {
          newErrors.general = "Failed to submit data. Please try again later.";
          alert("Failed to submit data. Please try again later.");
        }
  
        setErrors(newErrors);
      }
    }
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaResponse(value);  // Store CAPTCHA response
  };

  return (
    <>
        <Helmet>
            <title>careers - Upload Your CV</title>
            <meta name="description" content="Apply for a job by uploading your CV" />
            <meta name="keywords" content="career, jobs, CV, resume, apply" />
        </Helmet>
        
        <Navbar />

        <section className='g-0'>
            <div className="container-fluid">
                <div className="careers_banner_img">
                    <img src={careers_banner_img} alt="Logo" className='img-fluid' />
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
                  <h2 className="fw-bold mb-3">PRECISION WITH AGILITY</h2>
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
                  <h2 className="fw-bold mb-3">A GLOBAL PERSPECTIVE</h2>
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
                  <h2 className="fw-bold mb-3">WORK THAT MATTERS</h2>
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
                  <h2 className="fw-bold mb-3">CAREER GROWTH & LEARNING</h2>
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
              
              <div className="card p-4 mx-auto career-form-shadow" style={{ backgroundColor: '#f8f8f8', top:'-2rem' }}>
              <h4 className="text-center mb-4">UPLOAD YOUR CV</h4>

              <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                  <div className="col-md-6">
                  <label class="form-label">Name</label>
                      <input type="text" name="name" className="form-control" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
                      {errors.name && <small className="text-danger">{errors.name}</small>}
                  </div>
                  <div className="col-md-6">
                      <label class="form-label">Email Id</label>
                      <input type="email" name="email" className="form-control" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                      {errors.email && <small className="text-danger">{errors.email}</small>}
                  </div>
                  </div>

                  <div className="row mb-3">
                  <div className="col-md-6">
                      <label class="form-label">Mobile No.</label>
                      <input type="text" name="mobile" className="form-control" placeholder="Enter your mobile no." value={formData.mobile} onChange={handleChange} minLength="10" maxLength="10" />
                      {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
                  </div>
                  <div className="col-md-6">
                      <label class="form-label">Subject</label>
                      <input type="text" name="subject" className="form-control" placeholder="Enter your subject" value={formData.subject} onChange={handleChange} />
                      {errors.subject && <small className="text-danger">{errors.subject}</small>}
                  </div>
                  </div>

                  <div className="mb-3">
                      <label class="form-label">Upload CV <span class=" text-danger" style={{ fontSize: '13px' }}>(validation file size should be less than 1MB and PDF only)</span></label>
                      <div className="mb-3 d-flex justify-content-between align-items-center border p-1">
                      <span>{formData.cv ? formData.cv.name : 'No file chosen'}</span>
                      <label className="btn btn-dark text-white ms-3" style={{ padding: '0.3rem .7rem', fontSize: '.8rem' }}>Choose File
                          <input type="file" accept=".pdf" name="cv" className="d-none" onChange={handleChange} />
                      </label>
                      </div>
                      {errors.cv && <small className="text-danger d-block">{errors.cv}</small>}
                  </div>

                  <div className="mb-3">
                      <label class="form-label">Message</label>
                  <textarea name="message" className="form-control" rows="4" placeholder="Enter your message" value={formData.message} onChange={handleChange}></textarea>
                  {errors.message && <small className="text-danger">{errors.message}</small>}
                  </div>

                    {/* mb-3 d-flex align-items-center justify-content-between  */}
                  <div className="d-flex align-items-center justify-content-between flex-column flex-md-row">
                    <div className="mb-3">
                    <ReCAPTCHA
                        ref={captchaRef}
                        sitekey="6Le657EpAAAAADHl0EnUi-58y19XOcORV9dehjAz"
                        onChange={handleRecaptchaChange}  // Handle ReCAPTCHA response change

                            // positive.ae
                            // sitekey="6LdscT8qAAAAAPbFHPpVbW3vesSLNAIEqdZuB8Dq"
                            // sitekey={captchaKey}
                            // onChange={onChange}

                    />
                    {errors.recaptcha && <small className="text-danger">{errors.recaptcha}</small>}
                    </div>

                    <div className="text-center">
                      <button type="submit" className="submit-button">
                          Submit <span className="arrow">↗</span>
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
