import { useNavigate, useParams } from "react-router-dom";
import PlayMovie from "./PlayMovie";
import MovieInfoCard from "./MovieInfoCard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  removeMovieDetails,
  setLoading,
} from "../../utils/store/slice/movieDetailsSlice";
import SimilarMovies from "./SimilarMovies";
import { website_LOGO_URL } from "../../utils/constants/constants";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  console.log(movieId);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoading(true));
    return () => {
      dispatch(removeMovieDetails());
    };
  }, []);

  return (
    <div className="w-full bg-black h-screen o">
      <div className="flex justify-between items-center md:bg-transparent bg-black px-4 py-4 absolute z-50 w-full">
        <div className="md:ml-8  flex justify-between ">
          <img
            src={website_LOGO_URL}
            alt="netflix-logo"
            className="w-[100px] md:w-[150px]  h-10 md:h-20  brightness-200 m-0"
          />
        </div>

        <div>
          <button
            type="button"
            className="md:px-2 md:py-2 px-1.5 py-1 rounded-md bg-purple-900 text-white border-none outline-none hover:opacity-60"
            onClick={() => {
              navigate("/browse");
            }}
          >
            HomePage
          </button>
        </div>
      </div>
      <MovieInfoCard movieId={movieId} />
      <PlayMovie movieId={movieId} />
      <SimilarMovies movieId={movieId} />
    </div>
  );
};

export default MovieDetails;
