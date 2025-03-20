import React, { useEffect, useState } from "react";
import Navbar from "../layoutComponent/Navbar";
import Footer from "../layoutComponent/Footer";
import axios from "axios";
import { Helmet } from 'react-helmet-async';
import { Button, Card, Col, Container, Row } from "react-bootstrap";
// import blog_banner_img from "./images/blog/blog_banner_img.png";
import blog_bannerimgDesktop  from "./images/blog/blog_banner_img.png";
import blog_bannerimgMobile from "./images/blog/blog_bannerimgMobile.png";
import { useNavigate } from "react-router-dom";
import up_arrow from './images/up-arrow.svg'
import up_arrow_white from './images/up-arrow-white.svg'
import { FaFacebookF, FaInstagram, FaEnvelope, FaWhatsapp, FaLinkedin } from "react-icons/fa";

const Blog = () => {

  const [imageSrc, setImageSrc] = useState(blog_bannerimgDesktop);

  // Function to update image based on screen size
  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth < 768) {
        setImageSrc(blog_bannerimgMobile); // Mobile image
      } else {
        setImageSrc(blog_bannerimgDesktop); // Desktop image
      }
    };

    updateImage(); // Set initial image
    window.addEventListener("resize", updateImage); // Listen for resize events

    return () => window.removeEventListener("resize", updateImage); // Cleanup event listener
  }, []);

  const navigate = useNavigate();
  const [blogData, setBlogData] = useState([]);
  const characterLimit = 200;
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {

    const fetchBlogData = async () => {
      try {
        const response = await axios.get("/blogdetails/get-blogdetails");
        if (response.data.result) {
          const truncatedData = response.data.responseData
            .filter((response) => response.isActive)
            .map((blog) => ({
              ...blog,
              shortDesc:
                blog.shortDesc.length > characterLimit
                  ? blog.shortDesc.substring(0, characterLimit) + "..."
                  : blog.shortDesc,
            }));
          setBlogData(truncatedData);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();

    axios
    .get("/social-contact/get-socialcontacts")
    .then((response) => {
      setSocialLinks(response.data.responseData[0] || {});
    })
    .catch((error) => {
      console.error("Error fetching social media links:", error);
    });

  }, []);

  const renderBlogCard = (blog, index, reverse) => (
    <Col key={blog.id} xl={6} lg={6} md={12} sm={12} className="my-2 my-lg-0">
      <Card className="border-0 h-100 text-white" >
        <Row className="align-items-center">
          {reverse ? (
            <>
              <Col
                md={6}
                className="ps-0 blogcrd"
                style={{ background: index % 4 === 1 ? "#000" : "#EFEFEF" , color: index % 4 === 0 ? "#000" : "#fff" }}
              >
                <Card.Body
                className="pt-4 pb-3 d-flex flex-column justify-content-between h-100"
                style={{
                    background: index % 4 === 0 ? "#EFEFEF" : "#000",
                    color: index % 4 === 0 ? "#000" : "#fff",
                }}
                >
                    <div className="flex-grow-1">
                        <Card.Title
                        className="blogCardTitle fw-bolder pt-lg-3"
                        style={{ fontWeight: "600", fontSize: "0.95rem", letterSpacing: "1.2px" }}
                        >
                        {blog.title.length > 23 ? blog.title.substring(0, 23) + "..." : blog.title}
                        </Card.Title>
                        <Card.Text className="blogCardDesc pt-3" dangerouslySetInnerHTML={{ __html: blog.shortDesc }} />
                    </div>
                    <div className="mt-auto">
                        <Button
                        variant="transparent"
                        className={`py-2 mt-xl-3 align-self-end fw-bolder blog_read_more_btn ${index % 4 === 0 ? "text-dark read_more_underline_animation" : "text-white read_more_white_underline_animation"}`}
                        onClick={() => navigate(`/blogdetails/${blog.title.toLowerCase().replace(/\s+/g, '-')}`)}
                        >
                        Read More 
                        <img 
                          src={index % 4 === 0 ? up_arrow : up_arrow_white} 
                          alt="Tekla Structures" 
                          className="expertise-logo" 
                        />
                        </Button>
                    </div>
                </Card.Body>
              </Col>
              <Col md={6} className="pe-0 ps-0 bg-light blogcrd">
                <Card.Img
                  variant="top"
                  src={blog.img}
                  className="bg-light img-fluid blogcrd"
                />
              </Col>
            </>
          ) : (
            <>
              <Col md={6} className="pe-0 ps-0 bg-light blogcrd">
                <Card.Img
                  variant="top"
                  src={blog.img}
                  className="bg-light img-fluid blogcrd"
                />
              </Col>
              <Col
                md={6}
                className="ps-0 blogcrd"
                style={{ background: index % 4 === 0 ? "#EFEFEF" : "#000" , color: index % 4 === 0 ? "#000" : "#fff"}}
              >
                <Card.Body
                className="pt-4 pb-3 d-flex flex-column justify-content-between h-100"
                style={{
                    background: index % 4 === 0 ? "#EFEFEF" : "#000",
                    color: index % 4 === 0 ? "#000" : "#fff",
                }}
                >
                    <div className="flex-grow-1">
                        <Card.Title
                        className="blogCardTitle fw-bolder pt-lg-3"
                        style={{ fontWeight: "600", fontSize: "0.95rem", letterSpacing: "1.2px" }}
                        >
                        {blog.title.length > 23 ? blog.title.substring(0, 23) + "..." : blog.title}
                        </Card.Title>
                          {/* text-justify */}
                        <Card.Text className="blogCardDesc pt-3" dangerouslySetInnerHTML={{ __html: blog.shortDesc }} />
                    </div>
                    <div className="mt-auto">
                        <Button
                        variant="transparent"
                        className={`py-2 mt-xl-3 align-self-end fw-bolder blog_read_more_btn ${index % 4 === 0 ? "text-dark read_more_underline_animation" : "text-white read_more_white_underline_animation"}`}
                        onClick={() => navigate(`/blogdetails/${blog.title.toLowerCase().replace(/\s+/g, '-')}`)}
                        >
                        Read More 
                        <img 
                          src={index % 4 === 0 ? up_arrow : up_arrow_white} 
                          alt="Tekla Structures" 
                          className="expertise-logo" 
                        />
                        </Button>
                    </div>
                </Card.Body>
              </Col>
            </>
          )}
        </Row>
      </Card>
    </Col>
  );

  return (
    <>

      <Helmet>
        <title>Steel Detailing Blog | Insights, Tips, and News | ModeArch Steel</title>
        <meta name="description" content="Stay up-to-date with the latest insights, industry trends, and expert tips on steel detailing, BIM modeling, connection design, and more. Explore ModeArch Steel's blog for valuable resources." />
        <meta name="keywords" content="steel detailing blog, BIM modeling, connection design, steel fabrication, construction industry, steel detailing tips, structural steel, architecture, engineering" />
        <meta name="author" content="ModeArch Steel" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Steel Detailing Blog | Insights, Tips, and News | ModeArch Steel" />
        <meta property="og:description" content="Stay up-to-date with the latest insights, industry trends, and expert tips on steel detailing, BIM modeling, connection design, and more. Explore ModeArch Steel's blog for valuable resources." />
        <meta property="og:image" content="https://staging-v2.modearchsteel.com/static/media/blog_banner_img.545da9530ea787abe84e.png" /> 
        <meta property="og:url" content="https://staging-v2.modearchsteel.com/blog" /> 
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Steel Detailing Blog | Insights, Tips, and News | ModeArch Steel" />
        <meta name="twitter:description" content="Stay up-to-date with the latest insights, industry trends, and expert tips on steel detailing, BIM modeling, connection design, and more. Explore ModeArch Steel's blog for valuable resources." />
        <meta name="twitter:image" content="https://staging-v2.modearchsteel.com/static/media/blog_banner_img.545da9530ea787abe84e.png" /> 
        <meta name="twitter:site" content="@YourTwitterHandle" />
        <meta name="twitter:creator" content="@YourTwitterHandle" />
      </Helmet>

      <Navbar />

      <section className="g-0">
        <div className="container-fluid px-0">
          <img src={imageSrc} alt="Blog Banner" className="img-fluid w-100" />
        </div>
      </section>

      <section className='mt-4'>
        <div className='container'>
          <h1 className='text-center fw-bold'>Industry Insights & Innovations</h1>
          <div className='p-4 text-center'>
              {/* text-justify */}
            <p className='blog_page_title'>Stay ahead with expert insights, industry trends, and the latest advancements in steel detailing. Explore technical updates, project highlights, and best practices shaping the future of structural steel design and detailing.</p>
          </div>
        </div>
      </section>

      <Container id="blog">
        <Row className='text-center'>
          <h1 className='oueprd text-uppercase mt-3 mb-4 fw-bold'>Blog</h1>
        </Row>
      </Container>
      <Container fluid className="mb-5">
        {blogData.map((_, rowIndex) => (
          <Row className="px-4" key={rowIndex}>
            {blogData.slice(rowIndex * 2, rowIndex * 2 + 2).map((blog, index) =>
              renderBlogCard(blog, index, rowIndex % 2 === 1)
            )}
          </Row>
        ))}
      </Container>

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
};

export default Blog;