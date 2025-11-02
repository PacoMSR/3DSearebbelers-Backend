const mongoose = require("mongoose");

const BuoySchema = new mongoose.Schema(
  {
    buoyType: {
      type: String,
      require: true,
    },
    ownerUsername: {
      type: String,
      require: true,
    },
    coordinates: {
      lat: {
        type: Number,
        require: true,
      },
      lng: {
        type: Number,
        require: true,
      },
      depth: {
        type: Number,
        require: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Buoy", BuoySchema);
