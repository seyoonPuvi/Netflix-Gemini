import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    trendingMovies: null,
    trailerVideoPlaying: null,
    upcomingMovies: null,
    showBrowsePage: false,
    randomMovie: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    setRandomMovie: (state, action) => {
      state.randomMovie = action.payload;
    },
    addTrailerVideoPlaying: (state, action) => {
      state.trailerVideoPlaying = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    removeMovies: (state, action) => {
      return {
        nowPlayingMovies: null,
        popularMovies: null,
        topRatedMovies: null,
        upcomingMovies: null,
        trendingMovies: null,
        trailerVideoPlaying: null,
        randomMovie: null,
      };
    },
    setShowBrowsePage: (state, action) => {
      state.showBrowsePage = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideoPlaying,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addTrendingMovies,
  removeMovies,
  setShowBrowsePage,
  setRandomMovie,
} = movieSlice.actions;

export default movieSlice.reducer;
