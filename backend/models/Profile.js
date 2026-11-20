const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: Number,
  photo: String,
  bio: String,
  city: String,
  interests: [String],
  hasLikedYou: {
    type: Boolean,
    default: false,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
