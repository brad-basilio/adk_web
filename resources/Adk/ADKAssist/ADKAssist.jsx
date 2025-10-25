import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ADKAssist.css';

const ADKAssist = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const phoneY = useTransform(scrollYProgress, [0, 0.5, 1], [200, 0, -200]);
  const phoneRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 0, 15]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 1, 1, 0.7]);

  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const featuresLeftY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const featuresRightY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const orb1X = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const orb2X = useTransform(scrollYProgress, [0, 1], [100, -100]);

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
    <section id="adk-assist" className="adk-assist section" ref={ref}>
      <div className="assist-background">
        <motion.div
          className="gold-orb orb-1"
          style={{ x: orb1X }}
        />
        <motion.div
          className="gold-orb orb-2"
          style={{ x: orb2X }}
        />
        <motion.div
          className="parallax-layer layer-1"
          style={{ y: layer1Y }}
        />
        <motion.div
          className="parallax-layer layer-2"
          style={{ y: layer2Y }}
        />
        <motion.div
          className="parallax-layer layer-3"
          style={{ y: layer3Y }}
        />
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
          <motion.div
            className="features-column features-left"
            style={{ y: featuresLeftY }}
          >
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
          </motion.div>

          <motion.div
            className="phone-mockup-parallax"
            style={{
              y: phoneY,
              rotateY: phoneRotate,
              scale: phoneScale
            }}
          >
            <div className="phone-frame">
              <div className="phone-notch"></div>
              <div className="phone-screen">
                <div className="app-header">
                  <motion.div
                    className="app-logo"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(212, 175, 55, 0.5)",
                        "0 0 20px rgba(212, 175, 55, 0.8)",
                        "0 0 10px rgba(212, 175, 55, 0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ADK
                  </motion.div>
                  <div className="app-title">Assist</div>
                </div>
                <div className="app-content">
                  <motion.div
                    className="status-card"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(212, 175, 55, 0.2)",
                        "0 0 40px rgba(212, 175, 55, 0.4)",
                        "0 0 20px rgba(212, 175, 55, 0.2)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <motion.div
                      className="status-icon"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      ✓
                    </motion.div>
                    <div className="status-text">All Systems Operational</div>
                  </motion.div>
                  <div className="quick-actions">
                    <motion.div
                      className="action-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      New Ticket
                    </motion.div>
                    <motion.div
                      className="action-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Live Chat
                    </motion.div>
                  </div>
                  <div className="recent-activity">
                    {[
                      { text: 'Ticket #1234 Resolved', delay: 0 },
                      { text: 'Security Scan Complete', delay: 0.2 },
                      { text: 'System Update Available', delay: 0.4 }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="activity-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: item.delay, duration: 0.5 }}
                      >
                        <motion.div
                          className="activity-dot"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: idx * 0.3
                          }}
                        />
                        <div className="activity-text">{item.text}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
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
          </motion.div>

          <motion.div
            className="features-column features-right"
            style={{ y: featuresRightY }}
          >
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
          </motion.div>
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

      <motion.div
        className="floating-particles"
        style={{ y: layer2Y }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default ADKAssist;
