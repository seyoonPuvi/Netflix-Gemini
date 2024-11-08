import { createSlice } from "@reduxjs/toolkit";

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState: {
    aboutMovie: null,
    movieTrailer: null,
    similarMovies: null,
    genre: null,
    isLoading: null,
  },
  reducers: {
    addAboutMovie: (state, action) => {
      state.aboutMovie = action.payload;
    },
    addMovieTrailer: (state, action) => {
      state.movieTrailer = action.payload;
    },
    addSimilarMovies: (state, action) => {
      state.similarMovies = action.payload;
    },
    addGenre: (state, action) => {
      state.genre = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    removeMovieDetails: (state) => {
      return {
        aboutMovie: null,
        movieTrailer: null,
        similarMovies: null,
        genre: null,
        isLoading: null,
      };
    },
  },
});

export const {
  addAboutMovie,
  addMovieTrailer,
  addSimilarMovies,
  addGenre,
  removeMovieDetails,
  setLoading,
} = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;
