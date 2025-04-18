import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from "../layoutComponent/Navbar";
import Footer from "../layoutComponent/Footer";
// import gallery_banner_img from './images/gallery/gallery_banner_img.png';
import gallery_bannerimgDesktop  from "./images/gallery/gallery_banner_img.webp";
import gallery_bannerimgMobile from "./images/gallery/gallery_bannerimgMobile.webp";
import gallery_img1 from './images/gallery/gallery_img1.webp'
import gallery_img2 from './images/gallery/gallery_img2.webp'
import gallery from './images/gallery/gallery.png'
import up_arrow from './images/up-arrow.svg'
import './Gallery.css'
import { FaFacebookF, FaInstagram, FaEnvelope, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

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

    useEffect(() => {
      AOS.init({
        duration: 1000, // Animation duration in milliseconds
        once: false, // Whether animation should only happen once
      });
    }, []);

  const [imageSrc, setImageSrc] = useState(gallery_bannerimgDesktop);

  // Function to update image based on screen size
  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth < 768) {
        setImageSrc(gallery_bannerimgMobile); // Mobile image
      } else {
        setImageSrc(gallery_bannerimgDesktop); // Desktop image
      }
    };

    updateImage(); // Set initial image
    window.addEventListener("resize", updateImage); // Listen for resize events

    return () => window.removeEventListener("resize", updateImage); // Cleanup event listener
  }, []);

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

      <Helmet>
        <title>Gallery ModeArch Steel | ModeArch Steel Gallery | Project Portfolio | Steel Detailing Visuals</title>
        <meta name="description" content="View ModeArch Steel's project gallery showcasing our expertise in steel detailing and BIM modeling. See our completed projects, 3D models, and work in progress." />
        <meta name="keywords" content="steel detailing gallery, project portfolio, steel detailing images, 3D models, construction projects, work in progress, fabrication, assembly, installation" />
        <meta name="author" content="ModeArch Steel" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Steel Detailing Services | BIM, Connection Design | ModeArch Steel" />
        <meta property="og:description" content="View ModeArch Steel's project gallery showcasing our expertise in steel detailing and BIM modeling. See our completed projects, 3D models, and work in progress." />
        <meta property="og:image" content="https://staging-v2.modearchsteel.com/static/media/gallery_banner_img.eb03d58f0a9809a899f0.png" />
        <meta property="og:url" content="https://staging-v2.modearchsteel.com/gallery" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Precision Steel Detailing & BIM Solutions | ModeArch Steel" />
        <meta name="twitter:description" content="View ModeArch Steel's project gallery showcasing our expertise in steel detailing and BIM modeling. See our completed projects, 3D models, and work in progress." />
        <meta name="twitter:image" content="https://staging-v2.modearchsteel.com/static/media/gallery_banner_img.eb03d58f0a9809a899f0.png" />
        <meta name="twitter:site" content="@YourTwitterHandle" />
        <meta name="twitter:creator" content="@YourTwitterHandle" />
      </Helmet>

      <Navbar />
      
      <section className="g-0">
        <div className="container-fluid px-0">
          <div className="gallery_banner_img">
            <img
              src={imageSrc}
              alt="gallery_banner_img"
              className="img-fluid w-100"
            />
          </div>
        </div>
      </section>

      <section>
        <div className='container py-5'>
          <h2 className='text-center mb-4 fw-bold'>Gallery</h2>
          
          <div className='row align-items-center' data-aos="fade-up" data-aos-duration="2000" data-aos-delay="600">
            <div className='col-md-7'>
                <img src={gallery_img1} alt='img1' className='img-fluid'  />
            </div>
            <div className='col-md-5 mb-auto'>
              <h3 className="fw-bold text-center">Life at Modearch Steel: Work, Culture & Celebrations</h3>
              <p className="text-justify" style={{ textIndent: "20px" }} >
                At Modearch Steel, we believe in fostering a dynamic and inspiring workplace where creativity, teamwork, and precision come together. Our commitment to excellence in steel detailing is reflected in our work and the strong culture we have built. From brainstorming sessions and hands-on project execution to knowledge-sharing initiatives, every aspect of our work environment encourages growth and collaboration.
              </p>
            </div>
          </div>
          
          <div className='row align-items-center mt-5' data-aos="fade-up" data-aos-duration="2000" data-aos-delay="600">
            <div className='col-md-7 order-md-2'>
                <img src={gallery_img2} alt='img4' className='img-fluid mb-4'  />
            </div>
            <div className='col-md-5 order-md-1 mb-auto'>
              <h3 className="fw-bold text-center">Celebrating Team Spirit & Workplace Culture</h3>
              <p className="text-justify" style={{ textIndent: "20px" }} >
                Beyond our professional endeavors, we cherish the moments that bring us together as a team. Festive celebrations, milestone achievements, and team outings create an engaging and lively atmosphere where bonds are strengthened. Whether it’s a casual day at the office, a rewarding project completion, or a grand celebration, every moment at Modearch Steel is a testament to our positive work culture.
              </p>
              <p className="text-justify" style={{ textIndent: "20px" }} >
                We believe in fostering an environment where creativity and collaboration thrive. Team members are encouraged to share ideas, challenge each other, and grow both professionally and personally. This spirit of mutual respect and shared success creates a workplace that is not only productive but also enjoyable. At Modearch Steel, every individual’s contribution is valued, and we continue to build a culture that emphasizes learning, growth, and collective achievement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery_main_section">
            <div className='container py-5'>
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : error ? (
                  <>
                    {/* <p className="text-center text-danger">{error}</p> */}
                    <div className="container text-center py-2">
                      <h4 className="fw-bold">Gallery images not available.</h4>
                    </div>
                  </>
                ) : (
                    <div className='row row-cols-1 row-cols-md-3 g-4' >
                        {galleryData.map((item) => (
                            <div key={item.id} className='col'>
                                <div className='card shadow-sm gallery_card'>
                                    <img src={item.img} className='card-img-top gallery_img' alt={item.gallery_category} />
                                    <div className='card-body'>
                                        <h5 className='card-title fw-bold'>{item.gallery_category}</h5>
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
                                              className="text-decoration-none see_more_btn see_more_underline_animation"
                                              onClick={()=>localStorage.setItem('objid',item.id)}
                                            >
                                              See More{" "}
                                              <img
                                                src={up_arrow}
                                                alt="Tekla Structures"
                                                className="expertise-logo"
                                              />
                                            </Link>

                                            {/* <Link
                                              to={`/gallery/${item.gallery_category
                                                .toLowerCase()
                                                .replace(/\s+/g, "-")}`}
                                              className="btn btn-link text-decoration-none gallery_btn fw-bold see_more_gallery_underline_animation"
                                              onClick={()=>localStorage.setItem('objid',item.id)}
                                            >
                                              See More{" "}
                                              <img
                                                src={up_arrow}
                                                alt="Tekla Structures"
                                                className="expertise-logo"
                                              />
                                            </Link> */}

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
          <h4 className="mb-3 fw-bold">Follow Us On</h4>
          <div className="d-flex justify-content-center gap-3">
            <a
              href={socialLinks.facebook}
              className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle gallery_social_logo_shadow"
              style={{ width: "45px", height: "45px", backgroundColor: "#fff" }}
            >
              <FaFacebookF style={{ height: "1.2rem", fill: "#444444" }} />
            </a>
            <a
              href={socialLinks.instagram}
              className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
              style={{ width: "45px", height: "45px", backgroundColor: "#fff" }}
            >
              <FaInstagram style={{ height: "1.2rem", fill: "#444444" }} />
            </a>
            {socialLinks.email && (
            <a
              href={`mailto:${socialLinks.email}`}
              className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
              style={{ width: "45px", height: "45px", backgroundColor: "#fff" }}
            >
              <FaEnvelope style={{ height: "1.2rem", fill: "#444444" }} />
            </a>
            )}
            {socialLinks.whatsapp && (
            <a
              href={`https://wa.me/${socialLinks.whatsapp.replace(/\D/g, "")}`}
              className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
              style={{ width: "45px", height: "45px", backgroundColor: "#fff" }}
            >
              <FaWhatsapp style={{ height: "1.2rem", fill: "#444444" }} />
            </a>
            )}
            <a href={socialLinks.linkedin} className="text-dark me-2 d-flex align-items-center justify-content-center rounded-circle shadow"
              style={{ width: "45px", height: "45px", backgroundColor: '#fff' }} target="_blank" rel="noopener noreferrer" >
              <FaLinkedin style={{ height: '1.2rem', fill: "#444444" }} />
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
