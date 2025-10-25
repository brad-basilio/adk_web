import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ADKAssist.css';

const ADKAssist = () => {
  const sectionRef = useRef(null);
  const mockupRef = useRef(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const [mockupInView, setMockupInView] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Configuración de las pantallas de la app
  const appScreens = [
    {
      id: 1,
      image: '/assets/adkassist/1.webp',
      title: 'Access Your Assistance in Seconds',
      subtitle: 'Secure login screen against a city backdrop.'
    },
    {
      id: 2,
      image: '/assets/adkassist/2.webp',
      title: 'Your Devices at a Glance',
      subtitle: 'Home screen showing your profile, location, and registered devices.'
    },
    {
      id: 3,
      image: '/assets/adkassist/3.webp',
      title: 'Manage and Create Support Tickets Quickly',
      subtitle: 'Tickets screen with filters and list of existing support tickets.'
    },
    {
      id: 4,
      image: '/assets/adkassist/4.webp',
      title: 'Create a Support Ticket Quickly and Easily',
      subtitle: 'Screen for creating a new support ticket with all necessary fields.'
    },
    {
      id: 5,
      image: '/assets/adkassist/5.webp',
      title: 'Complete Technical Details of the Problem',
      subtitle: 'Ticket Details screen with problem description and device specs.'
    },
    {
      id: 6,
      image: '/assets/adkassist/6.webp',
      title: 'Complete Ticket Notification History',
      subtitle: 'Notifications screen showing ticket updates and appointments.'
    },
    {
      id: 7,
      image: '/assets/adkassist/7.webp',
      title: 'Real-Time Ticket Notifications',
      subtitle: 'Pop-up notification with assigned technician and status updates.'
    },
    {
      id: 8,
      image: '/assets/adkassist/8.webp',
      title: 'Your Profile and Contact',
      subtitle: 'Profile screen with personal information and contact details.'
    },
    {
      id: 9,
      image: '/assets/adkassist/9.webp',
      title: 'Total Control over your Session',
      subtitle: 'Profile screen with logout confirmation dialog.'
    },
    {
      id: 10,
      image: '/assets/adkassist/10.webp',
      title: 'Elegant Design and Dark Mode',
      subtitle: 'Home screen in Dark Mode highlighting user profile and devices.'
    }
  ];

  // Detectar cuando el mockup está completamente visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setMockupInView(entry.isIntersecting && entry.intersectionRatio >= 0.8);
      },
      { threshold: 0.8 } // 80% del mockup debe estar visible
    );

    if (mockupRef.current) {
      observer.observe(mockupRef.current);
    }

    return () => {
      if (mockupRef.current) {
        observer.unobserve(mockupRef.current);
      }
    };
  }, []);

  // Manejar scroll con wheel event y throttle
  useEffect(() => {
    const handleWheel = (e) => {
      // Solo bloquear si el mockup está visible Y no estamos en la última imagen
      if (!mockupInView || currentScreen >= appScreens.length - 1) return;

      // Si estamos en transición, ignorar el scroll
      if (isTransitioning) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const delta = e.deltaY;

      // Si estamos viendo las imágenes
      if (delta > 0) {
        // Scroll hacia abajo
        if (currentScreen < appScreens.length - 1) {
          e.preventDefault();
          e.stopPropagation();
          
          setIsTransitioning(true);
          setCurrentScreen(prev => prev + 1);
          
          // Liberar después de 800ms (duración de la transición)
          setTimeout(() => {
            setIsTransitioning(false);
          }, 800);
        }
        // Si llegamos a la última imagen, NO prevenir - permitir scroll normal
      } else {
        // Scroll hacia arriba
        if (currentScreen > 0) {
          e.preventDefault();
          e.stopPropagation();
          
          setIsTransitioning(true);
          setCurrentScreen(prev => prev - 1);
          
          // Liberar después de 800ms
          setTimeout(() => {
            setIsTransitioning(false);
          }, 800);
        }
        // Si estamos en la primera imagen, permitir scroll normal hacia arriba
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('wheel', handleWheel, { passive: false });
      return () => section.removeEventListener('wheel', handleWheel);
    }
  }, [mockupInView, currentScreen, isTransitioning, appScreens.length]);

  // Combinar refs
  const combinedRef = (node) => {
    sectionRef.current = node;
    ref(node);
  };

  const features = [
    {
      icon: '🕐',
      title: '24/7 Remote Support',
      description: 'Access expert tech support any time, day or night.',
      position: 'left'
    },
    {
      icon: '👨‍💻',
      title: 'In-Person Assistance',
      description: 'When needed, technicians will visit to resolve complex issues.',
      position: 'right'
    },
    {
      icon: '🛡️',
      title: 'Monthly Cybersecurity Reports',
      description: 'Regular updates to keep your systems safe and secure.',
      position: 'left'
    },
    {
      icon: '📋',
      title: 'User-Friendly Ticketing System',
      description: 'Easily log and track issues with our intuitive interface.',
      position: 'right'
    },
    {
      icon: '⚡',
      title: 'Quick Resolution Times',
      description: 'Swift action to minimize downtime and maximize productivity.',
      position: 'left'
    },
    {
      icon: '📱',
      title: 'Available on Apple Store',
      description: 'Download and access features directly from your device.',
      position: 'right'
    }
  ];

  const leftFeatures = features.filter(f => f.position === 'left');
  const rightFeatures = features.filter(f => f.position === 'right');

  return (
    <section 
      id="adk-assist" 
      className="adk-assist section" 
      ref={combinedRef}
    >
      <div className="assist-background">
        <div className="gold-orb orb-1" />
        <div className="gold-orb orb-2" />
        <div className="parallax-layer layer-1" />
        <div className="parallax-layer layer-2" />
        <div className="parallax-layer layer-3" />
      </div>

      <div className="container">
        <motion.div
          className="assist-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title gold-title !font-bold">ADK Assist</h2>
          <p className="section-subtitle gold-subtitle">Your Personal Tech Support Companion</p>
        </motion.div>

        <div className="assist-parallax-scene">
          <div className="features-column features-left">
            {leftFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="assist-feature"
                initial={{ opacity: 0, x: -100 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ x: 10, scale: 1.05 }}
              >
                <div className="feature-icon-circle">{feature.icon}</div>
                <div className="feature-content">
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="phone-mockup-parallax" ref={mockupRef}>
            <div className="phone-frame">
              <div className="phone-notch"></div>
              <div className="phone-screen">
                {/* Solo las imágenes cambian */}
                {appScreens.map((screen, index) => (
                  <motion.div
                    key={screen.id}
                    className="app-screen-image"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: currentScreen === index ? 2 : 1
                    }}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: currentScreen === index ? 1 : 0,
                      scale: currentScreen === index ? 1 : 0.95
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                  >
                    <img 
                      src={screen.image} 
                      alt={screen.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '32px'
                      }}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="phone-button"></div>
            </div>

            <motion.div
              className="phone-glow"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>

          <div className="features-column features-right">
            {rightFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="assist-feature"
                initial={{ opacity: 0, x: 100 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ x: -10, scale: 1.05 }}
              >
                <div className="feature-icon-circle">{feature.icon}</div>
                <div className="feature-content">
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Información de la pantalla actual */}
        <div className="screen-info-section" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="screen-info-content"
            >
              <h3 className="screen-title">{appScreens[currentScreen].title}</h3>
              <p className="screen-subtitle">{appScreens[currentScreen].subtitle}</p>
              <div className="screen-indicator">
                {appScreens.map((_, idx) => (
                  <motion.div
                    key={idx}
                    className={`indicator-dot ${idx === currentScreen ? 'active' : ''}`}
                    animate={{
                      scale: idx === currentScreen ? 1.5 : 1,
                      opacity: idx === currentScreen ? 1 : 0.4
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="app-store-section"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a
            href="#"
            className="app-store-button"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 60px rgba(212, 175, 55, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="store-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
              </svg>
            </div>
            <div className="store-text">
              <div className="store-label">Download on the</div>
              <div className="store-name">App Store</div>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ADKAssist;
