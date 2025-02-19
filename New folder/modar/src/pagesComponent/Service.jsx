import React from 'react';
// import './service.css';
import Service1 from './images/service/service1.png'

const services = [
  { title: 'Structural', subtitle: 'Sheet Detailing', img: Service1, desc: 'Description for Structural Sheet Detailing.' },
  { title: 'Connection', subtitle: 'Design', img: Service1, desc: 'Description for Connection Design.' },
  { title: 'BIM', subtitle: '3D Modeling', img: Service1, desc: 'Description for BIM & 3D Modeling.' },
  { title: 'Miscellaneous', subtitle: 'Sheet Detailing', img: Service1, desc: 'Description for Miscellaneous Sheet Detailing.' },
  { title: 'Material', subtitle: 'Take-Off & Estimation', img: Service1, desc: 'Description for Material Take-Off & Estimation.' },
  { title: 'CNC', subtitle: 'Fabrication Support', img: Service1, desc: 'Description for CNC & Fabrication Support.' },
];

const Service = () => {
  return (
    <section className='service-section'>
      <div className='container'>
        <h2 className='text-center mb-4'>Services</h2>
        <div className='row'>
          {services.slice(0, 3).map((service, index) => (
            <div key={index} className='col-md-12 mb-4'>
              <div className='service-box d-flex'>
                <img src={service.img} alt={service.title} className='img-fluid' />
                <div className='service-text'>
                  <h4>{service.title}</h4>
                  <h5>{service.subtitle}</h5>
                  <p>{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className='design-section text-center my-5'>
          <p>Our Track Record | Industries We Serve | Compliance</p>
        </div>
        
        <div className='row'>
          {services.slice(3).map((service, index) => (
            <div key={index} className='col-md-12 mb-4'>
              <div className='service-box d-flex'>
                <img src={service.img} alt={service.title} className='img-fluid' />
                <div className='service-text'>
                  <h4>{service.title}</h4>
                  <h5>{service.subtitle}</h5>
                  <p>{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
