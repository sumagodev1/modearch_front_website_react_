import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Growth.css";

const data = [
  {
    year: 2024,
    details: [
      "Further growth led to the opening of our fourth office in Nashik.",
      "Successfully delivered 1,500+ tons of steel detailing per month.",
    ],
  },
  {
    year: 2023,
    details: [
      "Expanded internationally with an office in Delaware, Dover (USA).",
      "Strengthened operations with a new office in Nashik, India.",
    ],
  },
  {
    year: 2020,
    details: [" Reached 500+ successful projects, reinforcing our industry presence."],
  },
  {
    year: 2017,
    details: [
      "Modearch Steel started as a small team with a big vision.",
    ],
  },
];

const Growth = () => {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const timelineRef = useRef(null);
  const yearRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (containerRef.current && sectionRefs.current[activeIndex]) {
      const container = containerRef.current;
      const targetSection = sectionRefs.current[activeIndex];
      container.scrollTo({
        left: targetSection.offsetLeft,
        behavior: "smooth",
      });
    }

    if (timelineRef.current && yearRefs.current[activeIndex]) {
      const timeline = timelineRef.current;
      const targetYear = yearRefs.current[activeIndex];
      timeline.scrollTo({
        left: targetYear.offsetLeft - 190,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  const handleYearClick = (index) => {
    if (index >= data.length) {
      setActiveIndex(0);
    } else if (index < 0) {
      setActiveIndex(data.length - 1);
    } else {
      setActiveIndex(index);
    }
  };

  const handleDrag = (event) => {
    const timeline = timelineRef.current;
    if (timeline) {
      let isDown = false;
      let startX;
      let scrollLeft;

      timeline.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - timeline.offsetLeft;
        scrollLeft = timeline.scrollLeft;
      });

      timeline.addEventListener("mouseleave", () => {
        isDown = false;
      });

      timeline.addEventListener("mouseup", () => {
        isDown = false;
      });

      timeline.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - timeline.offsetLeft;
        const walk = (x - startX) * 2;
        timeline.scrollLeft = scrollLeft - walk;
      });

      timeline.addEventListener("touchstart", (e) => {
        startX = e.touches[0].pageX - timeline.offsetLeft;
        scrollLeft = timeline.scrollLeft;
      });

      timeline.addEventListener("touchmove", (e) => {
        const x = e.touches[0].pageX - timeline.offsetLeft;
        const walk = (x - startX) * 2;
        timeline.scrollLeft = scrollLeft - walk;
      });
    }
  };

  useEffect(() => {
    handleDrag();
  }, []);

  return (
    <>
    <section className="growth-section">
    <div className="container growth-container">
      <div className="title">Growth Chronicles</div>

      <div ref={containerRef} className="content-container">
        <motion.div className="content-wrapper">
          {data.map((item, index) => (
            <motion.div
              key={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              onClick={() => handleYearClick(index % data.length)}
              className="section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>{item.year}</h2>
              <ul>
                {item.details.map((detail, i) => (
                  <li key={i}>
                    <span>•</span> {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* <div ref={timelineRef} className="timeline">
        {[...data, ...data].map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="line-section">
              <div
                className={`timeline-line ${
                  activeIndex === index % data.length ? "active" : ""
                }`}
              ></div>
              <div
                ref={(el) => (yearRefs.current[index] = el)}
                onClick={() => handleYearClick(index % data.length)}
                className={`timeline-dot ${
                  activeIndex === index % data.length ? "active" : ""
                }`}
              ></div>
              <div
                className={`timeline-line ${
                  activeIndex === index % data.length ? "active" : ""
                }`}
              ></div>
            </div>
            <button
              onClick={() => handleYearClick(index % data.length)}
              className={`timeline-year ${
                activeIndex === index % data.length ? "active" : ""
              }`}
            >
              {item.year}
            </button>
          </div>
        ))}
      </div> */}

      <div ref={timelineRef} className="timeline">
        {data.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="line-section">
              <div
                className={`timeline-line ${
                  activeIndex === index ? "active" : ""
                }`}
              ></div>
              <div
                ref={(el) => (yearRefs.current[index] = el)}
                onClick={() => handleYearClick(index)}
                className={`timeline-dot ${
                  activeIndex === index ? "active" : ""
                }`}
              ></div>
              <div
                className={`timeline-line ${
                  activeIndex === index ? "active" : ""
                }`}
              ></div>
            </div>
            <button
              onClick={() => handleYearClick(index)}
              className={`timeline-year ${
                activeIndex === index ? "active" : ""
              }`}
            >
              {item.year}
            </button>
          </div>
        ))}
      </div>

    </div>
    </section>
    </>
  );
};

export default Growth;
