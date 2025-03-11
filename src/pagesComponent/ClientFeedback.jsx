import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import "./Home.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const PrevArrow = ({ onClick, currentSlide }) => (
  <button
    onClick={onClick}
    className="slick-next"
    style={{
      position: "absolute",
      right: "-31px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      background: "#444",
      color: "white",
      border: "none",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      cursor: "pointer",
    }}
  >
    <FaArrowLeft />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="slick-prev"
    style={{
      position: "absolute",
      left: "-31px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      background: "#444",
      color: "white",
      border: "none",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      cursor: "pointer",
    }}
  >
    <FaArrowRight />
  </button>
);

const truncateReview = (review, limit = 200) => {
  if (review.length <= limit) return review;
  return review.substring(0, limit) + '...';
};

const ClientFeedback = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("testimonials/get-testimonials");
        if (response.data.result) {

          // Filter only active testimonials
          const activeTestimonials = response.data.responseData.filter(testimonial => testimonial.isActive);
          // console.log("response Testimo",response.data.responseData);
          
          setTestimonials(activeTestimonials);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError("There was an error fetching testimonials!");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleShowModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
  };

  const handleCloseModal = () => {
    setSelectedTestimonial(null);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />, 
    prevArrow: <PrevArrow />, 
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, nextArrow: <NextArrow />, prevArrow: <PrevArrow /> } },
      { breakpoint: 768, settings: { slidesToShow: 1, nextArrow: <NextArrow />, prevArrow: <PrevArrow /> } },
    ],
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  

  return (
    <>
      <section className="py-5 mt-5" style={{ backgroundColor: "#777777", boxShadow: "none" }}>
        <div className="container-fluid">
          <h1 className="text-center fw-bold mb-5 text-white">Insights From Our Valued Clients</h1>
        </div>
      </section>

      <section className="customer-feedback-section mb-5">
        <div className="container position-relative">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-4 custom-padding">
                  {/* h-100 d-flex flex-column style={{ minHeight: "320px" }} */}
                <div className="card border-0 p-4 position-relative customer-feedback-card-border-radius  h-100 d-flex flex-column" style={{ minHeight: "290px" }}>
                  <h5 className="fw-bold mb-2">{testimonial.company_Name}</h5>
                  <p className="text-muted mb-3">
                    {truncateReview(testimonial.review, 150)}
                    {testimonial.review.length > 150 && (
                      <span className='read-more' onClick={() => handleShowModal(testimonial)}>
                        ... <b>Read More</b>
                      </span>
                    )}
                  </p>
                  {/* <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <span className="text-warning">
                        {"★".repeat(testimonial.star)}
                        {"☆".repeat(5 - testimonial.star)}
                      </span>
                      <br />
                      <small className="text-muted">{testimonial.name}</small>
                    </div>
                  </div> */}
                  <div className="mt-auto">
                    <span className="text-warning">
                      {"★".repeat(testimonial.star)}
                      {"☆".repeat(5 - testimonial.star)}
                    </span>
                    <br />
                    <div className="w-100">
                      <small className="text-muted">{testimonial.name}</small>  {/* Now always at bottom */}
                    </div>
                  </div>
                  <div className="position-absolute cust-feedback-img translate-middle-x" style={{ bottom: "-14px" }}>
                    <img
                      src={testimonial.img}
                      className="rounded-circle"
                      alt={testimonial.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        border: "4px solid white",
                        boxShadow: "rgb(0 0 0 / 20%) 0px 1px 8px 4px",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {selectedTestimonial && (
        <Modal show={true} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedTestimonial.company_Name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mb-4">
            <div className="card border-0 p-4 position-relative customer-feedback-card-border-radius">
              {/* <h5 className="fw-bold mb-2">{selectedTestimonial.company_Name}</h5> */}
              <p className="text-muted mb-3">{selectedTestimonial.review}</p>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-warning">
                    {"★".repeat(selectedTestimonial.rating)}
                    {"☆".repeat(5 - selectedTestimonial.rating)}
                  </span>
                  <br />
                  <small className="text-muted">{selectedTestimonial.name}</small>
                </div>
              </div>
              <div className="position-absolute cust-feedback-img translate-middle-x" style={{ bottom: "-14px" }}>
                <img
                  src={selectedTestimonial.img}
                  className="rounded-circle"
                  alt={selectedTestimonial.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    border: "4px solid white",
                    // boxShadow: "rgb(0 0 0 / 20%) 0px 2px 12px 7px",
                    boxShadow: "rgb(0 0 0 / 20%) 0px 1px 8px 4px",
                  }}
                />
              </div>
            </div>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer> */}
        </Modal>
      )}
    </>
  );
};

export default ClientFeedback;
