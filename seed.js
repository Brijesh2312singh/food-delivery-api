require("dotenv").config();
const mongoose = require("mongoose");

const Banner = require("./models/Banner");
const Category = require("./models/Category");
const Restaurant = require("./models/Restaurant");
const Food = require("./models/Food");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

    console.log("DB Connected");

    await Banner.deleteMany();
    await Category.deleteMany();
    await Restaurant.deleteMany();
    await Food.deleteMany();

    // Banners
    const banners = [];
    for (let i = 1; i <= 10; i++) {
        banners.push({
            image: `https://picsum.photos/300/150?random=${i}`
        });
    }
    await Banner.insertMany(banners);

    // Categories
    const categories = [
        "Pizza","Burger","Biryani","Chinese","South Indian",
        "North Indian","Desserts","Drinks","Fast Food","Snacks"
    ];

    const categoryData = categories.map((name, i) => ({
        name,
        image: `https://picsum.photos/100?random=${i + 10}`
    }));

    await Category.insertMany(categoryData);

    // Restaurants
    const restaurants = await Restaurant.insertMany(
        Array.from({ length: 20 }).map((_, i) => ({
            name: `Restaurant ${i + 1}`,
            image: `https://picsum.photos/200?random=${i + 50}`,
            rating: (Math.random() * 2 + 3).toFixed(1),
            deliveryTime: `${20 + i} mins`,
            category: categories[i % categories.length]
        }))
    );

    // Foods
    const foodNames = ["Pizza","Burger","Biryani","Noodles","Dosa","Paneer","Ice Cream"];

    const foods = [];

    for (let i = 1; i <= 40; i++) {
        const r = restaurants[Math.floor(Math.random() * restaurants.length)];

        foods.push({
            name: `${foodNames[i % foodNames.length]} ${i}`,
            price: Math.floor(Math.random() * 300) + 100,
            image: `https://picsum.photos/150?random=${i + 100}`,
            restaurantId: r._id
        });
    }

    await Food.insertMany(foods);

    console.log("🔥 Seed Data Inserted");
    process.exit();

})
.catch(err => console.log(err));