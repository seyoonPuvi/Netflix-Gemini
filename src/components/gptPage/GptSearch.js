import React, { useRef } from "react";
import { model } from "../../utils/geminiAi/geminiAi";
import {
  API_OPTIONS,
  movieSuggestion_TMDB_API_URL,
} from "../../utils/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addMoviesInfo,
  removeGptMovieSuggestion,
} from "../../utils/store/slice/gptSlice";
import { language } from "../../utils/constants/languageConstants";

const GptSearch = () => {
  // const gptMovieResults = useSelector((store) => store.gpt?.movieResults);
  const dispatch = useDispatch();
  const gptSearchText = useRef(null);
  const prefferedLang = useSelector((store) => store.config?.prefferedLang);

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

  const handleClearBtn = () => {
    dispatch(removeGptMovieSuggestion());
  };

  return (
    <div className="md:pt-[8%] pt-[45%] w-full md:w-8/12 m-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-black w-full py-3 px-2 md:py-6 md:px-4 rounded-lg flex"
      >
        <input
          ref={gptSearchText}
          type="search"
          placeholder={language.gptInputPlaceholderText[prefferedLang]}
          className="w-6/12 md:w-8/12 py-2 px-2 md:py-4 md:px-4 text-[10px] md:text-lg rounded-l-md outline-none"
        />
        <button
          type="submit"
          className="w-3/12 md:w-2/12 py-2 px-2 md:py-4 md:px-4 text-[10px] md:text-lg font-bold bg-red-800 text-white"
        >
          {language.searchBtnText[prefferedLang]}
        </button>
        <button
          type="button"
          className=" w-3/12 md:w-2/12 py-2 px-2 md:py-4 md:px-4 text-[10px] md:text-l font-bold rounded-r-md text-red-800 bg-white"
          onClick={handleClearBtn}
        >
          {language.clearBtnText[prefferedLang]}
        </button>
      </form>
    </div>
  );
};

export default GptSearch;
