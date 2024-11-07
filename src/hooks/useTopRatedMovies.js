import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, MOVIE_FETCH_URL } from "../utils/constants/constants";
import { addTopRatedMovies } from "../utils/store/slice/movieSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
  const topRatedMovies = useSelector((store) => store.movies?.topRatedMovies);
  const dispatch = useDispatch();

  const fetchMoviesData = async () => {
    const data = await fetch(
      MOVIE_FETCH_URL + "top_rated?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() => {
    !topRatedMovies && fetchMoviesData();
  }, []);
};

export default useTopRatedMovies;
