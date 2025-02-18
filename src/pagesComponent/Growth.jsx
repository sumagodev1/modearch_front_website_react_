import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Growth.css"; 

const originalData = [
  {
    year: 2023,
    details: [
      "Launched Raaya by Atmosphere, our first hospitality project in the Maldives",
      "Launched Eleven West office park in Baner",
      "Acquired Brownfield Hotel in Varanasi, Uttar Pradesh, and Aloft Bengaluru Whitefield Hotel in Karnataka",
    ],
  },
  {
    year: 2022,
    details: [
      "Commenced construction of Panchshil Business Hub and Panchshil Vantage office parks in Kharadi, Pune",
    ],
  },
  {
    year: 2021,
    details: ["Commenced construction of EON West I & II office park in Wakad"],
  },
  {
    year: 2020,
    details: [
      "Launched SOHO (Small Office Home Office) In Kharadi",
      "Commenced construction of Panchshil Business park in Viman Nagar",
    ],
  },
  {
    year: 2019,
    details: [
      "Launched EON Free Zone Phase || in Kharadi",
      "Launched The Ritz-Carlton, Pune",
    ],
  },
  {
    year: 2018,
    details: [
      "Launched the world's first-ever YOO branded villas - YOO villas styled by Kelly Hoppen CBE in Kharadi",
    ],
  },
  {
    year: 2016,
    details: [
      'Re-branded Oakwood Premier to "Marriott Suites',
      "Commenced construction of the second SEZ EON Free Zone Phase II in Kharadi",
    ],
  },
  {
    year: 2015,
    details: [
      "Signed an MOU with the Government of Maharashtra to develop 4 IT projects jointly with Blackstone Group across Mumbai and Pune",
      "Launched Avant Garde our first premium residences in Friends Colony, New Delhi",
    ],
  },
  {
    year: 2014,
    details: [
      "Delivered built-to-suit office park for Cumm India (Panchshil Business Park - Phase I) in Balewadi",
      "Acquired Mumbai's iconic Express Towers in Nariman Point with Blackstone",
      "Delivered Business Bay, a mixed-use development, is located near the Pune Golf Course on Airport Road",
    ],
  },
  {
    year: 2013,
    details: [
      "Upgraded Pune Marriott Hotel and Convent Centre to JW Marriott Hotel Pune",
      "Launched DoubleTree by Hilton Pune -Chinchwad",
      "Launched the first Trump-branded residences in India - Trump Towers in Kalyani Nagar",
    ],
  },
  {
    year: 2012,
    details: [
      "Launched Panchshil's first home-branded premium high-rise residential project: Panchshil Towers in Kharadi",
    ],
  },
  {
    year: 2010,
    details: [
      "Launched Pune Marriott Hotel and Convent Centre in Senapati Bapat Road",
      "Launched the first internationally-branded residence, yoopune by Philippe Starck, in Hadapsar",
      "Launched Pune's only World Trade Center in Kharadi",
    ],
  },
  {
    year: 2007,
    details: [
      "Launched Oakwood Residence the first internationally-branded serviced residence Naylor Road",
    ],
  },
  {
    year: 2006,
    details: [
      "Launched 4.5 million sq. ft. of IT & IT-eS SEZ (Special Economic Zone) EON Free Zone Phase I in Kharadi",
    ],
  },
  {
    year: 2004,
    details: ["Received Foreign Direct Investment (FDI) from Merrill Lynch"],
  },
  {
    year: 2003,
    details: ["Commenced construction of Tech Park One office park in Yerwada"],
  },
  {
    year: 2002,
    details: [
      "Successfully delivered a built-to-suit office park for AXA Business Services in Bund Garden Road",
      "Launched ICC (International Convention Centre) in Senapati Bapat Road",
    ],
  },
];


const Growth = () => {
    const containerRef = useRef(null);
    const timelineRef = useRef(null);
    const yearRefs = useRef([]);
  
    const [activeIndex, setActiveIndex] = useState(0);
    const [data, setData] = useState(originalData);

    // Scroll to the active year
    useEffect(() => {
        if (timelineRef.current && yearRefs.current[0]) {
            const timeline = timelineRef.current;
            const firstYear = yearRefs.current[0];
            timeline.scrollTo({
                left: firstYear.offsetLeft - 100,
                behavior: "smooth",
            });
        }
    }, [data]);

    // useEffect(() => {
    //     if (timelineRef.current && yearRefs.current[activeIndex]) {
    //         const timeline = timelineRef.current;
    //         const activeYear = yearRefs.current[activeIndex];
    //         timeline.scrollTo({
    //             left: activeYear.offsetLeft - timeline.offsetWidth / 2 + activeYear.offsetWidth / 2,
    //             behavior: "smooth",
    //         });
    //     }
    // }, [activeIndex]);
    

    // Function to reorder years in a loop
    const handleYearClick = (index) => {
        const clickedYear = data[index].year;

        // Rearrange the years so that the clicked year comes first
        const newOrder = [
            ...data.slice(index), // From clicked year to the end
            ...data.slice(0, index), // From start to clicked year
        ];

        setData(newOrder);
        setActiveIndex(0); // Reset active index to first position
    };
    

    return (
      <>
        <section className="growth-section">
          <div className="container growth-section-container">
            <h1 className="heading">Growth Chronicles</h1>

            <div ref={containerRef} className="timeline-container">
            <motion.div
                key={data[0].year} // Key changes trigger re-animation
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="timeline"
            >
                {data.map((item, index) => (
                    <motion.div key={index} className="timeline-item">
                        <h2 className="year" onClick={() => handleYearClick(index)}>{item.year}</h2>
                        <ul className="details">
                            {item.details.map((detail, i) => (
                                <motion.li
                                    key={i}
                                    className="detail-item mb-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                >
                                    <span>•</span> {detail}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </motion.div>
            </div>

            <div ref={timelineRef} className="timeline-nav custom-scrollbar" drag="x" dragConstraints={{ left: -200, right: 0 }}>
              {data.map((item, index) => (
                <div key={index} className={`timeline-nav-item ${index === 0 ? "active" : ""}`}>
                  <div className="timeline-nav-line"></div>
                  <div
                    ref={(el) => (yearRefs.current[index] = el)}
                    className={`timeline-nav-circle ${index === 0 ? "active" : ""}`}
                    onClick={() => handleYearClick(index)}
                  ></div>
                  <div className="timeline-nav-line"></div>
                  <button className={`timeline-nav-text ${index === 0 ? "active" : ""}`}
                    onClick={() => handleYearClick(index)}>
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
