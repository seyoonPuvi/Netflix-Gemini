import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import { useSelector } from "react-redux";
import GptSearchPage from "./GptSearchPage";

const Browse = () => {
  const showGPTSearchPage = useSelector(
    (store) => store.gpt?.showGPTSearchPage
  );
  useNowPlayingMovies();
  useTrendingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTopRatedMovies();

  return (
    <div className="overflow-x-hidden w-screen">
      <Header />
      {showGPTSearchPage ? (
        <GptSearchPage />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
