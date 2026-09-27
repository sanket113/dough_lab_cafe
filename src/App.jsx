import React from 'react';
import { motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollToTop from './components/ScrollToTop';
import Menu from './components/Menu';
import About from './components/About';
import Gallery from './components/Gallery';

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <Hero />
      <Menu />
      <Gallery />
      <About />
      <ScrollToTop />
    </motion.div>
  );
}

export default App;
