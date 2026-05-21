const Banner = require("../models/Banner");
const Category = require("../models/Category");
const Restaurant = require("../models/Restaurant");
const Food = require("../models/Food");

exports.getHomeData = async (req, res) => {
    try {

        const banners = await Banner.find();
        const categories = await Category.find();
        const restaurants = await Restaurant.find().limit(10);
        const popularFoods = await Food.find().limit(10);

        return res.status(200).json({
            success: true,
            message: "Home Data Fetched",
            data: {
                banners,
                categories,
                restaurants,
                popularFoods
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};