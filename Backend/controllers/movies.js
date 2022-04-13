const Movie = require("../models/Movie");
const MovieDetails = require("../models/MovieDetails");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const axios = require("axios");

// Function to get and store movies with space title and year 2001 to mongo
const getMoviesfromOMDB = async () => {
  try {
    const apiResponse = await axios.get(
      "http://www.omdbapi.com/?s=space&y=2001&apikey=49393327"
    );

    const data = apiResponse.data.Search;
    const movies = await Movie.create({ Movie: data });

    getMovieDetails();
  } catch (err) {
    console.error(err);
  }

  return true;
};

// A sub function to store the complete details of movies by calling the second API with ID as a param
const getMovieDetails = async () => {
  let movies = await Movie.find({}).sort("createdAt");

  const storeMovieDetail = async (id) => {
    let movieDetails = await MovieDetails.find({});

    if (movieDetails.length == 0) {
      const apiResponse = await axios.get(
        `http://www.omdbapi.com/?i=${id}&apikey=49393327`
      );

      let data = apiResponse.data;

      const store = await MovieDetails.create({ MovieDetails: data });

      if (store) {
        return true;
      }
    }
  };

  let mov = movies[0].Movie;

  mov.map((m) => {
    let imdbID = m.imdbID;
    storeMovieDetail(imdbID);
  });
};


// Function for storing and sending all the movies initial data in Mongo
const getMovies = async (req, res) => {

  let movies = await Movie.find({}).sort("createdAt");

  if (movies.length != 0) {
    res.status(StatusCodes.OK).json({ movies, count: movies.length });
  } else {
    if ((await getMoviesfromOMDB()) == true) {
      movies = await Movie.find({}).sort("createdAt");
      
      res.status(StatusCodes.OK).json({ movies, count: movies.length });
      return {yo:1};
    } else {
      res.send("Error has Occurred");
    }
  }
};

// Function for searching movies and sending response
const searchMovies = async (req, res) => {
  const title = req.body.title != "" ? req.body.title : " ";
  const director = req.body.director != "" ? req.body.director : " ";
  const plot = req.body.plot != "" ? req.body.plot : " ";

  let movies = await MovieDetails.find({
    "MovieDetails.Title": { $regex: `${title}`, $options: "i" },
    "MovieDetails.Director": { $regex: `${director}`, $options: "i" },
    "MovieDetails.Plot": { $regex: `${plot}`, $options: "i" },
  });

  res.send({ movies });
};

module.exports = {
  getMovies,
  searchMovies,
};
