const fs = require('fs');

const menuItems = [
    // Signature Sourdough
    { id: 'margherita_classico', title: 'Margherita Classico', price: '₹320', category: 'Signature Sourdough', isVeg: true, description: "Classic tomato sauce paired with fresh mozzarella and Cheddar cheese, finished with aged Parmesan for a deep umami hit." },
    { id: 'verdure_trio', title: 'Verdure Trio', price: '₹350', category: 'Signature Sourdough', isVeg: true, description: "A vibrant mix of fresh onion, crunchy capsicum, and spicy jalapenos layered with premium cheese and zesty pizza sauce." },
    { id: 'veggie_house', title: 'Veggie House', price: '₹399', category: 'Signature Sourdough', isVeg: true, description: "A loaded veggie extravaganza atop our 48-hour sourdough base with a rich, herbaceous tomato sauce and generous cheese." },
    { id: 'spicy_korean_signature', title: 'Spicy Korean', price: '₹390', category: 'Signature Sourdough', isVeg: true, description: "Bold and tangy spicy fusion flavors inspired by Korean street food, topped with a bubbling layer of gooey cheese." },
    { id: 'cottage_feast', title: 'Cottage Feast', price: '₹450', category: 'Signature Sourdough', isVeg: true, description: "Premium spiced cottage cheese cubes (paneer), fiery jalapenos, and roasted capsicum melded in our signature cheese blend." },
    { id: 'makhani_cottage', title: 'Makhani Cottage', price: '₹450', category: 'Signature Sourdough', isVeg: true, description: "A rich, creamy makhani (butter masala) base topped with succulent cottage cheese bits, capsicum, and melted mozzarella." },
    { id: 'jain_special', title: 'Jain Special', price: '₹350', category: 'Signature Sourdough', isVeg: true, description: "Specially prepared without onion or garlic! Capsicum, olives, sweet corn, and jalapenos with a hearty Jain pizza sauce and cheese." },

    // Sourdough Sandwich
    { id: 'veg_sandwich', title: 'Veg Sandwich', price: '₹160', category: 'Sourdough Sandwich', isVeg: true, description: "Farm-fresh veggies nestled between thick slices of grilled sourdough, tossed with your choice of Makhani or Tandoori sauce." },
    { id: 'veg_garlic_sandwich', title: 'Veg Garlic Sandwich', price: '₹199', category: 'Sourdough Sandwich', isVeg: true, description: "An ultimate flavor bomb! Garlic-infused sourdough buttered to perfection, loaded with veggies and Makhani/Tandoori sauce." },
    { id: 'paneer_sandwich', title: 'Paneer Sandwich', price: '₹240', category: 'Sourdough Sandwich', isVeg: true, description: "Hearty slabs of marinated paneer layered with crunchy veggies and wrapped in golden sourdough toast." },

    // Fries
    { id: 'classic_fries', title: 'Classic Fries', price: '₹70', category: 'Fries', isVeg: true, description: "Crispy, golden, and double-fried to perfection. The ultimate timeless sidekick." },
    { id: 'peri_peri_fries', title: 'Peri Peri Fries', price: '₹99', category: 'Fries', isVeg: true, description: "Our perfectly crispy fries tossed heavily in a fiery, tangy house-made Peri Peri seasoning." },
    { id: 'cheese_loaded_fries', title: 'Cheese Loaded Fries', price: '₹120', category: 'Fries', isVeg: true, description: "A sinful mountain of fries drenched in a hot, gooey, and rich melted cheese cascade." },

    // Classic Dough Pizza
    { id: 'margherita_classic_dough', title: 'Margherita', price: '₹150 (M) / ₹290 (L)', category: 'Classic Dough', isVeg: true, description: "The absolute classic. A robust tomato base smothered in mozzarella and Cheddar cheese on our standard fermented dough." },
    { id: 'capsicum_onion', title: 'Capsicum n Onion', price: '₹180 (M) / ₹299 (L)', category: 'Classic Dough', isVeg: true, description: "A nostalgic favorite combining fresh crisp capsicum ribbons and onion rings with melted cheese and rich tomato sauce." },
    { id: 'spicy_veggie_trio', title: 'Spicy Veggie Trio', price: '₹190 (M) / ₹310 (L)', category: 'Classic Dough', isVeg: true, description: "A powerful punch of onion, capsicum, and hot jalapenos loaded up with mozzarella and our secret pizza sauce." },
    { id: 'farmhouse_delight', title: 'Farmhouse Delight', price: '₹199 (M) / ₹350 (L)', category: 'Classic Dough', isVeg: true, description: "A loaded veggie bonanza! Our classic crust piled high with farm-fresh toppings, rich sauce, and generous cheese." },
    { id: 'paneer_makhani_classic', title: 'Paneer Makhani', price: '₹230 (M) / ₹390 (L)', category: 'Classic Dough', isVeg: true, description: "Creamy, buttery makhani gravy forms the base of this Indian fusion favorite, topped with marinated paneer and crisp capsicum." },
    { id: 'spicy_paneer', title: 'Spicy Paneer', price: '₹230 (M) / ₹390 (L)', category: 'Classic Dough', isVeg: true, description: "Tender paneer cubes kicked up a notch with fiery jalapenos, capsicum, and a unique spicy cheese blend." },
    { id: 'spicy_korean_classic', title: 'Spicy Korean', price: '₹210 (M) / ₹350 (L)', category: 'Classic Dough', isVeg: true, description: "Our traditional crust holding bold, tangy, and spicy Korean fusion flavors covered by a sweet heat sauce and gooey cheese." },

    // Burgers
    { id: 'aloo_tikki_burger', title: 'Aloo Tikki Burger', price: '₹70', category: 'Burgers', isVeg: true, description: "A crispy, perfectly seasoned potato patty served in a soft toasted bun with crisp fresh lettuce and our house mayo." },
    { id: 'classic_veg_burger', title: 'Classic Veg Burger', price: '₹110', category: 'Burgers', isVeg: true, description: "A hearty mixed vegetable patty, perfectly crusted and served with classic American cheese and crunchy vegetables." },
    { id: 'makhani_veg_burger', title: 'Makhani Veg Burger', price: '₹130', category: 'Burgers', isVeg: true, description: "An Indo-western masterpiece! Our veggie patty drenched in a rich, buttery makhani sauce nestled in a fresh bun." },
    { id: 'tandoori_veg_burger', title: 'Tandoori Veg Burger', price: '₹130', category: 'Burgers', isVeg: true, description: "A smoky and spicy tandoori-marinated veg patty, charred to perfection and packed with bold Indian flavors." },
    { id: 'spicy_veg_burger', title: 'Spicy Veg Burger', price: '₹150', category: 'Burgers', isVeg: true, description: "Bring on the heat! A specially crafted spicy vegetable patty accompanied by hot sauce and jalapenos." },

    // Beverages
    { id: 'hot_coffee', title: 'Hot Coffee', price: '₹40', category: 'Beverages', isVeg: true, description: "A smooth, rich, and aromatic 100% arabica blend to jumpstart your senses." },
    { id: 'hot_chocolate', title: 'Hot Chocolate', price: '₹50', category: 'Beverages', isVeg: true, description: "A comforting mug of thick, creamy melted dark chocolate and steamed whole milk." },
    { id: 'cold_coffee', title: 'Cold Coffee', price: '₹80', category: 'Beverages', isVeg: true, description: "A refreshing, classic frappe-style iced coffee, perfectly sweetened and deeply chilled." },
    { id: 'oreo_shake', title: 'Oreo Shake', price: '₹99', category: 'Beverages', isVeg: true, description: "Creamy vanilla soft serve brutally blended with a blizzard of crushed Oreos." },
    { id: 'strawberry_shake', title: 'Strawberry Shake', price: '₹99', category: 'Beverages', isVeg: true, description: "A luscious burst of fresh strawberry milkshake, crowned with whipped cream." },
    { id: 'mango_shake', title: 'Mango Shake', price: '₹99', category: 'Beverages', isVeg: true, description: "Tropical summer in a glass: real mango puree blended into a remarkably thick shake." },

    // New York Style Sourdough
    { id: 'margherita_classico_ny', title: 'Margherita Classico (NY)', price: '₹190 (M)', category: 'New York Style Sourdough', isVeg: true, description: "New York's finest! Our legendary sourdough stretched thin into massive, foldable slices, finished with aged Parmesan." },
    { id: 'verdure_trio_ny', title: 'Verdure Trio (NY)', price: '₹230 (M)', category: 'New York Style Sourdough', isVeg: true, description: "A thin, foldable NY crust holding the perfect trinity of fresh onions, crisp capsicum, and hot jalapenos." },
    { id: 'veggie_house_ny', title: 'Veggie House (NY)', price: '₹250 (M)', category: 'New York Style Sourdough', isVeg: true, description: "Generously loaded with vibrant veggies! Our huge NY-style crust provides the perfect bed for this rich, wholesome pie." },
    { id: 'spicy_korean_ny', title: 'Spicy Korean (NY)', price: '₹250 (M)', category: 'New York Style Sourdough', isVeg: true, description: "Bold Korean fusion flavors—sweet, salty, and spicy—spread over our famous oversized New York crust." },
    { id: 'cottage_feast_ny', title: 'Cottage Feast (NY)', price: '₹280 (M)', category: 'New York Style Sourdough', isVeg: true, description: "Massive slices that melt in your mouth, studded with spicy paneer cottage cheese cubes, jalapenos, and capsicum." },
    { id: 'makhani_cottage_ny', title: 'Makhani Cottage (NY)', price: '₹280 (M)', category: 'New York Style Sourdough', isVeg: true, description: "A butter paneer makhani curry turned into an epic, foldable New York style pizza. Simply incredible." },
    { id: 'jain_special_ny', title: 'Jain Special (NY)', price: '₹250 (M)', category: 'New York Style Sourdough', isVeg: true, description: "No root vegetables—just pure flavor! Generous capsicum, olives, corn, and jalapenos on our giant NY thin base." },

    // Sourdough Garlic Bread
    { id: 'plain_garlic_bread', title: 'Plain Garlic Bread', price: '₹99', category: 'Sourdough Garlic Bread', isVeg: true, description: "Our signature sourdough slathered in an aromatic compound garlic butter, toasted to a devastating crunch." },
    { id: 'cheese_garlic_bread', title: 'Cheese Garlic Bread', price: '₹140', category: 'Sourdough Garlic Bread', isVeg: true, description: "The classic garlic bread upgraded with a heavy blanket of melted mozzarella that pulls beautifully with every bite." },
    { id: 'corn_jalapeno_bread', title: 'Corn n Jalapenos Bread', price: '₹160', category: 'Sourdough Garlic Bread', isVeg: true, description: "Spicy, sweet, and incredibly cheesy! A robust sourdough base baked with golden corn, fiery jalapenos, and mozzarella." },

    // Chicago Style Deep Dish 
    { id: 'deep_dish_pizza', title: 'Deep Dish Pizza', price: '₹320', category: 'Chicago Style Deep Dish', isVeg: true, description: "A towering, pie-like deep dish pizza. In-house fresh dough forms a high crust, packed with insane amounts of cheese and chunky tomato sauce." },

    // Mocktails
    { id: 'mint_mojito', title: 'Mint Mojito', price: '₹99', category: 'Mocktails', isVeg: true, description: "An icy, refreshing blast of muddled mint, fresh lime juice, and sparkling soda water." },
    { id: 'blue_lagoon', title: 'Blue Lagoon', price: '₹99', category: 'Mocktails', isVeg: true, description: "A visually stunning, cool, and sweet citrus drink that tastes like a tropical beach vacation." },
    { id: 'watermelon_punch', title: 'Watermelon Punch', price: '₹99', category: 'Mocktails', isVeg: true, description: "A fruity and incredibly hydrating mocktail driven by fresh watermelon juice and subtle tropical notes." },
    { id: 'pepsi', title: 'Pepsi', price: '₹50', category: 'Mocktails', isVeg: true, description: "A chilled, classic soda—the perfect sparkling companion for our robust sourdough pizzas." },
];

if (!fs.existsSync('./src/content/menu')) { fs.mkdirSync('./src/content/menu', { recursive: true }); }

menuItems.forEach(item => {
    const content = JSON.stringify({
        title: item.title,
        description: item.description,
        price: item.price,
        category: item.category,
        image: ``,
        isVeg: item.isVeg
    }, null, 2);
    fs.writeFileSync(`./src/content/menu/${item.id}.json`, content);
});

console.log("Generated ALL menu items with descriptions!");
