import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const staticGalleryDetails = {
  1: {
    category: "Steel Structures",
    images: [
      { src: gallery, title: "Steel Structure 1" },
      { src: gallery, title: "Steel Structure 2" },
      { src: gallery, title: "Steel Structure 3" },
    ],
  },
  2: {
    category: "Modern Buildings",
    images: [
      { src: gallery, title: "Modern Building 1" },
      { src: gallery, title: "Modern Building 2" },
      { src: gallery, title: "Modern Building 3" },
    ],
  },
  3: {
    category: "Industrial Projects",
    images: [
      { src: gallery, title: "Industrial Project 1" },
      { src: gallery, title: "Industrial Project 2" },
      { src: gallery, title: "Industrial Project 3" },
    ],
  },
};

const GalleryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const categoryData = staticGalleryDetails[id];

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!categoryData) {
    return <div className="container py-5 text-center"><h2>Category not found</h2></div>;
  }

  return (
    <>
      <Navbar />

      <section className="container py-5">
        <h2 className="text-center mb-4">{categoryData.category}</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {categoryData.images.map((img, i) => (
            <div key={i} className='col'>
              <div className='card shadow-sm gallery_card' onClick={() => { setIndex(i); setOpen(true); }} style={{ cursor: "pointer" }}>
                <img src={img.src} className='card-img-top gallery_img' alt={img.title} />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back to Gallery</button>
        </div>
      </section>

      {/* Lightbox with all features */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={categoryData.images.map(img => ({
          src: img.src,
          title: img.title,
        }))}
        plugins={[Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
        captions={{ showToggle: true }}
      />

      <Footer />
    </>
  );
};

export default GalleryDetails;
