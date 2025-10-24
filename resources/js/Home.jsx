import React, { useState, useEffect } from 'react';
import '../css/index.css';
import '../css/app.css';

import Hero from '../Adk/Hero/Hero';
import About from '../Adk/About/About';
import Services from '../Adk/Services/Services';
import ADKAssist from '../Adk/ADKAssist/ADKAssist';
import Contact from '../Adk/Contact/Contact';
import Footer from '../Adk/Footer/Footer';
import Navbar from '../Adk/Navbar/Navbar';
import CreateReactScript from './Utils/CreateReactScript';
import Base from './Components/Tailwind/Base';
import { createRoot } from 'react-dom/client';

const Home = ({ services = [], generals = [], sliders = [], indicators = [] }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <Navbar scrollY={scrollY} />
      <Hero scrollY={scrollY} sliders={sliders} indicators={indicators} />
      <About indicators={indicators} />
      <Services />
      <ADKAssist />
      <Contact services={services} generals={generals} />
      <Footer />
    </div>
  );
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Home {...properties} />
  </Base>);
});