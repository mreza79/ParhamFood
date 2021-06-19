const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
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
    managerComment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
