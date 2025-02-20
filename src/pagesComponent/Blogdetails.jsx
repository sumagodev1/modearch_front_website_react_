import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../layoutComponent/Navbar";
import Footer from "../layoutComponent/Footer";
import blog_banner_img from "./images/blog/blog_banner_img.png";
import './Blog.css'

const Blogdetails = () => {
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
          <img src={blog_banner_img} alt="Blog Banner" className="img-fluid w-100" />
        </div>
      </section>

      <div className="container mt-5">
        <div className="text-center">
          <img
            src={blogDetails.img}
            alt={blogDetails.title}
            className="img-fluid"
          />
        </div>
        <h2 className="mt-4">{blogDetails.title}</h2>
        <p className="blog_description mt-3">{blogDetails.shortDesc}</p>
        <div
          className="mt-3"
          dangerouslySetInnerHTML={{ __html: blogDetails.longDesc }}
        />
      </div>

      <Footer />
    </>
  );
};

export default Blogdetails;
