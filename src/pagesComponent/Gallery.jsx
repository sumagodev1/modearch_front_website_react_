import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../layoutComponent/Navbar";
import Footer from "../layoutComponent/Footer";
import gallery_banner_img from './images/gallery/gallery_banner_img.png';
import gallery_img1 from './images/gallery/gallery_img1.png'
import gallery_img2 from './images/gallery/gallery_img2.png'
import gallery from './images/gallery/gallery.png'
import up_arrow from './images/up-arrow.png'
import './Gallery.css'
import { FaFacebookF, FaInstagram, FaEnvelope, FaWhatsapp } from "react-icons/fa";

// const staticGalleryData = [
//     {
//       id: 1,
//       gallery_category: "Steel Structures",
//       img: gallery,
//     },
//     {
//       id: 2,
//       gallery_category: "Modern Buildings",
//       img: gallery,
//     },
//     {
//       id: 3,
//       gallery_category: "Industrial Projects",
//       img: gallery,
//     },
//   ];
  

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socialLinks, setSocialLinks] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
      const fetchGalleryData = async () => {
        try {
          const response = await axios.get("galleryDetails/get-galleryDetails");
          console.log("API Response:", response.data.responseData);
    
          // Filter only active data
          const activeGalleryData = response.data.responseData.filter(item => item.isActive);
    
          setGalleryData(activeGalleryData);
        } catch (error) {
          console.error("Error fetching gallery data:", error);
          setError("Failed to load gallery data.");
        } finally {
          setLoading(false);
        }
      };
    
      fetchGalleryData();

      axios
      .get("/social-contact/get-socialcontacts")
      .then((response) => {
        setSocialLinks(response.data.responseData[0] || {});
      })
      .catch((error) => {
        console.error("Error fetching social media links:", error);
      });

    }, []);
    

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
                <img src={gallery_img2} alt='img4' className='img-fluid mb-4' />
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
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : error ? (
                  <>
                    {/* <p className="text-center text-danger">{error}</p> */}
                    <div className="container text-center py-2">
                      <h4 className="text-danger fw-bold">Gallery images not available.</h4>
                    </div>
                  </>
                ) : (
                    <div className='row row-cols-1 row-cols-md-3 g-4'>
                        {galleryData.map((item) => (
                            <div key={item.id} className='col'>
                                <div className='card shadow-sm gallery_card'>
                                    <img src={item.img} className='card-img-top gallery_img' alt={item.gallery_category} />
                                    <div className='card-body'>
                                        <h5 className='card-title'>{item.gallery_category}</h5>
                                        <div className='d-flex justify-content-end'>
                                            {/* <button
                                                className='btn btn-link text-decoration-none gallery_btn'
                                                onClick={() => handleSeeMore(item.id)}
                                            >
                                                See More <img src={up_arrow} alt="up_arrow" className='img-fluid' />
                                            </button> */}

                                            <Link
                                              to={`/gallery/${item.gallery_category
                                                .toLowerCase()
                                                .replace(/\s+/g, "-")}`}
                                              className="btn btn-link text-decoration-none gallery_btn"
                                              onClick={()=>localStorage.setItem('objid',item.id)}
                                            >
                                              See More{" "}
                                              <img
                                                src={up_arrow}
                                                alt="Tekla Structures"
                                                className="expertise-logo"
                                              />
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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

        {/* <section className='social-media-section text-center'>
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
        </section> */}

        <section className="social-media-section text-center">
          <h4 className="mb-3">Follow Us On</h4>
          <div className="d-flex justify-content-center gap-3">
            <a
              href={socialLinks.facebook}
              className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle gallery_social_logo_shadow"
              style={{ width: "45px", height: "45px", backgroundColor: "#fff" }}
            >
              <FaFacebookF style={{ height: "1rem", fill: "#444444" }} />
            </a>
            <a
              href={socialLinks.instagram}
              className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
              style={{ width: "45px", height: "45px", backgroundColor: "#fff" }}
            >
              <FaInstagram style={{ height: "1rem", fill: "#444444" }} />
            </a>
            {socialLinks.email && (
            <a
              href={`mailto:${socialLinks.email}`}
              className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
              style={{ width: "45px", height: "45px", backgroundColor: "#fff" }}
            >
              <FaEnvelope style={{ height: "1rem", fill: "#444444" }} />
            </a>
            )}
            {socialLinks.whatsapp && (
            <a
              href={`https://wa.me/${socialLinks.whatsapp.replace(/\D/g, "")}`}
              className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
              style={{ width: "45px", height: "45px", backgroundColor: "#fff" }}
            >
              <FaWhatsapp style={{ height: "1rem", fill: "#444444" }} />
            </a>
            )}
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
