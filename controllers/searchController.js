const Restaurant = require("../models/Restaurant");
const Food = require("../models/Food");

exports.search = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.json({
                success: false,
                message: "Search query required"
            });
        }

        // 🔍 search restaurants
        const restaurants = await Restaurant.find({
            name: { $regex: query, $options: "i" }
        });

        // 🔍 search foods
        const foods = await Food.find({
            name: { $regex: query, $options: "i" }
        });

        return res.json({
            success: true,
            data: {
                restaurants,
                foods
            }
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error searching"
        });
    }
};