const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    rating: Number,
    deliveryTime: String,
    category: String
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", restaurantSchema);