import React, { useEffect } from "react";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useDispatch, useSelector } from "react-redux";
import { setRandomMovie } from "../utils/movieSlice";

const MainContainer = () => {
  const dispatch = useDispatch();
  const movieTrailer = useSelector((store) => store.movies?.randomMovie);
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  useEffect(() => {
    if (!movieTrailer && movies) {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      dispatch(setRandomMovie(randomMovie));
    }
  }, [movieTrailer, movies, dispatch]); // Add dependencies to avoid infinite loop

  return (
    <>
      {movieTrailer && (
        <div className="w-screen">
          <VideoTitle
            title={movieTrailer.title}
            overview={movieTrailer.overview}
          />
          <VideoBackground movieId={movieTrailer.id} />
        </div>
      )}
    </>
  );
};

export default MainContainer;
