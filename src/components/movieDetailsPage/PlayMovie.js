import React, { useEffect } from "react";
import { API_OPTIONS, MOVIE_FETCH_URL } from "../../utils/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { addMovieTrailer } from "../../utils/store/slice/movieDetailsSlice";

const PlayMovie = ({ movieId }) => {
  const dispatch = useDispatch();

  const TRAILER_KEY = useSelector(
    (store) => store.movieDetails?.movieTrailer?.key
  );

  const movie_URL = `${MOVIE_FETCH_URL}${movieId}/videos?language=en-US`;
  const videoSrc = `https://www.youtube.com/embed/${TRAILER_KEY}?autoplay=1&mute=0&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${TRAILER_KEY}`;

  const getMovieTrailer = async () => {
    const data = await fetch(movie_URL, API_OPTIONS);
    const json = await data.json();
    const movieTrailer = json.results.find((each) => each.type === "Trailer");
    const trailer = movieTrailer ? movieTrailer : json.results[0];
    dispatch(addMovieTrailer(trailer));
  };

  useEffect(() => {
    getMovieTrailer();
  }, [movieId]);

  return (
    <div className="w-screen  bg-black md:bg-none  relative  md:-top-20 z-20 right-0 left-0">
      {TRAILER_KEY && (
        <iframe
          className="w-screen aspect-video min-h-96"
          src={videoSrc}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        ></iframe>
      )}
    </div>
  );
};

export default PlayMovie;
