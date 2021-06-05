const mongoose = require("mongoose");
const validator = require("validator");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    region: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      location: { type: [Number], index: { type: '2dsphere', sparse: true}},
      required: true,
    },
    serviceRegion: {
      type: [Number],
      required: true,
    },
    workingHour: [
      {
        day: {
          type: Date,
        },
        periods: [
          {
            start: { type: Date },
            end: { type: Date },
          },
        ],
      },
    ],
    deliveryTime: {
        type: Date,
    },
    deliveryFee: {
        type: Number,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Restaurant = mongoose.model("Task", restaurantSchema);

module.exports = Restaurant;
