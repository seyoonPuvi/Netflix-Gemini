import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
import { language } from "../utils/languageConstants";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const prefferedLang = useSelector((store) => store.config?.prefferedLang);
  const showBrowsePage = useSelector((store) => store.movies?.showBrowsePage);

  // Define categories to reduce redundancy in rendering MovieList components
  const categories = [
    {
      title: language.nowPlaying[prefferedLang],
      data: movies?.nowPlayingMovies,
    },
    { title: language.trending[prefferedLang], data: movies?.trendingMovies },
    { title: language.topRated[prefferedLang], data: movies?.topRatedMovies },
    { title: language.popular[prefferedLang], data: movies?.popularMovies },
    { title: language.upcoming[prefferedLang], data: movies?.upcomingMovies },
  ];

  return (
    <div className="-mt-32 bg-black">
      {showBrowsePage && (
        <div className="relative -top-56 pb-10">
          {categories.map(
            ({ title, data }) =>
              data && <MovieList key={title} title={title} movies={data} />
          )}
        </div>
      )}
    </div>
  );
};

export default SecondaryContainer;
