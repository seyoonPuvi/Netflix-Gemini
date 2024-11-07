import React from "react";
import { useSelector } from "react-redux";
import MovieList from "../secondaryContainer/MovieList";

const GptMovieSuggestion = () => {
  const gptMovieInfo = useSelector((store) => store.gpt);
  const { movieNames, movieResults } = gptMovieInfo;
  if (!movieNames) return;
  return (
    <div className="flex justify-center">
      <div className="text-white bg-black bg-opacity-85 md:w-[90%] w-screen mt-3 py-6 ">
        {movieNames.map((movie, index) => (
          <MovieList key={movie} title={movie} movies={movieResults[index]} />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
