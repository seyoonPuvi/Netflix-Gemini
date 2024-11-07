export const website_LOGO_URL =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const profilePic_URL =
  "https://i.postimg.cc/rpqJzST6/the-batman-movie-poster-4k-wallpaper-1210d.jpg";

export const MOVIE_FETCH_URL = "https://api.themoviedb.org/3/movie/";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_API_KEY,
  },
};

export const IMAGE_CDN_URL = "https://image.tmdb.org/t/p/w500/";

export const GEMINIAI_API_KEY = process.env.REACT_APP_GEMINIAI_API_KEY;

export const movieSuggestion_TMDB_API_URL =
  "https://api.themoviedb.org/3/search/movie?";
