import React from 'react';
import { motion } from 'framer-motion';
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
import './Footer.css';

const Footer = ({ socials = [] }) => {
  const currentYear = new Date().getFullYear();

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

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Services', href: '#services' },
      { name: 'Careers', href: '#' },
      { name: 'Blog', href: '#' }
    ],
    services: [
      { name: 'Tech Support', href: '#services' },
      { name: 'Cyber Security', href: '#services' },
      { name: 'Smart Home', href: '#services' },
      { name: 'ADK Assist', href: '#adk-assist' }
    ],
    connect: [
      { name: 'Contact Us', href: '#contact' },
      { name: 'Support', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' }
    ]
  };

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
              <h4 className="footer-title">Company</h4>
              <ul className="footer-list">
                {footerLinks.company.map((link, index) => (
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
              <h4 className="footer-title">Services</h4>
              <ul className="footer-list">
                {footerLinks.services.map((link, index) => (
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
              <h4 className="footer-title">Connect</h4>
              <ul className="footer-list">
                {footerLinks.connect.map((link, index) => (
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
    </footer>
  );
};

export default Footer;
