import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ServiceModal from './ServiceModal';
import './Services.css';

const Services = ({ services = [] }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);



  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const handleCardClick = (index) => {
    setSelectedService(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 2; i++) {
      const index = (currentIndex + i) % services.length;
      cards.push({ ...services[index], originalIndex: index });
    }
    return cards;
  };

  return (
    <section id="services" className="services section" ref={ref}>
      <div className="container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Delivering cutting-edge technology solutions tailored to your business needs</p>
        </motion.div>

        <div className="carousel-container">
          <button className="carousel-btn prev" onClick={handlePrev}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="services-carousel">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="carousel-grid"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                {getVisibleCards().map((service, index) => (
                  <motion.div
                    key={`${currentIndex}-${index}`}
                    className="service-card"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    onClick={() => handleCardClick(service.originalIndex)}
                  >
                    <div className="service-card-image">
                      <img src={`/api/service/media/${service.image}`} alt={service.title} />
                      <div className="image-overlay"></div>
                      {service.icon && (
                        <div className="service-card-icon !p-2">
                          <img src={`/api/service/media/${service.icon}`} alt={`${service.title} icon`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                      )}
                    </div>

                    <div className="service-card-content">
                      <h3 className="service-card-title">{service.title}</h3>
                      <p className="service-card-description">{service.description}</p>

                      <div className="service-features-list">
                        {(service.characteristics || []).slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="feature-item-small">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                            </svg>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <motion.button
                        className="service-card-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(service.originalIndex);
                        }}
                      >
                        View Details
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.button>
                    </div>

                    <div className="service-card-number">0{service.originalIndex + 1}</div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button className="carousel-btn next" onClick={handleNext}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="carousel-indicators">
          {services.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      <ServiceModal
        service={selectedService !== null ? services[selectedService] : null}
        isOpen={modalOpen}
        onClose={closeModal}
      />

      <div className="services-background">
        <div className="service-orb orb-1"></div>
        <div className="service-orb orb-2"></div>
        <div className="service-orb orb-3"></div>
      </div>
    </section>
  );
};

export default Services;
