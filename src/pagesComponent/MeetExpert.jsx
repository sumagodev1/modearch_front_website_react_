import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const MeetExpert = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animation runs only once
    });
  }, []);  

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get("/team/get-teammembers");
        if (response.data.responseData && Array.isArray(response.data.responseData)) {
          console.log('response.data.responseData', response.data.responseData);
          
          const filteredMembers = response.data.responseData
            .filter((member) => member.isActive === true) 
            .sort((a, b) => a.position_no - b.position_no); 

          setTeamMembers(filteredMembers);
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <section className="py-5" id="modearch_team">
      <div className="container text-center">
        <h1 className="fw-bold mb-4" data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="600">Meet The Experts Behind The Success</h1>
        <div className="row g-4">
          {teamMembers.map((member, index) => (
            <div key={member.id || index} className="col-md-6">
              <div className="d-flex shadow overflow-hidden h-100">
                {/* Image Section */}
                <div className="w-50">
                  <img
                    src={member.img} 
                    alt={member.name}
                    className="img-fluid h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                {/* Info Section */}
                <div className="w-50 team-info-section text-white d-flex flex-column justify-content-center p-4 text-start">
                    {/* text-justify */}
                  <p className="" data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="600">{member.description}</p>
                  <div className="name-role mt-1" data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="600">
                    <h5 className="mb-0" data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="600" >{member.name}</h5>
                    <small className="mb-0" data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="600">{member.designation}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetExpert;
