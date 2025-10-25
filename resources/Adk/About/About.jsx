import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
  FaReddit,
  FaEnvelope
} from 'react-icons/fa';
import './About.css';

const About = ({ indicators = [], staff = [] }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [selectedMember, setSelectedMember] = useState(null);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);

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
    reddit: FaReddit,
    email: FaEnvelope
  };

  // Función para parsear las redes sociales del nuevo formato
  const parseSocials = (socialsArray) => {
    if (!socialsArray || !Array.isArray(socialsArray)) return [];

    return socialsArray.map(item => {
      if (!item || !item.social || !item.link) return null;
      
      const IconComponent = socialIcons[item.social];
      if (!IconComponent) return null;

      return {
        type: item.social,
        link: item.link,
        icon: IconComponent,
        name: item.social.charAt(0).toUpperCase() + item.social.slice(1)
      };
    }).filter(item => item !== null);
  };

  // Mapear staff de la BD al formato del componente
  const teamMembers = staff.length > 0
    ? staff.map(member => ({
        name: member.name,
        role: member.job,
        image: `/api/staff/media/${member.image}`,
        bio: member.description,
        expertise: member.characteristics || [],
        socials: parseSocials(member.socials)
      }))
    : [];

  const nextTeamSlide = () => {
    if (teamMembers.length === 0) return;
    setCurrentTeamIndex((prev) => (prev + 1) % Math.ceil(teamMembers.length / 3));
  };

  const prevTeamSlide = () => {
    if (teamMembers.length === 0) return;
    setCurrentTeamIndex((prev) =>
      prev === 0 ? Math.ceil(teamMembers.length / 3) - 1 : prev - 1
    );
  };

  const getVisibleTeamMembers = () => {
    if (teamMembers.length === 0) return [];
    const startIndex = currentTeamIndex * 3;
    return teamMembers.slice(startIndex, startIndex + 3);
  };



  // Features eliminados - ahora se usan los indicators dinámicos

  return (
    <section id="about" className="about section" ref={ref}>
      <div className="about-background-minimal">
        <div className="minimal-line line-vertical-1"></div>
        <div className="minimal-line line-vertical-2"></div>
        <div className="minimal-line line-horizontal-1"></div>
        <div className="minimal-dot dot-1"></div>
        <div className="minimal-dot dot-2"></div>
        <div className="minimal-dot dot-3"></div>
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="about-header-minimal"
        >
          <motion.div className="about-number">01</motion.div>
          <div>
            <h2 className="section-title-minimal !font-bold">About Us</h2>
            <p className="section-subtitle-minimal">Trusted Technology Partner</p>
          </div>
        </motion.div>

        <div className="about-main-content">
          <motion.div
            className="about-text-minimal"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="main-paragraph">
              Our company is a trusted provider of technology solutions with over 10 years
              of experience in the industry. At ADK Tech, we take pride in our expertise in
              identifying and selecting exceptional talent to meet our clients' unique needs.
            </p>
            <p className="main-paragraph">
              We are dedicated to providing swift and efficient solutions without compromising
              the quality of our work. This commitment drives us to deliver innovative and
              tailored solutions that equip our clients with the necessary tools to
              successfully achieve their business objectives.
            </p>
          </motion.div>

          {indicators.length > 0 && (
            <motion.div
              className="features-minimal"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {indicators.map((indicator, index) => (
                <motion.div
                  key={indicator.id || index}
                  className="feature-minimal"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  
                  <div className="feature-number-minimal">{indicator.name}</div>
                  <div className="feature-label-minimal">{indicator.description}</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {teamMembers.length > 0 && (
          <motion.div
            className="team-section-modern"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
          <div className="team-header-modern">
            <div className="team-header-content">
              <motion.div className="team-number-modern">02</motion.div>
              <div>
                <h3 className="team-title-modern !font-bold">Meet Our Team</h3>
                <p className="team-subtitle-modern">Experts driving innovation forward</p>
              </div>
            </div>
            <div className="team-carousel-controls">
              <button
                className="team-carousel-btn team-carousel-btn-prev"
                onClick={prevTeamSlide}
                aria-label="Previous team members"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                className="team-carousel-btn team-carousel-btn-next"
                onClick={nextTeamSlide}
                aria-label="Next team members"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="team-carousel-wrapper">
            <div className="team-grid-modern">
              {getVisibleTeamMembers().map((member, index) => (
              <motion.div
                key={index}
                className="team-card-modern"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedMember(member)}
              >
                <div className="team-card-inner">
                  <div className="team-image-wrapper">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="team-image-modern"
                    />
                    <div className="team-gradient-overlay"></div>
                    <div className="team-hover-icon">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  <div className="team-content-modern">
                    <h4 className="team-name-modern">{member.name}</h4>
                    <p className="team-role-modern">{member.role}</p>

                    <div className="team-expertise">
                      {member.expertise.slice(0, 2).map((skill, idx) => (
                        <span key={idx} className="expertise-tag">{skill}</span>
                      ))}
                    </div>

                    <div className="team-social">
                      {member.socials && member.socials.slice(0, 3).map((social, idx) => {
                        const IconComponent = social.icon;
                        return (
                          <a 
                            key={idx}
                            href={social.link} 
                            className="social-link" 
                            onClick={(e) => e.stopPropagation()}
                            title={social.name}
                          >
                            <IconComponent size={18} />
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  <div className="team-card-border"></div>
                </div>
              </motion.div>
              ))}
            </div>
          </div>

          <div className="team-carousel-indicators">
            {Array.from({ length: Math.ceil(teamMembers.length / 3) }).map((_, idx) => (
              <button
                key={idx}
                className={`team-indicator ${idx === currentTeamIndex ? 'active' : ''}`}
                onClick={() => setCurrentTeamIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
        )}
      </div>

      {selectedMember && (
        <motion.div
          className="team-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedMember(null)}
        >
          <motion.div
            className="team-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setSelectedMember(null)}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="modal-content">
              <div className="modal-image-section">
                <img src={selectedMember.image} alt={selectedMember.name} />
                <div className="modal-image-overlay"></div>
              </div>

              <div className="modal-info-section">
                <h3 className="modal-name">{selectedMember.name}</h3>
                <p className="modal-role">{selectedMember.role}</p>

                <p className="modal-bio">{selectedMember.bio}</p>

                <div className="modal-expertise-section">
                  <h4 className="modal-section-title">Expertise</h4>
                  <div className="modal-expertise-grid">
                    {selectedMember.expertise.map((skill, idx) => (
                      <span key={idx} className="modal-expertise-tag">{skill}</span>
                    ))}
                  </div>
                </div>

                {selectedMember.socials && selectedMember.socials.length > 0 && (
                  <div className="modal-contact-section">
                    <h4 className="modal-section-title">Connect</h4>
                    <div className="modal-social-links">
                      {selectedMember.socials.map((social, idx) => {
                        const IconComponent = social.icon;
                        return (
                          <a key={idx} href={social.link} className="modal-social-link">
                            <IconComponent size={20} />
                            <span>{social.name}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default About;
