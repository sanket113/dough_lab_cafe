import React from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import './Navbar.css';

export default function Navbar() {
    const { scrollY } = useScroll();
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const background = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255, 255, 255, 0.05)", "rgba(13, 13, 13, 0.8)"]
    );

    return (
        <motion.nav
            className="navbar glass-panel"
            style={{ background }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="nav-brand">
                <img src="./logo.png" alt="Dough Lab Logo" className="navbar-logo" />
            </div>
            <div className="nav-links">
                <a href="#menu">Menu</a>
                <a href="#about">Our Story</a>
                <div
                    className="order-dropdown-container"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                >
                    <button className="order-link">
                        Order Now ▼
                    </button>
                    <AnimatePresence>
                        {dropdownOpen && (
                            <motion.div
                                className="order-dropdown glass-panel"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <a href="https://www.zomato.com/kolhapur/dough-lab-rajarampuri/order">Zomato</a>
                                <a href="https://www.swiggy.com/city/kolhapur/dough-lab-8th-lane-rajarampuri-rest1222749">Swiggy</a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.nav>
    );
}
