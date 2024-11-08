import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, MOVIE_FETCH_URL } from "../utils/constants/constants";
import { addTrailerVideoPlaying } from "../utils/store/slice/movieSlice";
import { useEffect } from "react";

const useTrailerVideoPlaying = (movieId) => {
  const trailerPlaying = useSelector(
    (store) => store.movies?.trailerVideoPlaying
  );
  const dispatch = useDispatch();
  const movie_URL = `${MOVIE_FETCH_URL}${movieId}/videos?language=en-US`;

  const fetchTrailerVideo = async () => {
    const data = await fetch(movie_URL, API_OPTIONS);
    const json = await data.json();

    const trailerMovie = json.results.find((each) => each.type === "Trailer");

    const trailer = trailerMovie ? trailerMovie : json.results[0];
    dispatch(addTrailerVideoPlaying(trailer));
  };

  useEffect(() => {
    !trailerPlaying && fetchTrailerVideo();
  }, []);
};

export default useTrailerVideoPlaying;
