import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    cv: null,
    message: '',
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
  
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
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.cv) newErrors.cv = 'Upload CV file is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
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

  return (
    <>
      <Helmet>
        <title>Careers - Upload Your CV</title>
        <meta name="description" content="Apply for a job by uploading your CV" />
        <meta name="keywords" content="career, jobs, CV, resume, apply" />
      </Helmet>
      
      <Navbar />

      <div className="container mt-5">
        <h2 className="text-center fw-bold">Careers</h2>
        
        <div className="card p-4 mx-auto shadow-lg" style={{ maxWidth: '700px', backgroundColor: '#f8f8f8' }}>
          <h4 className="text-center mb-4">UPLOAD YOUR CV</h4>

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <input type="text" name="name" className="form-control" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </div>
              <div className="col-md-6">
                <input type="email" name="email" className="form-control" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <input type="text" name="mobile" className="form-control" placeholder="Enter your mobile no." value={formData.mobile} onChange={handleChange} />
                {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
              </div>
              <div className="col-md-6">
                <input type="text" name="subject" className="form-control" placeholder="Enter your subject" value={formData.subject} onChange={handleChange} />
                {errors.subject && <small className="text-danger">{errors.subject}</small>}
              </div>
            </div>

            <div className="mb-3 d-flex justify-content-between align-items-center border p-2">
                <span>{formData.cv ? formData.cv.name : 'No file chosen'}</span>
                <label className="btn btn-dark text-white ms-3">Choose File
                    <input type="file" accept=".pdf" name="cv" className="d-none" onChange={handleChange} />
                </label>
                {errors.cv && <small className="text-danger d-block">{errors.cv}</small>}
            </div>

            <div className="mb-3">
              <textarea name="message" className="form-control" rows="4" placeholder="Enter your message" value={formData.message} onChange={handleChange}></textarea>
              {errors.message && <small className="text-danger">{errors.message}</small>}
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-dark px-4">Send</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
