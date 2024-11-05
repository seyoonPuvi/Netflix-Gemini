import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";

const MovieList = ({ title, movies }) => {
  const showGPTSearchPage = useSelector(
    (store) => store.gpt?.showGPTSearchPage
  );
  const settings = {
    dots: false,
    slidesToShow: 8,
    slidesToScroll: 1,
  };

  const renderMovieSlider = () => (
    <div className="slider-cont px-12">
      <Slider {...settings}>
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            posterPath={movie.poster_path}
            title={title}
          />
        ))}
      </Slider>
    </div>
  );

  const renderGptMovieSuggesstion = () => (
    <div className="mx-12 flex overflow-x-auto scrollbar-hidden mb-10">
      <div className="flex gap-x-3">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            posterPath={movie.poster_path}
            title={movie.title} // Ensure you use the correct title variable
            className="w-48" // Set a fixed width for each MovieCard
          />
        ))}
      </div>
    </div>
  );
  return (
    <div className="mb-12">
      <h2 className="text-white text-3xl px-16 pb-6">{title}</h2>
      {showGPTSearchPage ? renderGptMovieSuggesstion() : renderMovieSlider()}
    </div>
  );
};

export default MovieList;
