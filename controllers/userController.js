const User = require("../models/User");


// ================= GET PROFILE =================
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= UPDATE PROFILE =================
exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const updateData = {
            name,
            email
        };

        // image upload
        if (req.file) {
            updateData.profileImage = req.file.path;
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: "Profile updated successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= ADD ADDRESS =================
exports.addAddress = async (req, res) => {
    try {
        const { title, street, city, pincode, phone } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.addresses.push({
            title,
            street,
            city,
            pincode,
            phone
        });

        await user.save();

        res.json({
            success: true,
            message: "Address added successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= DELETE ADDRESS =================
exports.deleteAddress = async (req, res) => {
    try {
        const { addressId } = req.body;

        const user = await User.findById(req.params.id);

        user.addresses = user.addresses.filter(
            (addr) => addr._id.toString() !== addressId
        );

        await user.save();

        res.json({
            success: true,
            message: "Address deleted",
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};