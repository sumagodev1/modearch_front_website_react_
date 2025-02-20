import React, { useEffect, useState } from "react";
import Navbar from "../layoutComponent/Navbar";
import Footer from "../layoutComponent/Footer";
import axios from "axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import blog_banner_img from "./images/blog/blog_banner_img.png";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const Blog = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState([]);
  const characterLimit = 200;

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
  }, []);

  const renderBlogCard = (blog, index, reverse) => (
    <Col key={blog.id} xl={6} lg={6} md={12} sm={12} className="my-2 my-lg-0">
      <Card className="border-0 h-100 text-white">
        <Row className="align-items-center">
          {reverse ? (
            <>
              <Col
                md={6}
                className="ps-0 blogcrd"
                style={{ background: index % 4 === 1 ? "#000" : "#EFEFEF" , color: index % 4 === 0 ? "#000" : "#fff" }}
              >
                <Card.Body
                  className="pt-4 pb-3 d-flex flex-column justify-content-between"
                  style={{ background: index % 4 === 1 ? "#000" : "#EFEFEF" , color: index % 4 === 0 ? "#000" : "#fff" }}
                >
                  <div>
                    <Card.Title
                      className="blogCardTitle fw-bolder pt-lg-3"
                      style={{ fontWeight: "600", fontSize: "0.95rem", letterSpacing: "1.2px" }}
                    >
                      {blog.title.length > 23 ? blog.title.substring(0, 23) + "..." : blog.title}
                    </Card.Title>
                    <Card.Text
                      className="blogCardDesc pt-3"
                      dangerouslySetInnerHTML={{ __html: blog.shortDesc }}
                    />
                  </div>
                  <div className="d-flex justify-content-start ">
                    <Button
                      variant="transparent"
                        className={`py-2 mt-xl-3 align-self-end fw-bolder ${index % 4 === 0 ? "text-dark" : "text-white"}`}
                      onClick={() => navigate(`/blogdetails/${blog.title.toLowerCase().replace(/\s+/g, '-')}`)}
                    >
                      Read More <i class="bi bi-arrow-up-right"></i>
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
                  className="pt-4 pb-3 d-flex flex-column justify-content-between"
                  style={{ background: index % 4 === 0 ? "#EFEFEF" : "#000" , color: index % 4 === 0 ? "#000" : "#fff" }}
                >
                  <div>
                    <Card.Title
                      className="blogCardTitle fw-bolder pt-3"
                      style={{ fontWeight: "600", fontSize: "0.95rem", letterSpacing: "1.2px" }}
                    >
                      {blog.title.length > 23 ? blog.title.substring(0, 23) + "..." : blog.title}
                    </Card.Title>
                    <Card.Text
                      className="blogCardDesc pt-3"
                      dangerouslySetInnerHTML={{ __html: blog.shortDesc }}
                    />
                  </div>
                  <div className="d-flex justify-content-start">
                    <Button
                      variant="transparent"
                        className={`py-2 mt-xl-3 align-self-end fw-bolder blog_read_more_btn ${index % 4 === 0 ? "text-dark" : "text-white"}`}
                      onClick={() => navigate(`/blogdetails/${blog.title.toLowerCase().replace(/\s+/g, '-')}`)}
                    >
                      Read More <i class="bi bi-arrow-up-right"></i>
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
      <Navbar />

      <section className="g-0">
        <div className="container-fluid px-0">
          <img src={blog_banner_img} alt="Blog Banner" className="img-fluid w-100" />
        </div>
      </section>

      <section className='mt-4'>
        <div className='container'>
          <h2 className='text-center'>Industry Insights & Innovations</h2>
          <div className='p-4 text-center'>
            <p className='blog_page_title'>Stay ahead with expert insights, industry trends, and the latest advancements in steel detailing. Explore technical updates, project highlights, and best practices shaping the future of structural steel design and detailing.</p>
          </div>
        </div>
      </section>

      <Container>
        <Row className='text-center'>
          <h1 className='oueprd text-uppercase mt-3 mb-4'>Blog</h1>
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
};

export default Blog;