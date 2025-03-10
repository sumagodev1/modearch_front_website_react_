import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Helmet } from 'react-helmet-async';
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


      {!isActive || !categoryData ? (
        <div className="container py-5 text-center">
          <h2 className="text-danger fw-bold">Images Not Found</h2>
          <p className="text-muted">The requested category images is either deactivated or does not exist.</p>
          {/* <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
            Back to Gallery
          </button> */}
        </div>
      ) : (
      <section className="container py-5" data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="200">
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
          width: 1600,  // Add width and height for proper zooming
          height: 1200,
        }))}
        plugins={[Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
        zoom={{
          maxZoomPixelRatio: 5,   // Increase zoom limit
          zoomInMultiplier: 2,    // Control zoom speed
          doubleTapDelay: 300,    // Allow double-tap to zoom
          doubleClickDelay: 300,  // Allow double-click to zoom
          doubleTapMaxDelay: 500,
        }}
        captions={{ showToggle: true }}
      />

      </section>

       )}


      <Footer />
    </>
  );
};

export default GalleryDetails;
