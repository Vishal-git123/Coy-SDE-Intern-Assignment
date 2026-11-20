const mongoose = require("mongoose");

const swipeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    profileId: {
      type: String,
      required: true,
    },

    action: {
      type: String,
      enum: ["like", "pass"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);


swipeSchema.index({ userId: 1, profileId: 1 }, { unique: true });

const Swipe = mongoose.model("Swipe", swipeSchema);

module.exports = Swipe;
