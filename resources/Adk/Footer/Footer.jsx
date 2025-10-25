import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
  FaTelegram,
  FaDiscord,
  FaSnapchat,
  FaPinterest,
  FaReddit
} from 'react-icons/fa';
import ServiceModal from '../Services/ServiceModal';
import './Footer.css';

const Footer = ({ socials = [], services = [], generals = [] }) => {
  const currentYear = new Date().getFullYear();
  const [selectedService, setSelectedService] = useState(null);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [policyModalOpen, setPolicyModalOpen] = useState(false);

  // Mapeo de redes sociales a iconos
  const socialIcons = {
    facebook: FaFacebook,
    instagram: FaInstagram,
    twitter: FaTwitter,
    linkedin: FaLinkedin,
    youtube: FaYoutube,
    tiktok: FaTiktok,
    whatsapp: FaWhatsapp,
    telegram: FaTelegram,
    discord: FaDiscord,
    snapchat: FaSnapchat,
    pinterest: FaPinterest,
    reddit: FaReddit
  };

  // Función para mapear las redes sociales desde la BD
  const parseSocials = (socialsArray) => {
    if (!socialsArray || !Array.isArray(socialsArray)) return [];

    return socialsArray
      .filter(item => item && item.icon && item.link)
      .map(item => {
        // Buscar la clave del icono (ej: 'fab fa-facebook' -> 'facebook')
        const socialKey = Object.keys(socialIcons).find(key => 
          item.icon.includes(key) || item.description?.toLowerCase().includes(key)
        );
        
        if (!socialKey) return null;
        
        const IconComponent = socialIcons[socialKey];
        if (!IconComponent) return null;

        return {
          name: item.name || item.description || socialKey.charAt(0).toUpperCase() + socialKey.slice(1),
          icon: IconComponent,
          href: item.link
        };
      })
      .filter(item => item !== null);
  };

  const socialLinks = parseSocials(socials);

  // Obtener datos de generals
  const getGeneralValue = (correlative) => {
    const general = generals?.find(g => g.correlative === correlative);
    return general?.description || '';
  };

  // Links del Company (mismo que Navbar)
  const companyLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'ADK Assist', href: '#adk-assist' },
    { name: 'Contact', href: '#contact' }
  ];

  // Links de servicios dinámicos (limitados a 4)
  const serviceLinks = services.slice(0, 4).map(service => ({
    name: service.title,
    service: service,
    onClick: () => {
      setSelectedService(service);
      setServiceModalOpen(true);
    }
  }));

  // Links de Connect con políticas
  const connectLinks = [
    { name: 'Contact Us', href: '#contact' },
    { 
      name: 'Privacy Policy', 
      onClick: () => {
        setSelectedPolicy({
          title: 'Privacy Policy',
          content: getGeneralValue('privacy_policy')
        });
        setPolicyModalOpen(true);
      }
    },
    { 
      name: 'Terms of Service', 
      onClick: () => {
        setSelectedPolicy({
          title: 'Terms & Conditions',
          content: getGeneralValue('terms_conditions')
        });
        setPolicyModalOpen(true);
      }
    }
  ];

  const handleLinkClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="footer-logo">
              <img
                src="/assets/img/logo.png"
                alt="ADK Technology Logo"
                width="100px"
                className="h-14 !w-auto max-w-[100px]"
              />
            </div>
            <p className="footer-description">
              Empowering businesses with cutting-edge technology solutions
              for over 10 years. Innovation, security, and excellence in every project.
            </p>
            <div className="social-links">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.name}
                  >
                    <IconComponent size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            className="footer-links-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="footer-column">
              <h4 className="footer-title !font-bold">Company</h4>
              <ul className="footer-list">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="footer-link"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-title !font-bold">Services</h4>
              <ul className="footer-list">
                {serviceLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.onClick}
                      className="footer-link"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-title !font-bold">Connect</h4>
              <ul className="footer-list">
                {connectLinks.map((link, index) => (
                  <li key={index}>
                    {link.href ? (
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="footer-link"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <button
                        onClick={link.onClick}
                        className="footer-link"
                      >
                        {link.name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="copyright">
            &copy; {currentYear} ADK Technology. All rights reserved.
          </p>
          <p className="made-with">
            Powered by <span className="heart">❤️</span> Rhino Consulting And ADK Technology
          </p>
        </motion.div>
      </div>

      <div className="footer-background">
        <div className="footer-grid"></div>
      </div>

      {/* Modal de servicio */}
      <ServiceModal
        service={selectedService}
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
      />

      {/* Modal de políticas */}
      <AnimatePresence>
        {policyModalOpen && selectedPolicy && (
          <>
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPolicyModalOpen(false)}
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
              <button className="modal-close" onClick={() => setPolicyModalOpen(false)}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="modal-header">
                <motion.div
                  className="modal-icon"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedPolicy.title}
                </motion.h2>
              </div>

              <div className="modal-scrollable">
                <div className="modal-info-section">
                  <motion.div
                    className="modal-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div 
                      className="modal-policy-content"
                      dangerouslySetInnerHTML={{ __html: selectedPolicy.content }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
