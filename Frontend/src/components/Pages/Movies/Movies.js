import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../SingleContent/SingleContent";
import movieService from "../../../services/MovieService";
import "./Movies.css"

const Movies = () => {
  const [movies, setMovies] = useState([]);


  const getMovies = () => {
    movieService
      .getAllMovies()
      .then((data) => {
        console.log('data.movies', data.movies[0].Movie);
        setMovies(data.movies[0].Movie);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(getMovies, []);


  console.log('movies', movies);

  return (
    
 
    <div>
      <span className="pageTitle">Discover Movies with Space title</span>

      <div className="movies">
        {movies &&
          movies.map((m) => (

            <SingleContent
              key={m.imdbID}
              imdbID={m.imdbID}
              Poster={m.Poster}
              Title={m.Title}
              Year={m.Year}
              Type={m.Type}
              
            />
          ))}
      </div>
  
    </div>
    
  );
};

export default Movies;