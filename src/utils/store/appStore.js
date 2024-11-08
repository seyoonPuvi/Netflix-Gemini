import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import movieReducer from "./slice/movieSlice";
import gptReducer from "./slice/gptSlice";
import configReducer from "./slice/configSlice";
import movieDetailsReducer from "./slice/movieDetailsSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    gpt: gptReducer,
    config: configReducer,
    movieDetails: movieDetailsReducer,
  },
});

export default appStore;
