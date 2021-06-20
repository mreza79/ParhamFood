const mongoose = require("mongoose");
const validator = require("validator");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    region: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      // location: { type: [Number], index: { type: "2dsphere", sparse: true } },
      // required: true,
    },
    serviceRegion: {
      type: [Number],
      // required: true,
    },
    workingHour: [
      {
        day: {
          type: [Strings],
        },
        periods: [
          {
            start: {
              type: Date,
            },
            end: {
              type: Date,
            },
          },
        ],
      },
    ],
    deliveryTime: {
      type: Number,
    },
    deliveryFee: {
      type: Number,
      // required: true,
    },
    comments: [
      {
        userName: {
          type: String,
        },
        userComment: {
          type: String,
        },
        ManagerName: {
          type: String,
        },
        ManagerComment: {
          type: String,
        },
      },
    ],
    menu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manager",
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

restaurantSchema.virtual("menus", {
  ref: "Menu",
  localField: "_id",
  foreignField: "restaurant",
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
