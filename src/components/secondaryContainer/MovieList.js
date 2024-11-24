import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MovieList = ({ title, movies }) => {
  const showGPTSearchPage = useSelector(
    (store) => store.gpt?.showGPTSearchPage
  );

  const renderGptMovieSuggesstion = () => (
    <div className="md:mx-12 mx-4 flex overflow-x-auto scrollbar-hidden mb-10">
      <div className="flex gap-x-2 md:gap-x-3">
        {movies?.map((movie, index) => (
          <Link key={`${movie.id}-${index}`} to={`/movie/${movie.id}`}>
            <MovieCard
              posterPath={movie.poster_path}
              title={movie.title} // Ensure you use the correct title variable
              // Set a fixed width for each MovieCard
            />
          </Link>
        ))}
      </div>
    </div>
  );
  return (
    <div className="md:mb-12 pt-3">
      <h2 className="text-white text-lg md:text-3xl  px-4 md:px-16 pb-3 md:pb-6">
        {title}
      </h2>
      {renderGptMovieSuggesstion()}
    </div>
  );
};

export default MovieList;
