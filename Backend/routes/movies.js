const express = require("express");
const router = express.Router();

const { getMovies, searchMovies } = require("../controllers/movies");

router.route("/").get(getMovies);
router.route("/search").post(searchMovies);

module.exports = router;
