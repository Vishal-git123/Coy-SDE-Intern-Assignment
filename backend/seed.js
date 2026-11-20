require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Profile = require("./models/Profile");
const Swipe = require("./models/Swipe");

const MockProfiles = require("../frontend/src/mock_profiles.js").default;

async function seedProfiles() {
  try {
    await connectDB();

    const profiles = MockProfiles.map((profile, index) => ({
      ...profile,
      hasLikedYou: index % 5 === 0,
    }));

    // Reset old demo data
    await Swipe.deleteMany({ userId: "current_user" });
    await Profile.deleteMany({});

    // Insert all 30 mock profiles again
    await Profile.insertMany(profiles);

    console.log(`${profiles.length} profiles inserted successfully!`);
    console.log("Old swipe history cleared successfully!");
  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

seedProfiles();
