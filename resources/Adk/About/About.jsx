import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './About.css';

const About = ({ indicators = [] }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [selectedMember, setSelectedMember] = useState(null);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);

  const nextTeamSlide = () => {
    setCurrentTeamIndex((prev) => (prev + 1) % Math.ceil(teamMembers.length / 3));
  };

  const prevTeamSlide = () => {
    setCurrentTeamIndex((prev) =>
      prev === 0 ? Math.ceil(teamMembers.length / 3) - 1 : prev - 1
    );
  };

  const getVisibleTeamMembers = () => {
    const startIndex = currentTeamIndex * 3;
    return teamMembers.slice(startIndex, startIndex + 3);
  };

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
      bio: 'Visionary leader with 15+ years of experience in technology innovation and business strategy.',
      expertise: ['Leadership', 'Strategy', 'Innovation'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'sarah@adktech.com'
      }
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800',
      bio: 'Technology expert specializing in cloud architecture and cybersecurity solutions.',
      expertise: ['Cloud Architecture', 'DevOps', 'Security'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'michael@adktech.com'
      }
    },
    {
      name: 'Emily Rodriguez',
      role: 'Lead Security Consultant',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=800',
      bio: 'Cybersecurity specialist with expertise in threat detection and incident response.',
      expertise: ['Cybersecurity', 'Threat Analysis', 'Compliance'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'emily@adktech.com'
      }
    },
    {
      name: 'David Park',
      role: 'Senior Developer',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800',
      bio: 'Full-stack developer passionate about creating scalable and efficient solutions.',
      expertise: ['Full-Stack', 'React', 'Node.js'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'david@adktech.com'
      }
    },
    {
      name: 'Lisa Thompson',
      role: 'Project Manager',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=800',
      bio: 'Results-driven project manager ensuring seamless delivery of complex projects.',
      expertise: ['Agile', 'Scrum', 'Project Planning'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'lisa@adktech.com'
      }
    },
    {
      name: 'James Wilson',
      role: 'Tech Support Lead',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=800',
      bio: 'Customer-focused support specialist dedicated to solving technical challenges.',
      expertise: ['Technical Support', 'Customer Success', 'Training'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'james@adktech.com'
      }
    }
  ];

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
            <h2 className="section-title-minimal">About Us</h2>
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
                <h3 className="team-title-modern">Meet Our Team</h3>
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
                      <a href={member.social.linkedin} className="social-link" onClick={(e) => e.stopPropagation()}>
                        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                        </svg>
                      </a>
                      <a href={member.social.twitter} className="social-link" onClick={(e) => e.stopPropagation()}>
                        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.46 6c-.85.38-1.78.64-2.75.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.95-3.06 1.17A4.86 4.86 0 0 0 15.16 4a4.88 4.88 0 0 0-4.88 4.88c0 .38.04.75.13 1.1-4.06-.2-7.65-2.14-10.05-5.1-.42.73-.66 1.57-.66 2.48 0 1.69.86 3.18 2.17 4.05-.8-.02-1.55-.24-2.2-.6v.06c0 2.36 1.68 4.33 3.91 4.78-.41.11-.84.17-1.28.17-.31 0-.62-.03-.92-.08.63 1.95 2.44 3.37 4.6 3.41A9.8 9.8 0 0 1 1 19.54 13.8 13.8 0 0 0 8.5 22c9 0 13.93-7.46 13.93-13.93 0-.21 0-.42-.02-.63A9.94 9.94 0 0 0 24 5.39c-.89.4-1.85.67-2.86.75z"/>
                        </svg>
                      </a>
                      <a href={`mailto:${member.social.email}`} className="social-link" onClick={(e) => e.stopPropagation()}>
                        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      </a>
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

                <div className="modal-contact-section">
                  <h4 className="modal-section-title">Connect</h4>
                  <div className="modal-social-links">
                    <a href={selectedMember.social.linkedin} className="modal-social-link">
                      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                    <a href={selectedMember.social.twitter} className="modal-social-link">
                      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.46 6c-.85.38-1.78.64-2.75.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.95-3.06 1.17A4.86 4.86 0 0 0 15.16 4a4.88 4.88 0 0 0-4.88 4.88c0 .38.04.75.13 1.1-4.06-.2-7.65-2.14-10.05-5.1-.42.73-.66 1.57-.66 2.48 0 1.69.86 3.18 2.17 4.05-.8-.02-1.55-.24-2.2-.6v.06c0 2.36 1.68 4.33 3.91 4.78-.41.11-.84.17-1.28.17-.31 0-.62-.03-.92-.08.63 1.95 2.44 3.37 4.6 3.41A9.8 9.8 0 0 1 1 19.54 13.8 13.8 0 0 0 8.5 22c9 0 13.93-7.46 13.93-13.93 0-.21 0-.42-.02-.63A9.94 9.94 0 0 0 24 5.39c-.89.4-1.85.67-2.86.75z"/>
                      </svg>
                      <span>Twitter</span>
                    </a>
                    <a href={`mailto:${selectedMember.social.email}`} className="modal-social-link">
                      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      <span>Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default About;
