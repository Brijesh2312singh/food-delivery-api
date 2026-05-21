const mongoose = require("mongoose");

const Banner = require("./models/Banner");
const Category = require("./models/Category");
const Restaurant = require("./models/Restaurant");
const Food = require("./models/Food");

mongoose.connect("mongodb+srv://admin:admin123@cluster0.vg2wkpw.mongodb.net/foodApp")
.then(async () => {

    console.log("DB Connected");

    await Banner.deleteMany();
    await Category.deleteMany();
    await Restaurant.deleteMany();
    await Food.deleteMany();

    // ================= BANNERS =================
    const banners = [];
    for (let i = 1; i <= 10; i++) {
        banners.push({
            image: `https://picsum.photos/300/150?random=${i}`
        });
    }
    await Banner.insertMany(banners);

    // ================= CATEGORIES =================
    const categories = [
        "Pizza", "Burger", "Biryani", "Chinese", "South Indian",
        "North Indian", "Desserts", "Drinks", "Fast Food", "Snacks"
    ];

    const categoryData = categories.map((name, index) => ({
        name,
        image: `https://picsum.photos/100?random=${index + 20}`
    }));

    await Category.insertMany(categoryData);

    // ================= RESTAURANTS =================
    const restaurantData = [];

    for (let i = 1; i <= 20; i++) {
        restaurantData.push({
            name: `Restaurant ${i}`,
            image: `https://picsum.photos/200?random=${i + 50}`,
            rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
            deliveryTime: `${20 + i} mins`,
            category: categories[i % categories.length]
        });
    }

    const restaurants = await Restaurant.insertMany(restaurantData);

    // ================= FOODS =================
    const foodNames = [
        "Pizza", "Burger", "Biryani", "Noodles", "Dosa",
        "Paneer Curry", "Ice Cream", "Cold Drink", "Sandwich", "Fries"
    ];

    const foodData = [];

    for (let i = 1; i <= 40; i++) {
        const randomRestaurant = restaurants[Math.floor(Math.random() * restaurants.length)];

        foodData.push({
            name: `${foodNames[i % foodNames.length]} ${i}`,
            price: Math.floor(Math.random() * 300) + 100,
            image: `https://picsum.photos/150?random=${i + 100}`,
            restaurantId: randomRestaurant._id
        });
    }

    await Food.insertMany(foodData);

    console.log("🔥 Bulk Data Inserted Successfully");
    process.exit();

})
.catch(err => console.log(err));