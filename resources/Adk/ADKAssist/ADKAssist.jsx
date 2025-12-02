import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import AppRequestModal from './AppRequestModal';
import './ADKAssist.css';

const ADKAssist = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentFeatureSlide, setCurrentFeatureSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Detectar si es mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handlers para pausar/reanudar autoplay
  const handleMouseEnter = () => {
    if (swiperInstance && swiperInstance.autoplay) {
      swiperInstance.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperInstance && swiperInstance.autoplay) {
      swiperInstance.autoplay.start();
    }
  };

  // Handlers para swipe de features
  const handleFeatureSwipe = (event, info) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      // Swipe derecha - feature anterior
      setCurrentFeatureSlide((prev) => (prev - 1 + features.length) % features.length);
    } else if (info.offset.x < -threshold) {
      // Swipe izquierda - feature siguiente
      setCurrentFeatureSlide((prev) => (prev + 1) % features.length);
    }
  };

  // Configuración de las pantallas de la app - TODAS SIN EFECTO 3D (planas)
  const appScreens = [
    {
      id: 1,
      image: '/assets/adkassist/1.webp',
      title: 'Access Your Assistance',
      subtitle: 'in Seconds',
      description: 'Quick and secure authentication to access all your devices and support tickets.',
      animation: {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        x: 0,
        y: 0
      }
    },
    {
      id: 2,
      image: '/assets/adkassist/2.webp',
      title: 'Your Devices',
      subtitle: 'at a Glance',
      description: 'Manage all your registered devices from a centralized dashboard with real-time status.',
      animation: {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        x: 0,
        y: 0
      }
    },
    {
      id: 3,
      image: '/assets/adkassist/3.webp',
      title: 'Manage Support Tickets',
      subtitle: 'Quickly & Easily',
      description: 'Track all your support requests with powerful filters and instant status updates.',
      animation: {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        x: 0,
        y: 0
      }
    },
    {
      id: 4,
      image: '/assets/adkassist/4.webp',
      title: 'Create Tickets',
      subtitle: 'in One Tap',
      description: 'Intuitive form to report issues with auto-detection of device specifications.',
      animation: {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        x: 0,
        y: 0
      }
    },
    {
      id: 5,
      image: '/assets/adkassist/5.webp',
      title: 'Complete Technical',
      subtitle: 'Details',
      description: 'Detailed view of each ticket with complete technical information and resolution history.',
      animation: {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        x: 0,
        y: 0
      }
    },
    {
      id: 6,
      image: '/assets/adkassist/6.webp',
      title: 'Notification',
      subtitle: 'History',
      description: 'Never miss an update with our comprehensive notification system.',
      animation: {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        x: 0,
        y: 0
      }
    },
    {
      id: 7,
      image: '/assets/adkassist/7.webp',
      title: 'Real-Time',
      subtitle: 'Notifications',
      description: 'Instant push notifications keep you informed about every step.',
      animation: {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        x: 0,
        y: 0
      }
    },
    {
      id: 8,
      image: '/assets/adkassist/8.webp',
      title: 'Your Profile',
      subtitle: '& Contact',
      description: 'Manage your personal information and preferences in one location.',
      animation: {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        x: 0,
        y: 0
      }
    },
    {
      id: 9,
      image: '/assets/adkassist/9.webp',
      title: 'Total Control',
      subtitle: 'over Sessions',
      description: 'Secure session management with quick logout and account security.',
      animation: {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        x: 0,
        y: 0
      }
    },
    {
      id: 10,
      image: '/assets/adkassist/10.webp',
      title: 'Elegant Design',
      subtitle: '& Dark Mode',
      description: 'Beautiful dark mode design that\'s easy on the eyes.',
      animation: {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        x: 0,
        y: 0
      }
    }
  ];

  const features = [
    { icon: '/assets/imgcards/support.png', title: '24/7 Remote Support', description: 'Access expert tech support any time, day or night.' },
    { icon: '/assets/imgcards/assitance.png', title: 'In-Person Assistance', description: 'When needed, technicians will visit to resolve complex issues.' },
    { icon: '/assets/imgcards/cybersecurity.png', title: 'Monthly Cybersecurity Reports', description: 'Regular updates to keep your systems safe and secure.' },
    { icon: '/assets/imgcards/ticketing.png', title: 'User-Friendly Ticketing System', description: 'Easily log and track issues with our intuitive interface.' },
    { icon: '/assets/imgcards/quiktimes.png', title: 'Quick Resolution Times', description: 'Swift action to minimize downtime and maximize productivity.' },
    { icon: '/assets/imgcards/appstore.png', title: 'Available on Apple Store', description: 'Download and access features directly from your device.' }
  ];

  return (
    <section
      id="adk-assist"
      className="adk-assist section"
      ref={ref}
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title gold-title !font-bold">ADK Assist</h2>
          <p className="section-subtitle gold-subtitle">Your Personal Tech Support Companion</p>
        </motion.div>

        {/* Slider Unificado - Desktop y Mobile con Swiper */}
        <div className="app-showcase-slider">
          <div className="slider-container">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              speed={600}
              onSwiper={setSwiperInstance}
              onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
              navigation={{
                prevEl: '.slider-arrow-left',
                nextEl: '.slider-arrow-right',
              }}
              pagination={{
                el: '.slider-pagination',
                clickable: true,
                bulletClass: 'pagination-dot',
                bulletActiveClass: 'active',
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              className="adk-assist-swiper"
            >
              {appScreens.map((screen, index) => (
                <SwiperSlide key={screen.id}>
                  <div className="slider-content">
                    {/* Phone Mockup 3D */}
                    <div className="slider-mockup">
                      <div className="phone-mockup-3d">
                        <div className="phone-reflection"></div>

                        <div className="phone-frame-3d">
                          <div className="phone-bezel">
                            <div className="bezel-highlight"></div>
                          </div>

                          <div className="phone-notch-3d"></div>

                          <div className="phone-screen-3d">
                            <div className="screen-glare"></div>
                            <img
                              src={screen.image}
                              alt={screen.title}
                              className="screen-image-3d"
                            />
                          </div>

                          <div className="phone-power-button"></div>
                          <div className="phone-volume-buttons">
                            <div className="volume-up"></div>
                            <div className="volume-down"></div>
                          </div>
                        </div>

                        <div className="phone-shadow-3d"></div>
                      </div>
                    </div>

                    {/* Información */}
                    <div className="slider-info">
                      <span className="slider-number">0{index + 1}</span>
                      <h3 className="slider-title">{screen.title}</h3>
                      <h4 className="slider-subtitle">{screen.subtitle}</h4>
                      <p className="slider-description">{screen.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Arrows - Laterales */}
            <button
              className="slider-arrow slider-arrow-left"
              aria-label="Previous slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              className="slider-arrow slider-arrow-right"
              aria-label="Next slide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Pagination Dots - Estilo Hero */}
          <div className="slider-pagination"></div>
        </div>

        {/* Features Grid Final */}
        <div className="features-grid-final">
          {/* Desktop: Grid normal */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="features-grid"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="assist-feature"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="feature-icon-circle">
                    <img src={feature.icon} alt={feature.title} />
                  </div>
                  <div className="feature-content">
                    <h4 className="feature-title">{feature.title}</h4>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Mobile: Swiper de Features */}
          {isMobile && (
            <div className="features-swiper-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeatureSlide}
                  className="features-swiper-slide"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleFeatureSwipe}
                >
                  <div className="assist-feature">
                    <div className="feature-icon-circle">{features[currentFeatureSlide].icon}</div>
                    <div className="feature-content">
                      <h4 className="feature-title">{features[currentFeatureSlide].title}</h4>
                      <p className="feature-description">{features[currentFeatureSlide].description}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Dots - Solo abajo */}
              <div className="features-dots">
                {features.map((_, index) => (
                  <button
                    key={index}
                    className={`feature-dot ${index === currentFeatureSlide ? 'active' : ''}`}
                    onClick={() => setCurrentFeatureSlide(index)}
                    aria-label={`Go to feature ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <motion.div
          className="app-store-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="store-buttons-container">
            <motion.a
              href="https://apps.apple.com/pe/app/adk-assist-v2-0/id6753195828?l=en-GB"
              target="_blank"
              rel="noopener noreferrer"
              className="app-store-button"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 60px rgba(212, 175, 55, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="store-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
              </div>
              <div className="store-text">
                <div className="store-label">Download on the</div>
                <div className="store-name">App Store</div>
              </div>
            </motion.a>

            <motion.button
              onClick={() => setShowRequestModal(true)}
              className="request-info-button"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 60px rgba(212, 175, 55, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="request-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
                </svg>
              </div>
              <div className="request-text">
                <div className="request-label">Need More Info?</div>
                <div className="request-name">Contact Us</div>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Request Info Modal */}
      <AppRequestModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
      />
    </section>
  );
};

export default ADKAssist;
