import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, MOVIE_FETCH_URL } from "../utils/constants/constants";
import { addPopularMovies } from "../utils/store/slice/movieSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  const popularMovies = useSelector((store) => store.movies?.popularMovies);
  const dispatch = useDispatch();

  const fetchMoviesData = async () => {
    const data = await fetch(
      MOVIE_FETCH_URL + "popular?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    !popularMovies && fetchMoviesData();
  }, []);
};

export default usePopularMovies;
