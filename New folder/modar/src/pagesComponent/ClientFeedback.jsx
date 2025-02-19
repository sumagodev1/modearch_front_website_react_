import React from "react";
import team4 from './images/about/team4.png'
import feedback1 from './images/about/feedback1.png'
import feedback2 from './images/about/feedback2.png'
import feedback3 from './images/about/feedback3.png'

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

const ClientFeedback = () => {
  return (
    <>
      {/* style={{ backgroundColor: "#f8f9fa" }} */}
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
      <div className="container">
        <div className="row justify-content-center">
          {feedbacks.map((feedback, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-5">
              <div className="card border-0 p-3 position-relative customer-feedback-card-border-radius">
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
                <div className="position-absolute cust-feedback-img translate-middle-x" style={{ bottom: "-28px" }}>
                  <img
                    src={feedback.img}
                    className="rounded-circle"
                    alt={feedback.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      border: "4px solid white",
                       boxShadow: "rgb(0 0 0 / 20%) 0px 2px 12px 7px"
                    }}
                  />
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default ClientFeedback;
