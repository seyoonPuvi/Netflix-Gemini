import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGPTSearchPage: false,
    movieNames: null,
    movieResults: null,
    isGptLoading: false,
  },
  reducers: {
    toggleGPTSearchPage: (state, action) => {
      state.showGPTSearchPage = !state.showGPTSearchPage;
    },
    setGptLoading: (state, action) => {
      state.isGptLoading = action.payload;
    },
    addMoviesInfo: (state, action) => {
      const { movieNames, movieResults, isLoading } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
      state.isGptLoading = isLoading;
    },
    removeGptSlice: (state) => {
      return {
        showGPTSearchPage: false,
        movieNames: null,
        movieResults: null,
        isGptLoading: false,
      };
    },

    removeGptMovieSuggestion: (state) => {
      state.movieNames = null;
      state.movieResults = null;
      state.isGptLoading = false;
    },
  },
});

export const {
  toggleGPTSearchPage,
  addMoviesInfo,
  removeGptSlice,
  removeGptMovieSuggestion,
  setGptLoading,
} = gptSlice.actions;
export default gptSlice.reducer;
