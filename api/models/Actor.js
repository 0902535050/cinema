const mongoose = require("mongoose");

const ActorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    stageName: { type: String, required: true, unique: true },
    nation: { type: String },
    desc: { type: String },
    profilePic: { type: String },
    nameMovie: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Actor", ActorSchema);
