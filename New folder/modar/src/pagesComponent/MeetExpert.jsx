import React from 'react';
import team1 from './images/about/team1.png';
import team2 from './images/about/team2.png';
import team3 from './images/about/team3.png';
import team4 from './images/about/team4.png';

const experts = [
  { name: 'David', role: 'Chairman', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.', img: team1 },
  { name: 'Jenifer', role: 'Chairman', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.', img: team2 },
  { name: 'Pratik', role: 'Chairman', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.', img: team3 },
  { name: 'Anna', role: 'Chairman', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.', img: team4 }
];

const MeetExpert = () => {
  return (
    <section className="py-5">
      <div className="container text-center">
        <h2 className="fw-bold mb-4">Meet The Experts Behind The Success</h2>
        <div className="row g-4">
          {experts.map((expert, index) => (
            <div key={index} className="col-md-6">
              <div className="d-flex shadow rounded overflow-hidden">
                {/* Image Section */}
                <div className="w-50">
                  <img src={expert.img} alt={expert.name} className="img-fluid h-100" style={{ objectFit: 'cover' }} />
                </div>
                
                {/* Info Section */}
                <div className="w-50 bg-dark text-white d-flex flex-column justify-content-center p-4 text-start">
                  <p className="">{expert.description}</p>
                  <div className="name-role mt-1">
                    <h5 className="mb-0">{expert.name}</h5>
                    <small className="mb-0">{expert.role}</small>
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
