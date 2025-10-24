import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

const Hero = ({ scrollY, sliders = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const parallaxY = scrollY * 0.3;

  // Función para parsear el título y extraer texto normal y highlight
  const parseTitle = (title) => {
    if (!title) return { normal: '', highlight: '' };
    
    const parts = title.split('*');
    if (parts.length >= 3) {
      // Formato: "texto normal *highlight*" o "*highlight* texto normal"
      if (title.startsWith('*')) {
        return {
          normal: parts[2] || '',
          highlight: parts[1] || ''
        };
      } else {
        return {
          normal: parts[0] || '',
          highlight: parts[1] || ''
        };
      }
    }
    // Si no hay asteriscos, todo es texto normal
    return { normal: title, highlight: '' };
  };

  // Usar sliders de la base de datos o fallback a los hardcoded
  const defaultSlides = [
  ];

  // Mapear sliders de la BD al formato del componente
  const slides = sliders.length > 0 
    ? sliders.map(slider => {
        const parsedTitle = parseTitle(slider.name);
        return {
          image: `/api/sliders/media/${slider.image}`,
          tag: slider.tag || '',
          title: parsedTitle.normal,
          titleHighlight: parsedTitle.highlight,
          description: slider.description || ''
        };
      })
    : defaultSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  // Si no hay slides, no renderizar nada
  if (sliders.length === 0) {
    return null;
  }

  return (
    <section id="home" className="hero">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="hero-background-image"
          style={{
            transform: `translateY(${parallaxY}px)`,
            backgroundImage: `url('${currentSlideData.image}')`
          }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2 }}
        >
          <div className="image-overlay"></div>
        </motion.div>
      </AnimatePresence>

      <div className="container hero-container">
        <div className="hero-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={`tag-${currentSlide}`}
              className="hero-tag"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <span className="tag-dot"></span>
              {currentSlideData.tag}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${currentSlide}`}
              className="hero-title"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {currentSlideData.title}
              <span className="title-highlight"> {currentSlideData.titleHighlight}</span>
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${currentSlide}`}
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {currentSlideData.description}
            </motion.p>
          </AnimatePresence>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              className="btn btn-primary"
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Services
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in Touch
            </button>
          </motion.div>
        </div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {[
            { number: '10+', label: 'Years Experience' },
            { number: '500+', label: 'Projects Completed' },
            { number: '24/7', label: 'Support Available' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="scroll-indicator">
        <motion.div
          className="scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;