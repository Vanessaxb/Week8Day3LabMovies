import { useState, useEffect } from "react";
import "./App.css";
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";
console.log(process.env.REACT_APP_MOVIE_API_KEY);

export default function App() {
  //variable to hold api key
  const apiKey = "ea0ede21";

  //creating state to hold data
  const [movie, setMovie] = useState(null);

  //function to fetch movie
  const getMovie = async (searchTerm) => {
    //make fetch request and store response
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );
      //parse JSON response into a javascript object
      const data = await response.json();
      //set the Movie state to the movie(load the date or update it)
      setMovie(data);
    } catch (e) {
      console.error(e);
    }
  }

    //This will run on the first render but not on subsquent renders
    useEffect(() => {
      getMovie("Clueless");
    }, []); // with the empty [], makes it run only once, avoiding infinite loop. If add variable within [], it will run whevever there's a change to that variable

    return (
      <div className="App">
        <Form moviesearch={getMovie} />
        <MovieDisplay movie={movie} />
      </div>
    );
  };

