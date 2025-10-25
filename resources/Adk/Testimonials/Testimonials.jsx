import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Testimonials.css';

const Testimonials = ({ testimonies = [] }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filtrar solo testimonios visibles
  const visibleTestimonies = testimonies.filter(t => t.visible);

  if (visibleTestimonies.length === 0) return null;

  const scrollToTestimony = (index) => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const cards = slider.querySelectorAll('.testimony-card');
      if (cards[index]) {
        const cardWidth = cards[index].offsetWidth;
        const gap = 32; // 2rem gap
        const scrollPosition = (cardWidth + gap) * index;
        
        slider.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
        setCurrentIndex(index);
      }
    }
  };

  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : visibleTestimonies.length - 1;
    scrollToTestimony(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < visibleTestimonies.length - 1 ? currentIndex + 1 : 0;
    scrollToTestimony(newIndex);
  };

  // Auto-scroll
  useEffect(() => {
    if (visibleTestimonies.length <= 1) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [currentIndex, visibleTestimonies.length]);

  return (
    <section id="testimonials" className="testimonials section" ref={ref}>
      <div className="testimonials-background">
        <div className="testimonial-orb orb-1" />
        <div className="testimonial-orb orb-2" />
        <div className="testimonial-orb orb-3" />
        <div className="grid-pattern" />
      </div>

      <div className="container">
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="section-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Testimonials
          </motion.span>
          <h2 className="section-title !font-bold">What Our Clients Say</h2>
          <p className="section-subtitle">
            Real experiences from those who trust our services
          </p>
        </motion.div>

        <div className="carousel-container">
          {visibleTestimonies.length > 1 && (
            <motion.button
              className="carousel-btn carousel-prev"
              onClick={handlePrev}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </motion.button>
          )}

          <motion.div
            className="testimonials-slider"
            ref={sliderRef}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {visibleTestimonies.map((testimony, index) => (
              <motion.div
                key={testimony.id}
                className="testimony-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="card-shine" />
                <div className="card-border-glow" />
                
                <div className="testimony-content">
                  <div className="quote-section">
                    <div className="quote-icon-wrapper">
                      <svg className="quote-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                      </svg>
                    </div>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <motion.svg
                          key={i}
                          className="star"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </motion.svg>
                      ))}
                    </div>
                  </div>

                  <p className="testimony-text">
                    "{testimony.description}"
                  </p>

                  <div className="testimony-footer">
                    <div className="author-section">
                      <div className="author-image-wrapper">
                        <div className="image-glow" />
                        <img 
                          src={`/api/testimony/media/${testimony.image}`}
                          alt={testimony.name}
                          className="author-image"
                          onError={(e) => e.target.src = '/api/cover/thumbnail/null'}
                        />
                      </div>
                      <div className="author-info">
                        <h4 className="author-name">{testimony.name}</h4>
                        {testimony.case && (
                          <p className="author-case">{testimony.case}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="verified-badge">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                      </svg>
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {visibleTestimonies.length > 1 && (
            <motion.button
              className="carousel-btn carousel-next"
              onClick={handleNext}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.button>
          )}
        </div>

        {visibleTestimonies.length > 1 && (
          <motion.div
            className="testimonials-navigation"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {visibleTestimonies.map((_, index) => (
              <button
                key={index}
                className={`nav-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => scrollToTestimony(index)}
                aria-label={`Go to testimony ${index + 1}`}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
