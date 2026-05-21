const Restaurant = require("../models/Restaurant");
const Food = require("../models/Food");

exports.getByCategory = async (req, res) => {
    try {
        const { name } = req.params;

        // restaurants by category
        const restaurants = await Restaurant.find({ category: name });

        // foods from those restaurants
        const restaurantIds = restaurants.map(r => r._id);

        const foods = await Food.find({
            restaurantId: { $in: restaurantIds }
        });

        return res.json({
            success: true,
            data: {
                category: name,
                restaurants,
                foods
            }
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error fetching category data"
        });
    }
};