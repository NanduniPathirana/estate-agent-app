import { useState } from 'react'
import { BASE_URL } from '../utils/env.js'
import './PropertyGallery.css'

// PropertyGallery: shows a large main image with a row of thumbnails below.
// Clicking a thumbnail swaps the main image. Clicking the main image (or an
// "View all photos" button) opens a simple full-screen lightbox that lets
// the user step through every image with Prev/Next controls.
function PropertyGallery({ images, altText }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const showPrev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  const showNext = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1))

  const base = BASE_URL

  return (
    <div className="property-gallery">
      <button
        type="button"
        className="gallery-main-image-btn"
        onClick={() => setLightboxOpen(true)}
        aria-label="Open full image gallery"
      >
        <img
          src={`${base}${images[activeIndex]}`}
          alt={`${altText} - photo ${activeIndex + 1}`}
          className="gallery-main-image"
        />
        <span className="gallery-view-all">View all {images.length} photos</span>
      </button>

      <div className="gallery-thumbnails">
        {images.map((img, index) => (
          <button
            type="button"
            key={img}
            className={`gallery-thumb-btn ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show photo ${index + 1}`}
          >
            <img src={`${base}${img}`} alt="" className="gallery-thumb-image" />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <div className="lightbox-backdrop" onClick={() => setLightboxOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close gallery"
            >
              &times;
            </button>

            <button
              type="button"
              className="lightbox-nav lightbox-prev"
              onClick={showPrev}
              aria-label="Previous photo"
            >
              &#8249;
            </button>

            <img
              src={`${base}${images[activeIndex]}`}
              alt={`${altText} - photo ${activeIndex + 1}`}
              className="lightbox-image"
            />

            <button
              type="button"
              className="lightbox-nav lightbox-next"
              onClick={showNext}
              aria-label="Next photo"
            >
              &#8250;
            </button>

            <p className="lightbox-counter">
              {activeIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default PropertyGallery