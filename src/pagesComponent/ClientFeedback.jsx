import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import team4 from "./images/about/team4.png";
import feedback2 from "./images/about/feedback2.png";
import feedback3 from "./images/about/feedback3.png";
import './Home.css';

// Client feedback data
const feedbacks = [
  {
    name: "David",
    title: "Good Service",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.",
    rating: 4,
    img: team4,
  },
  {
    name: "Jenifer",
    title: "Quality Product",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.",
    rating: 5,
    img: feedback2,
  },
  {
    name: "Pratik",
    title: "Good Service",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.",
    rating: 4,
    img: feedback3,
  },
];

// Custom Previous Button
const PrevArrow = ({ onClick, currentSlide }) => (
  <button
    onClick={onClick}
    className="slick-prev"
    style={{
      position: "absolute",
      left: currentSlide === 0 ? "-40px" : "-40px",
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

// Custom Next Button
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="slick-next"
    style={{
      position: "absolute",
      right: "-40px",
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

const ClientFeedback = () => {
  const settings = {
    dots: false, // Removed dots
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />, // Custom Next Button
    prevArrow: <PrevArrow />, // Custom Prev Button
    responsive: [
      {
        breakpoint: 1024, // Tablet Mode
        settings: {
          slidesToShow: 2,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />,
        },
      },
      {
        breakpoint: 768, // Mobile Mode
        settings: {
          slidesToShow: 1,
          nextArrow: (
            <NextArrow
              style={{
                right: "10px",
              }}
            />
          ),
          prevArrow: (
            <PrevArrow
              style={{
                left: "10px",
              }}
            />
          ),
        },
      },
    ],
  };

  return (
    <>
      <section className="py-5 mt-5" style={{ backgroundColor: "#777777" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 mt-4 mb-5">
              <h2 className="text-center fw-bold mb-4">Insights From Our Valued Clients</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="customer-feedback-section mb-5">
        <div className="container position-relative">
          <Slider {...settings}>
            {feedbacks.map((feedback, index) => (
              <div key={index} className="p-3 custom-padding">
                <div className="card border-0 p-4 position-relative customer-feedback-card-border-radius">
                  <h5 className="fw-bold mb-2">{feedback.title}</h5>
                  <p className="text-muted mb-3">{feedback.description}</p>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <span className="text-warning">
                        {"★".repeat(feedback.rating)}
                        {"☆".repeat(5 - feedback.rating)}
                      </span>
                      <br />
                      <small className="text-muted">{feedback.name}</small>
                    </div>
                  </div>

                  {/* Customer Image (Half Inside, Half Outside) */}
                  <div className="position-absolute cust-feedback-img translate-middle-x" style={{ bottom: "-14px" }}>
                    <img
                      src={feedback.img}
                      className="rounded-circle"
                      alt={feedback.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        border: "4px solid white",
                        boxShadow: "rgb(0 0 0 / 20%) 0px 2px 12px 7px",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default ClientFeedback;
