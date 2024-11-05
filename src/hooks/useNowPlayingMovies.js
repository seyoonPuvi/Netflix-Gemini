import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, MOVIE_FETCH_URL } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const nowPlaying = useSelector((store) => store.movies?.nowPlayingMovies);
  const dispatch = useDispatch();

  const fetchMoviesData = async () => {
    const data = await fetch(
      MOVIE_FETCH_URL + "now_playing?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
    !nowPlaying && fetchMoviesData();
  }, []);
};

export default useNowPlayingMovies;
