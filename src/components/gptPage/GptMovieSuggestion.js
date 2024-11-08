import React from "react";
import { useSelector } from "react-redux";
import MovieList from "../secondaryContainer/MovieList";

const GptMovieSuggestion = () => {
  const gptMovieInfo = useSelector((store) => store.gpt);
  const { movieNames, movieResults, isGptLoading } = gptMovieInfo;

  return (
    <div className="flex justify-center">
      {movieResults && (
        <div className="text-white bg-black bg-opacity-85 md:w-[90%] w-screen mt-3 py-6 ">
          {movieNames.map((movie, index) => (
            <MovieList key={movie} title={movie} movies={movieResults[index]} />
          ))}
        </div>
      )}
      {isGptLoading && !movieResults && (
        <div className=" bg-black bg-opacity-85 md:w-[90%] w-screen h-screen mt-3 py-6">
          {Array.from({ length: 4 }).map((_, rowIndex) => (
            <div className="flex justify-between" key={rowIndex}>
              {Array.from({ length: 3 }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="w-4/12 md:w-[250px] m-2  h-40 md:h-80 bg-black bg-opacity-90"
                ></div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GptMovieSuggestion;
