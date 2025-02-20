import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../layoutComponent/Navbar";
import Footer from "../layoutComponent/Footer";
import gallery_banner_img from './images/gallery/gallery_banner_img.png';
import gallery_img1 from './images/gallery/gallery_img1.png'
import gallery_img2 from './images/gallery/gallery_img2.png'
import gallery from './images/gallery/gallery.png'
import up_arrow from './images/up-arrow.png'
import './Gallery.css'
import { FaFacebookF, FaInstagram, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const staticGalleryData = [
    {
      id: 1,
      category: "Steel Structures",
      image: gallery,
    },
    {
      id: 2,
      category: "Modern Buildings",
      image: gallery,
    },
    {
      id: 3,
      category: "Industrial Projects",
      image: gallery,
    },
  ];
  

const Gallery = () => {

    const navigate = useNavigate();

    const handleSeeMore = (categoryId) => {
      navigate(`/gallery/${categoryId}`);
    };

  return (
    <>
      <Navbar />
      
      <section className="g-0">
        <div className="container-fluid px-0">
          <div className="gallery_banner_img">
            <img
              src={gallery_banner_img}
              alt="gallery_banner_img"
              className="img-fluid w-100"
            />
          </div>
        </div>
      </section>

      <section>
        <div className='container py-5'>
          <h2 className='text-center mb-4'>Gallery</h2>
          
          <div className='row align-items-center'>
            <div className='col-md-7'>
                <img src={gallery_img1} alt='img1' className='img-fluid' />
            </div>
            <div className='col-md-5 mb-auto'>
              <h3>Lorem Ipsum</h3>
              <p>
                Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>
          
          <div className='row align-items-center mt-5'>
            <div className='col-md-7 order-md-2'>
                <img src={gallery_img2} alt='img4' className='img-fluid' />
            </div>
            <div className='col-md-5 order-md-1 mb-auto'>
              <h3>Lorem Ipsum</h3>
              <p>
                Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                Lorem ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='container py-5'>
          <h2 className='text-center mb-4'>Gallery</h2>
          <div className='row row-cols-1 row-cols-md-3 g-4'>
            {staticGalleryData.map((item) => (
              <div key={item.id} className='col'>
                <div className='card shadow-sm gallery_card'>
                  <img src={item.image} className='card-img-top gallery_img' alt={item.category} />
                  <div className='card-body'>
                    <h5 className='card-title'>{item.category}</h5>
                    <div className='d-flex justify-content-end'>
                        <button
                        className='btn btn-link text-decoration-none gallery_btn'
                        onClick={() => handleSeeMore(item.id)}
                        >
                        See More <img src={up_arrow} alt="up_arrow" className='img-fluid' />
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* <section>
            <div className='container py-5'>
                <div className='row row-cols-1 row-cols-md-3 g-4'>
                    <div className='col-md-4 col-sm-6 col-lg-4'>
                        <div className='card shadow-sm gallery_card'>
                            <img src={gallery} className='card-img-top gallery_img' alt='gallery' />
                            <div className='card-body'>
                            <h5 className='card-title'>Lorem Ipsum</h5>
                            <a href='#' className='text-decoration-none gallery_btn d-flex justify-content-end'>See More <img src={up_arrow} alt="up_arrow" className='img-fluid' /></a>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 col-sm-6 col-lg-4'>
                        <div className='card shadow-sm gallery_card'>
                            <img src={gallery} className='card-img-top gallery_img' alt='gallery' />
                            <div className='card-body'>
                            <h5 className='card-title'>Lorem Ipsum</h5>
                            <a href='#' className='text-decoration-none gallery_btn d-flex justify-content-end'>See More <img src={up_arrow} alt="up_arrow" className='img-fluid' /></a>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 col-sm-6 col-lg-4'>
                        <div className='card shadow-sm gallery_card'>
                            <img src={gallery} className='card-img-top gallery_img' alt='gallery' />
                            <div className='card-body'>
                            <h5 className='card-title'>Lorem Ipsum</h5>
                            <a href='#' className='text-decoration-none gallery_btn d-flex justify-content-end'>See More <img src={up_arrow} alt="up_arrow" className='img-fluid' /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}

        <section className='social-media-section text-center'>
            <h4 className='mb-3'>Follow Us On</h4>
            <div className='d-flex justify-content-center gap-3'>
                <a href="#" className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle gallery_social_logo_shadow"
                style={{ width: '45px', height: '45px', backgroundColor: '#fff' }}>
                <FaFacebookF style={{ height: '1rem', fill: '#444444' }} />
                </a>
                <a href="#" className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
                style={{ width: '45px', height: '45px', backgroundColor: '#fff' }}>
                <FaInstagram style={{ height: '1rem', fill: '#444444' }} />
                </a>
                <a href="mailto:sales@modearchsteel.com" className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
                style={{ width: '45px', height: '45px', backgroundColor: '#fff' }}>
                <FaEnvelope style={{ height: '1rem', fill: '#444444' }} />
                </a>
                <a href="#" className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
                style={{ width: '45px', height: '45px', backgroundColor: '#fff' }}>
                <FaWhatsapp style={{ height: '1rem', fill: '#444444' }} />
                </a>
            </div>
        </section>

        <section className='gallery_last_bg_color_sec p-4'>
            <div className='container-fluid'>

            </div>
        </section>
      
      <Footer />
    </>
  );
}

export default Gallery;
