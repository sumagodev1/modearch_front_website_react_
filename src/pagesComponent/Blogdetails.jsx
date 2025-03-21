import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../layoutComponent/Navbar";
import Footer from "../layoutComponent/Footer";
// import blog_banner_img from "./images/blog/blog_banner_img.png";
import blog_bannerimgDesktop  from "./images/blog/blog_banner_img.png";
import blog_bannerimgMobile from "./images/blog/blog_bannerimgMobile.png";
import './Blog.css'
import AOS from "aos";
import "aos/dist/aos.css";

const Blogdetails = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false, // Whether animation should only happen once
    });
  }, []);

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


  const { title } = useParams();
  const [blogDetails, setBlogDetails] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`/blogdetails/get-blogdetails`);
        if (response.data.result) {
          const selectedBlog = response.data.responseData.find(
            (blog) => blog.title.toLowerCase().replace(/\s+/g, "-") === title
          );
          setBlogDetails(selectedBlog);
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlogDetails();
  }, [title]);

  if (!blogDetails) {
    return (
      <div className="text-center py-5">
        <h3>Loading Blog Details...</h3>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <section className="g-0">
        <div className="container-fluid px-0">
          <img src={imageSrc} alt="Blog Banner" className="img-fluid w-100" />
        </div>
      </section>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="mt-4"><b>{blogDetails.title}</b></h2>
          </div>
        </div>
      </div>

      <div className="container mt-5" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="500">
        <div className="text-center">
          <img
            src={blogDetails.img}
            alt={blogDetails.title}
            className="img-fluid"
          />
        </div>
       
        <p className="blog_description mt-3 text-justify">{blogDetails.shortDesc}</p>
        <div
          className="mt-3 text-justify"
          dangerouslySetInnerHTML={{ __html: blogDetails.longDesc }}
        />
      </div>

      <Footer />
    </>
  );
};

export default Blogdetails;
