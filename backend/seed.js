require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Profile = require("./models/Profile");

const MockProfiles = require("../frontend/src/mock_profiles.js").default;

async function seedProfiles() {
  try {
    await connectDB();

    const profiles = MockProfiles.map((profile, index) => ({
      ...profile,
      hasLikedYou: index % 5 === 0,
    }));

    await Profile.deleteMany({});
    await Profile.insertMany(profiles);

    console.log(`${profiles.length} profiles inserted successfully!`);
  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

seedProfiles();
