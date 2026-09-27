import React from 'react';
import { motion } from 'framer-motion';
import './Gallery.css';

export default function Gallery() {
    const photos = [
        './images/gallery/1.jpg',
        './images/gallery/2.jpg',
        './images/gallery/3.jpg',
        './images/gallery/4.jpg',
        './images/gallery/5.jpg',
        './images/gallery/6.jpg'
    ];

    return (
        <section id="gallery" className="gallery-section section-container">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Sneak Peeks
            </motion.h2>

            <div className="gallery-grid">
                {photos.map((url, i) => (
                    <motion.div
                        key={i}
                        className="gallery-item glass-panel"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ delay: (i % 3) * 0.1 }}
                    >
                        <div className="gallery-image" style={{ backgroundImage: `url(${url})` }}></div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
