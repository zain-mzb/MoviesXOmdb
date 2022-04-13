const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    Movie: {
      type: Array,
      required: [true, "Data Missing"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
