import {
    Button,
    createMuiTheme,
    Tab,
    Tabs,
    TextField,
    ThemeProvider,
  } from "@material-ui/core";
  import "./Search.css";
  import SearchIcon from "@material-ui/icons/Search";
  import { useEffect, useState } from "react";
  import axios from "axios";
import movieService from "../../../services/MovieService";
import SingleContent from "../../SingleContent/SingleContent";
const Search = () => {
    const [searchTitle, setSearchTitle] = useState("");
    const [searchDirector, setSearchDirector] = useState("");
    const [searchPlot, setSearchPlot] = useState("");    
    const [content, setContent] = useState([]);    
  
    const darkTheme = createMuiTheme({
      palette: {
        type: "dark",
        primary: {
          main: "#fff",
        },
      },
    });


  
    const fetchSearch = async () => {

      const searchData = {
        title: searchTitle ,
        director:searchDirector,
        plot: searchPlot

      }

      console.log('searchData', searchData);
      movieService
      .searchMovies(searchData)
      .then((data) => {
        console.log('data', data);
        setContent(data.movies);
      })
      .catch((err) => {
        console.log(err);
      });
    };
  

    // useEffect(fetchSearch, []);

    console.log('content', content);


  
    return (

      <div>

        
        <ThemeProvider theme={darkTheme}>
          <div className="search">
            <TextField
              style={{ flex: 1, marginRight:"50px"}}
              className="searchBox"
              label="Title"
              variant="filled"
              onChange={(e) => setSearchTitle(e.target.value)}
            />
            <TextField
              style={{ flex: 1, marginRight:"50px" }}
              className="searchBox"
              label="Director"
              variant="filled"
              onChange={(e) => setSearchDirector(e.target.value)}
            />
            <TextField
              style={{ flex: 1 , marginRight:"50px"}}
              className="searchBox"
              label="Plot"
              variant="filled"
              onChange={(e) => setSearchPlot(e.target.value)}
            />
            <Button
              onClick={fetchSearch}
              variant="contained"
              style={{ marginLeft: 10 }}
            >
              <SearchIcon fontSize="large" />
            </Button>
          </div>

        </ThemeProvider>
        <div className="movies">
          {content &&
            content.map((c) => (
              
            <SingleContent
            key={c.MovieDetails.imdbID}
            imdbID={c.MovieDetails.imdbID}
            Poster={c.MovieDetails.Poster}
            Title={c.MovieDetails.Title}
            Year={c.MovieDetails.Year}
            Type={c.MovieDetails.Type}
            
          />
            ))}



          

          {content.length == 0 && <h2>Type word you want to search above : D</h2>}
          

         
        </div>
        
      </div>
    );
  };
  
  export default Search;