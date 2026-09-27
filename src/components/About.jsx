import React from 'react';
import { motion } from 'framer-motion';
import './About.css';
import infoData from '../content/outlet/info.json';

export default function About() {
    return (
        <section id="about" className="about-section section-container">
            <div className="about-grid">
                <motion.div
                    className="about-text"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>Our Story</h2>
                    <p>{infoData.about}</p>

                    <div className="contact-info" style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem', fontFamily: 'var(--font-title)' }}>Visit Us</h3>
                        <p style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>📍 {infoData.address}</p>
                        <p style={{ margin: '0', fontWeight: 'bold' }}>📞 {infoData.phone}</p>
                    </div>
                </motion.div>

                <motion.div
                    className="about-image-wrapper glass-panel"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <img
                        src="./images/gallery/1.jpg"
                        alt="Dough Lab Cafe"
                        className="about-image"
                    />
                </motion.div>
            </div>
        </section>
    );
}
