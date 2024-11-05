import React, { useRef } from "react";
import { model } from "../utils/geminiAi";
import { API_OPTIONS, movieSuggestion_TMDB_API_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addMoviesInfo } from "../utils/gptSlice";

const GptSearch = () => {
  // const gptMovieResults = useSelector((store) => store.gpt?.movieResults);
  const dispatch = useDispatch();
  const gptSearchText = useRef(null);

  const getMoviesTMDB = async (movie) => {
    const data = await fetch(
      movieSuggestion_TMDB_API_URL +
        `query=${movie}&include_adult=true&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prompt =
      "Act as a Movie Recommendation system and suggest me some movies  for the query :" +
      gptSearchText.current.value +
      ". only give me names of 5 movies , comma separated like the example result given ahead. Example Result:venom,batman begins,spiderman,nemo,godfather.";

    const result = await model.generateContent(prompt);
    const movieSuggestionList = result.response.text().split(",");

    const promiseArray = movieSuggestionList.map((movie) =>
      getMoviesTMDB(movie)
    );

    const tmdbResults = await Promise.all(promiseArray);
    dispatch(
      addMoviesInfo({
        movieNames: movieSuggestionList,
        movieResults: tmdbResults,
      })
    );
  };

  return (
    <div className="pt-[8%] w-7/12 m-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-black w-full py-6 px-4 rounded-lg"
      >
        <input
          ref={gptSearchText}
          type="text"
          placeholder="what would you like to watch today?"
          className="w-9/12 py-4 px-4 rounded-l-md outline-none"
        />
        <button
          type="submit"
          className="w-3/12 py-4 px-2 rounded-r-md bg-red-800 text-white"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearch;
