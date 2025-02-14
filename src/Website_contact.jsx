import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios'; 
import logo from './image.png';
import Navbar from './layoutComponent/Navbar';
import ReCAPTCHA from 'react-google-recaptcha';
import './WebsiteContact.css'

const WebsiteContact = () => {
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
        alert('Form submitted successfully!');
        
        // Reset form after submission
        setFormData({ name: '', phone: '', email: '', message: '' });
        setErrors({});
      } catch (error) {
        let newErrors = {};
        
        // Handle API error for existing phone number or email
        if (
          error.response?.data?.message === "Validation error: Phone number already exists."
        ) {
          newErrors.phone = "Mobile number already exists.";
          alert("Mobile number already exists. Please enter a new one.");
        } else if (
          error.response?.data?.message === "Validation error: Email already exists."
        ) {
          newErrors.email = "Email already exists.";
          alert("Email already exists. Please enter a new one.");
        } else {
          newErrors.general = "Failed to submit data. Please try again later.";
          alert("Failed to submit data. Please try again later.");
        }

        setErrors(newErrors);
      }
    }
  };

  return (
    <>
        <Helmet>
            <title>Contact Us - Contact to company</title>
            <meta name="description" content="Contact for a some need of steel or product" />
            <meta name="keywords" content="contact, contact us, contact modearch steel, send contact, send" />
        </Helmet>

        <Navbar />

      <div className="container-fluid bg-light py-5">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6">
              <div className="bg-white p-4 rounded shadow-sm">
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
                    {errors.message && <small className="text-danger">{errors.message}</small>}
                  </div>

                  <div className="mb-3 d-flex align-items-center">
                    <div className="me-3">
                        <ReCAPTCHA
                        ref={captchaRef}
                        sitekey="6Le657EpAAAAADHl0EnUi-58y19XOcORV9dehjAz"
                        onChange={handleRecaptchaChange}  // Handle ReCAPTCHA response change
                        />
                        {errors.recaptcha && <small className="text-danger">{errors.recaptcha}</small>}
                    </div>

                    {/* <button type="submit" className="btn btn-dark">Submit →</button> */}
                    <button type="submit" className="submit-button">
                        Submit <span className="arrow">↗</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-md-6 d-none d-md-block">
              <img src={logo} className="img-fluid rounded" alt="General Inquiries" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebsiteContact;
