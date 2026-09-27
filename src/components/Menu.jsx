import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Menu.css';

// Load all JSON files synchronously using Vite's glob import
const menuModules = import.meta.glob('../content/menu/*.json', { eager: true });
const rawItems = Object.values(menuModules).map(mod => mod.default || mod);

// Assign specific or random photos based on category/title
const getPhotoForCategory = (cat, index, title) => {
    let images = [];

    if (title && title.includes('Deep Dish')) {
        return 'https://th.bing.com/th/id/OIP.KgompnIcs2HzE2M5O7s6CwHaHa';
    }

    if (cat.includes('Pizza') || cat.includes('Sourdough') || cat.includes('Dough')) {
        if (cat.includes('Sandwich') || cat.includes('Bread')) {
            images = [
                'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1481070555726-e2fe83577259?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80'
            ];
        } else {
            images = [
                'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=600&q=80'
            ];
        }
    } else if (cat.includes('Burger')) {
        images = [
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=600&q=80'
        ];
    } else if (cat.includes('Fries')) {
        images = [
            'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80'
        ];
    } else {
        images = [
            'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1572490122747-3968b65b0ad6?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80'
        ];
    }
    return images[index % images.length];
};

const safeItems = rawItems.map((item, i) => ({
    ...item,
    image: item.image || getPhotoForCategory(item.category, i, item.title)
}));

export default function Menu() {
    const [activeCategory, setActiveCategory] = useState(null);

    const categoriesMap = safeItems.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    const preferredOrder = [
        'Signature Sourdough', 'New York Style Sourdough', 'Classic Dough',
        'Chicago Style Deep Dish', 'Sourdough Garlic Bread', 'Sourdough Sandwich',
        'Burgers', 'Fries', 'Mocktails', 'Beverages'
    ];

    const categories = Object.keys(categoriesMap).sort((a, b) => {
        let indexA = preferredOrder.indexOf(a);
        let indexB = preferredOrder.indexOf(b);
        if (indexA === -1) indexA = 999;
        if (indexB === -1) indexB = 999;
        if (indexA === indexB) return a.localeCompare(b);
        return indexA - indexB;
    });

    return (
        <section id="menu" className="menu-section section-container">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
            >
                Our Menu
            </motion.h2>

            <AnimatePresence mode="wait">
                {!activeCategory ? (
                    <motion.div
                        key="category-view"
                        className="category-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {categories.map((cat, i) => (
                            <motion.div
                                key={cat}
                                className="category-card glass-panel"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(cat)}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <h3>{cat}</h3>
                                <p>{categoriesMap[cat].length} Items</p>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="items-view"
                        className="items-view"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                    >
                        <div className="items-header">
                            <button className="button-secondary" onClick={() => setActiveCategory(null)}>
                                &larr; Back to Categories
                            </button>
                            <h3 className="active-category-title">{activeCategory}</h3>
                        </div>

                        <div className="menu-grid">
                            {categoriesMap[activeCategory].map((item, index) => (
                                <motion.div
                                    key={item.title + index}
                                    className="menu-card glass-panel"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (index % 4) * 0.1 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="menu-image" style={{ backgroundImage: `url(${item.image})` }}>
                                        {item.isVeg && <span className="veg-badge">🌱</span>}
                                    </div>
                                    <div className="menu-content" style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <div className="menu-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                            <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>
                                                {item.title}
                                            </h4>
                                            <span className="price" style={{ color: 'var(--primary-color)', fontWeight: 'bold', whiteSpace: 'nowrap', marginLeft: '1rem' }}>{item.price}</span>
                                        </div>
                                        {item.description && <p className="menu-desc" style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: '1.4', margin: 0 }}>{item.description}</p>}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
