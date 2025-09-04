
import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { User } from "../models/user.model.js";
import { validateEditProfileData } from "../utils/validation.js";
import bcrypt from "bcryptjs";

export const profileRouter = express.Router();

// ✅ Get profile
profileRouter.get("/profile/view",userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({
            message: "Profile fetched successfully.",
            data: user
        });
    } catch (error) {
        console.error("Error in GET /profile/view:", error.message);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Edit profile
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        // Validate data (you can customize what fields are allowed)
        validateEditProfileData(req);
const allowedUpdates = ["firstName", "lastName", "skills", "gender", "age", "photoUrl", "about"];

        const updates = Object.keys(req.body);

        const isValidOperation = updates.every((key) => allowedUpdates.includes(key));
        if (!isValidOperation) {
            return res.status(400).json({ message: "Invalid update fields" });
        }

        const loggedInUser = req.user;

        // Apply updates
        updates.forEach((key) => {
            loggedInUser[key] = req.body[key];
        });

        await loggedInUser.save();

        res.status(200).json({
            message: `${loggedInUser.firstname}'s data updated successfully`,
            data: loggedInUser
        });
    } catch (error) {
        console.error("Error in PATCH /profile/edit:", error.message);
        res.status(400).json({
            message: "Something went wrong: " + error.message,
        });
    }
});
