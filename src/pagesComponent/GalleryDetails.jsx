import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import Navbar from "../layoutComponent/Navbar";
import Footer from "../layoutComponent/Footer";
import gallery from './images/gallery/gallery.png';
import './Gallery.css';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Import plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// const staticGalleryDetails = {
//   1: {
//     category: "Steel Structures",
//     images: [
//       { src: gallery, title: "Steel Structure 1" },
//       { src: gallery, title: "Steel Structure 2" },
//       { src: gallery, title: "Steel Structure 3" },
//     ],
//   },
//   2: {
//     category: "Modern Buildings",
//     images: [
//       { src: gallery, title: "Modern Building 1" },
//       { src: gallery, title: "Modern Building 2" },
//       { src: gallery, title: "Modern Building 3" },
//     ],
//   },
//   3: {
//     category: "Industrial Projects",
//     images: [
//       { src: gallery, title: "Industrial Project 1" },
//       { src: gallery, title: "Industrial Project 2" },
//       { src: gallery, title: "Industrial Project 3" },
//     ],
//   },
// };

const GalleryDetails = () => {
  const { gallery_category } = useParams();
  const id = localStorage.getItem('objid');
  const [categoryData, setCategoryData] = useState(null);
  const navigate = useNavigate();


  // useEffect(() => {
  //   const fetchProjectDetails = async () => {
  //     try {
  //       const response = await axios.get(
  //         `/galleryImages/galleryImages/${id}`
  //       );
  //       console.log("galleryImages",response.data);
  //       setCategoryData(response.data);
  //       console.log("categoryData",categoryData);
  //       const galleryData = response.data;

  //       if (typeof galleryData.gallery_images === "string") {
  //         galleryData.gallery_images = JSON.parse(galleryData.gallery_images);
  //       }

  //       if (response.data.result) {
  //         const selectedBlog = response.data.responseData.find(
  //           (gallery) =>
  //             gallery.gallery_category.toLowerCase().replace(/\s+/g, "-") ===
  //           gallery_category
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error fetching blog details:", error);
  //     }
  //   };

  //   fetchProjectDetails();
  // }, [gallery_category]);
  

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`/galleryImages/galleryImages/${id}`);
        console.log("galleryImages", response.data);
  
        // Check if isActive is true, then do not update the state
        if (response.data.isActive) {
          console.log("Data is deactive, not setting categoryData");
          return; // Exit the function early
        }
  
        setCategoryData(response.data);
        console.log("categoryData", categoryData);
  
        const galleryData = response.data;
  
        if (typeof galleryData.gallery_images === "string") {
          galleryData.gallery_images = JSON.parse(galleryData.gallery_images);
        }
  
        if (response.data.result) {
          const selectedBlog = response.data.responseData.find(
            (gallery) =>
              gallery.gallery_category.toLowerCase().replace(/\s+/g, "-") ===
              gallery_category
          );
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };
  
    fetchProjectDetails();
  }, [gallery_category]);
  

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const [isActive, setIsActive] = useState(true);

  // if (!categoryData) {
  //   return <div className="container py-5 text-center"><h2>Category not found</h2></div>;
  // }

  return (
    <>
      <Navbar />


      {!isActive || !categoryData ? (
        <div className="container py-5 text-center">
          <h2 className="text-danger fw-bold">Category Not Found</h2>
          <p className="text-muted">The requested category is either deactivated or does not exist.</p>
          {/* <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
            Back to Gallery
          </button> */}
        </div>
      ) : (
      <section className="container py-5">
        <h2 className="text-center mb-4">{categoryData.gallery_category}</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {categoryData.gallery_images.map((img, i) => (
            <div key={i} className='col'>
              <div className='card shadow-sm gallery_card' onClick={() => { setIndex(i); setOpen(true); }} style={{ cursor: "pointer" }}>
                <img src={`${axios.defaults.baseURL}${img}`} className='card-img-top gallery_img' alt={img.gallery_category} />
              </div>
            </div>
          ))}
        </div>
        {/* <div className="text-center mt-4">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back to Gallery</button>
        </div> */}

          <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={categoryData.gallery_images.map(img => ({
            src: `${axios.defaults.baseURL}${img}`,
          }))}
          plugins={[Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
          captions={{ showToggle: true }}
        />

      </section>

       )}


      <Footer />
    </>
  );
};

export default GalleryDetails;
