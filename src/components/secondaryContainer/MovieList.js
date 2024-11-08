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

  const [showMobView, setShowMobView] = useState(false);

  useEffect(() => {
    // Define a function to set the slidesToShow based on window width
    const updateSlidesToShow = () => {
      if (window.innerWidth < 768) {
        setShowMobView(true);
      } else {
        setShowMobView(false);
      }
    };

    // Call the function on component mount
    updateSlidesToShow();

    // Add an event listener to handle window resize
    window.addEventListener("resize", updateSlidesToShow);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const settings = {
    dots: false,
    slidesToShow: 8,
    slidesToScroll: 1,
  };

  const renderMovieSlider = () => (
    <div className="slider-cont px-6 md:px-12">
      <Slider {...settings}>
        {movies?.map((movie) => (
          <Link key={movie.id} to={`/${movie.id}`}>
            <MovieCard posterPath={movie.poster_path} title={title} />
          </Link>
        ))}
      </Slider>
    </div>
  );

  const renderGptMovieSuggesstion = () => (
    <div className="md:mx-12 mx-4 flex overflow-x-auto scrollbar-hidden mb-10">
      <div className="flex gap-x-2 md:gap-x-3">
        {movies?.map((movie) => (
          <Link key={movie.id} to={`/${movie.id}`}>
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
      {showGPTSearchPage
        ? renderGptMovieSuggesstion()
        : showMobView
        ? renderGptMovieSuggesstion()
        : renderMovieSlider()}
    </div>
  );
};

export default MovieList;
