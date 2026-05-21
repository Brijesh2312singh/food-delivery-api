const Restaurant = require("../models/Restaurant");
const Food = require("../models/Food");

exports.getRestaurantDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const restaurant = await Restaurant.findById(id);

        const foods = await Food.find({ restaurantId: id });

        return res.json({
            success: true,
            data: {
                restaurant,
                foods
            }
        });

    } catch (error) {
        return res.json({
            success: false,
            message: "Error fetching restaurant"
        });
    }
};