import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../../utils/constants/constants";
import { addAboutMovie } from "../../utils/store/slice/movieDetailsSlice";

const MovieInfoCard = ({ movieId }) => {
  const dispatch = useDispatch();
  const aboutMovie = useSelector((store) => store.movieDetails?.aboutMovie);
  const isLoading = useSelector((store) => store.movieDetails?.isLoading);
  const TRAILER_KEY = useSelector(
    (store) => store.movieDetails?.movieTrailer?.key
  );

  const getMoviesAbout = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addAboutMovie(json));
  };

  useEffect(() => {
    getMoviesAbout();
  }, [movieId]);

  return (
    <>
      {!isLoading ? (
        TRAILER_KEY ? (
          <div className=" px-12 absolute pt-[20%] z-30 md:block hidden w-[40%]">
            <div className="text-white flex flex-col gap-y-4">
              <h1 className="text-5xl font-bold">{aboutMovie?.title}</h1>
              <p className="text-2xl">{aboutMovie?.overview}</p>
              <p className="text-2xl">{aboutMovie?.runtime}mins</p>
              <div className="flex gap-x-2">
                {aboutMovie?.genres.map((each) => (
                  <span key={each.id}>{each.name} </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-screen bg-black h-screen flex justify-center items-center">
            <h1 className="text-3xl text-white font-bold">
              Details of this movie are not found... Please go back and search
              for other movies.
            </h1>
          </div>
        )
      ) : (
        <div className=" h-screen flex justify-center items-center">
          <h1 className="text-white">loading</h1>
        </div>
      )}
    </>
  );
};

export default MovieInfoCard;
