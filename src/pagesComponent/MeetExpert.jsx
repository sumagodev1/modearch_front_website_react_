import React, { useEffect, useState } from "react";
import axios from "axios";

const MeetExpert = () => {
  const [teamMembers, setTeamMembers] = useState([]);

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
    <section className="py-5">
      <div className="container text-center">
        <h2 className="fw-bold mb-4">Meet The Experts Behind The Success</h2>
        <div className="row g-4">
          {teamMembers.map((member, index) => (
            <div key={member.id || index} className="col-md-6">
              <div className="d-flex shadow rounded overflow-hidden">
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
                <div className="w-50 bg-dark text-white d-flex flex-column justify-content-center p-4 text-start">
                  <p className="">{member.description}</p>
                  <div className="name-role mt-1">
                    <h5 className="mb-0">{member.name}</h5>
                    <small className="mb-0">{member.designation}</small>
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
