import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Swal from 'sweetalert2';
import MessagesRest from '../../js/actions/MessagesRest';
import './Contact.css';

const Contact = ({ services = [], generals = [] }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [sending, setSending] = useState(false);
  
  const messagesRest = new MessagesRest();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const request = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      description: formData.message,
      service_id: null,
    };

    try {
      const result = await messagesRest.save(request);
      setSending(false);

      if (result) {
        // Redirect to thank you page
        window.location.href = "/thanks";
      }
    } catch (error) {
      setSending(false);
      console.error("Error sending message:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was a problem sending your message. Please try again.",
        confirmButtonColor: '#0066ff'
      });
    }
  };

  // Obtener información de contacto desde generals si está disponible
  const getGeneralValue = (correlative) => {
    const general = generals?.find(g => g.correlative === correlative);
    return general?.description || '';
  };

  const contactInfo = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 10.999H22C22 5.869 18.127 2 12.99 2V4C17.052 4 20 6.943 20 10.999Z" fill="currentColor"/>
          <path d="M13 8.00024C15.103 8.00024 16 8.89724 16 11.0002H18C18 7.77524 16.225 6.00024 13 6.00024V8.00024ZM16.422 13.4432C16.2298 13.2686 15.9773 13.1754 15.7178 13.1835C15.4583 13.1915 15.2122 13.3001 15.031 13.4862L12.638 15.9472C12.062 15.8372 10.904 15.4762 9.71204 14.2872C8.52004 13.0942 8.15904 11.9332 8.05204 11.3612L10.511 8.96724C10.6975 8.78633 10.8062 8.54005 10.8142 8.28039C10.8222 8.02073 10.7289 7.76813 10.554 7.57624L6.85904 3.51324C6.68408 3.32077 6.44092 3.2035 6.18119 3.18725C5.92146 3.17101 5.66564 3.25695 5.46804 3.42624L3.29804 5.28724C3.12515 5.46075 3.02196 5.69169 3.00804 5.93624C2.99304 6.18624 2.70704 12.1082 7.29904 16.7022C11.305 20.7072 16.323 21.0002 17.705 21.0002C17.907 21.0002 18.031 20.9942 18.064 20.9922C18.3085 20.9783 18.5392 20.8747 18.712 20.7012L20.572 18.5302C20.7414 18.3328 20.8275 18.0771 20.8113 17.8173C20.7952 17.5576 20.6781 17.3143 20.486 17.1392L16.422 13.4432Z" fill="currentColor"/>
        </svg>
      ),
      title: 'Phone',
      details: getGeneralValue('phone_contact') ? getGeneralValue('phone_contact').split('\n') : ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      link: `tel:${getGeneralValue('phone_contact')?.replace(/\D/g, '') || '+15551234567'}`
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
        </svg>
      ),
      title: 'Email',
      details: getGeneralValue('email_contact') ? getGeneralValue('email_contact').split('\n') : ['info@adktech.com', 'support@adktech.com'],
      link: `mailto:${getGeneralValue('email_contact') || 'info@adktech.com'}`
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
        </svg>
      ),
      title: 'Office',
      details: getGeneralValue('address') ? getGeneralValue('address').split('\n') : ['123 Tech Boulevard', 'Silicon Valley, CA 94025'],
      link: 'https://maps.google.com'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor"/>
        </svg>
      ),
      title: 'Business Hours',
      details: getGeneralValue('opening_hours') ? getGeneralValue('opening_hours').split('\n') : ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
      link: null
    }
  ];

  return (
    <section id="contact" className="contact section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's discuss how we can help transform your business with our technology solutions</p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info-section"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="contact-cards">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link || '#'}
                  className="contact-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -8 }}
                  onClick={!info.link ? (e) => e.preventDefault() : undefined}
                >
                  <div className="contact-card-icon">{info.icon}</div>
                  <div className="contact-card-content">
                    <h4 className="contact-card-title">{info.title}</h4>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="contact-card-detail">{detail}</p>
                    ))}
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              className="contact-cta-box"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="cta-content">
                <h3>Ready to Start Your Project?</h3>
                <p>Our team is available 24/7 to answer your questions and provide support. Let's build something amazing together.</p>
                <div className="cta-badges">
                  <div className="badge">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Fast Response</span>
                  </div>
                  <div className="badge">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15ZM12 15V23M8 23H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Expert Team</span>
                  </div>
                  <div className="badge">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L4 6V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V6L12 2ZM12 11.99H18C17.47 16.11 14.72 19.78 12 20.93V12H6V7.3L12 4.19V11.99Z" fill="currentColor"/>
                    </svg>
                    <span>Secure & Reliable</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="contact-form-section"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Felix Izquierdo"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="pepe@adkthecnology.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us about your project or inquiry..."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: sending ? 1 : 1.05 }}
                whileTap={{ scale: sending ? 1 : 0.95 }}
                disabled={sending}
              >
                {sending ? (
                  <>
                    <span className="loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="contact-background">
        <div className="contact-orb orb-1"></div>
        <div className="contact-orb orb-2"></div>
      </div>
    </section>
  );
};

export default Contact;
