import GenericService from "./GenericService";

class MovieService extends GenericService {
  constructor() {
    super();
  }
  getAllMovies = () => this.get("/movies");

  searchMovies = (data) => this.post("/movies/search", data)
  
}

let movieService = new MovieService();
export default movieService;
