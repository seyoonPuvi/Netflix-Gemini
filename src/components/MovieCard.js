import React from "react";
import { IMAGE_CDN_URL } from "../utils/constants";

const MovieCard = ({ title, posterPath }) => {
  if (!posterPath) return;
  return (
    <div className="w-40 rounded-lg ml-5">
      <img
        src={IMAGE_CDN_URL + posterPath}
        alt={title}
        className="object-cover object-center rounded-lg"
      />
    </div>
  );
};

export default MovieCard;