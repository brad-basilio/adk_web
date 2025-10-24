import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ServiceModal.css';

const ServiceModal = ({ service, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="service-modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
          >
            <button className="modal-close" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="modal-header">
              <motion.div
                className="modal-icon !p-2"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                {service.icon ? (
                  <img src={`/api/service/media/${service.icon}`} alt={`${service.title} icon`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7V11C2 16.55 5.84 21.74 11 23C16.16 21.74 20 16.55 20 11V7L12 2Z" fill="currentColor"/>
                  </svg>
                )}
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {service.title}
              </motion.h2>
            </div>

            <div className="modal-content-grid">
              <motion.div
                className="modal-image-section"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <img src={`/api/service/media/${service.image}`} alt={service.title} />
                <div className="modal-image-overlay"></div>
              </motion.div>

              <div className="modal-scrollable">
                <div className="modal-info-section">
                  <motion.p
                    className="modal-main-description"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {service.description}
                  </motion.p>

                  <motion.div
                    className="modal-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3>Key Features</h3>
                    <div className="modal-features-grid">
                      {(service.characteristics || []).map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="modal-feature"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.7 + idx * 0.05 }}
                        >
                          <div className="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                            </svg>
                          </div>
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    className="modal-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <h3>Why Choose This Service?</h3>
                    <p className="modal-benefit-text">
                      {service.benefits}
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  className="modal-footer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <motion.button
                    className="modal-cta-button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Get Started</span>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
