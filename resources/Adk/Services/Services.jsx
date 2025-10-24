import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ServiceModal from './ServiceModal';
import './Services.css';

const Services = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const services = [
    {
      title: 'Tech Support',
      image: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Comprehensive technical assistance and troubleshooting solutions for all your technology needs, available 24/7.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C9.6 0.5 5.6 0.5 3.1 3C0.6 5.5 0.6 9.5 3.1 12C5 13.9 7.7 14.4 10 13.5L13 16.5V19H15V17.5L16.5 19L18 17.5L19.5 19L22.7 19ZM5 10C3.9 10 3 9.1 3 8C3 6.9 3.9 6 5 6C6.1 6 7 6.9 7 8C7 9.1 6.1 10 5 10Z" fill="currentColor"/>
        </svg>
      ),
      features: [
        'Technical Troubleshooting',
        'Product Support',
        'Software Solutions',
        'Hardware Assistance',
        'Remote Support',
        'On-Site Assistance',
        'Network Setup & Configuration',
        'System Optimization'
      ],
      benefits: 'Our tech support team provides rapid response times and expert solutions to keep your business running smoothly. With 24/7 availability and a proven track record of resolving complex technical issues, we ensure minimal downtime and maximum productivity for your organization.'
    },
    {
      title: 'Cyber Security',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Advanced cybersecurity solutions to protect your business from evolving digital threats and ensure data integrity.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="currentColor"/>
        </svg>
      ),
      features: [
        'Endpoint Protection',
        'Identity & Access Management',
        'Firewall Management',
        'Intrusion Detection',
        'Penetration Testing',
        'Incident Response',
        'Cloud Security',
        'Managed Detection & Response',
        'Security Audits',
        'Compliance Management'
      ],
      benefits: 'Protect your digital assets with enterprise-grade security solutions. Our comprehensive approach combines advanced threat detection, proactive monitoring, and rapid incident response to safeguard your business against cyber threats. Stay compliant with industry regulations while maintaining robust security posture.'
    },
    {
      title: 'Smart Home',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Transform your living space with cutting-edge smart home automation and integrated control systems.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="currentColor"/>
        </svg>
      ),
      features: [
        'Smart Security Systems',
        'Home Automation',
        'Smart Lighting Control',
        'Climate Control',
        'Entertainment Systems',
        'Voice Assistant Integration',
        'Home Networking',
        'Remote Monitoring',
        'Energy Management',
        'Smart Appliances'
      ],
      benefits: 'Experience the future of living with our smart home solutions. Enjoy enhanced comfort, improved energy efficiency, and complete control of your home environment from anywhere. Our expert installation and seamless integration ensure your smart home works perfectly with your lifestyle.'
    },
    {
      title: 'Cloud Solutions',
      image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Scalable cloud infrastructure and migration services to power your business growth and digital transformation.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04Z" fill="currentColor"/>
        </svg>
      ),
      features: [
        'Cloud Migration',
        'Infrastructure as a Service',
        'Cloud Storage Solutions',
        'Backup & Disaster Recovery',
        'Multi-Cloud Management',
        'Cost Optimization',
        'DevOps Integration',
        'Scalability Solutions'
      ],
      benefits: 'Leverage the power of cloud computing to scale your business efficiently. Our cloud solutions provide flexibility, reliability, and cost-effectiveness while ensuring your data is secure and accessible. From migration to ongoing management, we handle all aspects of your cloud infrastructure.'
    }
  ];

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
                      <img src={service.image} alt={service.title} />
                      <div className="image-overlay"></div>
                      <div className="service-card-icon">
                        {service.icon}
                      </div>
                    </div>

                    <div className="service-card-content">
                      <h3 className="service-card-title">{service.title}</h3>
                      <p className="service-card-description">{service.description}</p>

                      <div className="service-features-list">
                        {service.features.slice(0, 4).map((feature, idx) => (
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
