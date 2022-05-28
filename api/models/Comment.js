const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    content: { type: String },
    creator: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
