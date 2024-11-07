import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
import { language } from "../../utils/constants/languageConstants";

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
    <div className="-m-1 md:-mt-32 bg-black pb-8 md:pb-0">
      {showBrowsePage ? (
        <div className="relative top-0 md:-top-72 pb-10 z-50">
          {categories.map(
            ({ title, data }) =>
              data && <MovieList key={title} title={title} movies={data} />
          )}
        </div>
      ) : (
        <div className="md:hidden h-screen bg-black flex flex-col gap-y-2">
          {Array(3)
            .fill()
            .map((_index) => (
              <div className="flex justify-center" key={_index}>
                {Array(3)
                  .fill()
                  .map((_, index) => (
                    <div
                      key={index}
                      className="w-3/12 m-2 h-40 bg-gray-950 bg-opacity-75"
                    ></div>
                  ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SecondaryContainer;
