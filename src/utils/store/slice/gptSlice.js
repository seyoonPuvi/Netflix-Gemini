import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGPTSearchPage: false,
    movieNames: null,
    movieResults: null,
  },
  reducers: {
    toggleGPTSearchPage: (state, action) => {
      state.showGPTSearchPage = !state.showGPTSearchPage;
    },
    addMoviesInfo: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    removeGptSlice: (state) => {
      return {
        showGPTSearchPage: false,
        movieNames: null,
        movieResults: null,
      };
    },

    removeGptMovieSuggestion: (state) => {
      state.movieNames = null;
      state.movieResults = null;
    },
  },
});

export const {
  toggleGPTSearchPage,
  addMoviesInfo,
  removeGptSlice,
  removeGptMovieSuggestion,
} = gptSlice.actions;
export default gptSlice.reducer;
