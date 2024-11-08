import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../../utils/constants/constants";
import { addSimilarMovies } from "../../utils/store/slice/movieDetailsSlice";
import MovieList from "../secondaryContainer/MovieList";

const SimilarMovies = ({ movieId }) => {
  const dispatch = useDispatch();
  const similarMovies = useSelector(
    (store) => store.movieDetails?.similarMovies
  );
  const TRAILER_KEY = useSelector(
    (store) => store.movieDetails?.movieTrailer?.key
  );

  const getSimilarMovies = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addSimilarMovies(json.results));
  };

  useEffect(() => {
    getSimilarMovies();
  }, [movieId]);

  return (
    <div className="bg-black relative -mt-20 md:-mt-32 z-50 pb-5">
      {similarMovies && TRAILER_KEY && (
        <MovieList title="Similar Movies" movies={similarMovies} />
      )}
    </div>
  );
};

export default SimilarMovies;
