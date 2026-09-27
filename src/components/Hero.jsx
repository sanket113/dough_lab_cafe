import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import infoData from '../content/outlet/info.json';

export default function Hero() {
    const videoId = "T3AHBe0I0yc";

    return (
        <div className="hero-container">
            <div className="hero-video-wrapper">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&disablekb=1`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    style={{ width: '100%', height: '100%' }}
                ></iframe>
            </div>
            <div className="hero-overlay"></div>
            <motion.div
                className="hero-content"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <h1 className="hero-title">{infoData.title}</h1>
                <p className="hero-subtitle">Wood-fired perfection in every bite.</p>
                <motion.button
                    className="button-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
                >
                    Explore Menu
                </motion.button>
            </motion.div>
        </div>
    );
}
