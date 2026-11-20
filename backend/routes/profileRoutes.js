const express = require("express");
const router = express.Router();

const Profile = require("../models/Profile");
const Swipe = require("../models/Swipe");

const CURRENT_USER = "current_user";


router.get("/feed", async (req, res) => {
  try {
    const swipedProfiles = await Swipe.find({
      userId: CURRENT_USER,
    }).distinct("profileId");

    const profiles = await Profile.find({
      id: { $nin: swipedProfiles },
    }).select("-hasLikedYou -_id -__v");

    res.status(200).json({
      success: true,
      count: profiles.length,
      profiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profiles",
      error: error.message,
    });
  }
});


router.post("/swipe", async (req, res) => {
  try {
    const { profileId, action } = req.body;

    if (!profileId || !["like", "pass"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Valid profileId and action are required",
      });
    }

    const profile = await Profile.findOne({ id: profileId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const existingSwipe = await Swipe.findOne({
      userId: CURRENT_USER,
      profileId,
    });

    if (existingSwipe) {
      return res.status(409).json({
        success: false,
        message: "You have already swiped this profile",
      });
    }

    await Swipe.create({
      userId: CURRENT_USER,
      profileId,
      action,
    });

    let isMatch = false;

    if (action === "like" && profile.hasLikedYou) {
      isMatch = true;
    }

    res.status(201).json({
      success: true,
      message: isMatch ? "It's a match!" : "Swipe recorded",
      isMatch,
      profile: isMatch
        ? {
            id: profile.id,
            name: profile.name,
            age: profile.age,
            photo: profile.photo,
            city: profile.city,
          }
        : null,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Profile already swiped",
      });
    }

    res.status(500).json({
      success: false,
      message: "Swipe failed",
      error: error.message,
    });
  }
});


router.get("/matches", async (req, res) => {
  try {
    const likedProfiles = await Swipe.find({
      userId: CURRENT_USER,
      action: "like",
    }).distinct("profileId");

    const matches = await Profile.find({
      id: { $in: likedProfiles },
      hasLikedYou: true,
    }).select("-hasLikedYou -_id -__v");

    res.status(200).json({
      success: true,
      count: matches.length,
      matches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch matches",
      error: error.message,
    });
  }
});

module.exports = router;
