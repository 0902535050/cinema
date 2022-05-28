const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    imgPost: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
    genre: { type: String },
    type: { type: String },
    nation: { type: String },
    isSeries: { type: Boolean, default: false },
    duration: { type: String },
    listActor: { type: Array },
    imdb: { type: String },
    director: {
      directorName: { type: String },
      directorAva: { type: String },
      directorNations: { type: String },
      directorDesc: { type: String },
      movieJoin: { type: Array },
    },

    producer: { type: Array },
    filmLocations: { type: String },
    writer: { type: Array },
    listVideoSub: { type: Array },
    listPost: { type: Array },
    listVideoTM: { type: Array },
    isSup: { type: String },
    movieTag: { type: Array },
    listLiked: { type: Array },
    listDisLiked: { type: Array },
    listComment: { type: Array },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
