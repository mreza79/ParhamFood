const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userName: {
        type:String
    },
    userComment: {
      type: String,
      rate: {
        type: Number,
        validate(value) {
          if (value < 1 || value > 6) throw new Error("Value is invalid");
        },
      },
      trim: true,
    },
    managerName: {
        type: String
    },
    managerComment: {
      type: String,
      trim: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
    }
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
