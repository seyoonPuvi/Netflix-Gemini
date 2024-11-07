import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, MOVIE_FETCH_URL } from "../utils/constants/constants";
import { addUpcomingMovies } from "../utils/store/slice/movieSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  const upcomingMovies = useSelector((store) => store.movies?.upcomingMovies);
  const dispatch = useDispatch();

  const fetchMoviesData = async () => {
    const data = await fetch(
      MOVIE_FETCH_URL + "upcoming?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json.results));
  };

  useEffect(() => {
    !upcomingMovies && fetchMoviesData();
  }, []);
};

export default useUpcomingMovies;
