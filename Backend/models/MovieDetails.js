const mongoose = require("mongoose");

const MovieDetailsSchema = new mongoose.Schema(
  {
    MovieDetails: {
      type: Object,
      required: [true, "Data Missing"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MovieDetails", MovieDetailsSchema);
