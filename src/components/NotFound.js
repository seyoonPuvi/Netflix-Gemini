import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-black text-white h-screen flex flex-col gap-y-6 justify-center items-center">
      <img
        src="https://i.postimg.cc/3xMG5kKS/404-error.png"
        className="w-48 h-48 object-contain"
        alt="not-found-img"
      />
      <p className="text-3xl">The page you are looking for does not exist.</p>
      <button
        type="button"
        onClick={() => {
          navigate("/browse");
        }}
        className="px-4 py-4 rounded-lg bg-red-800"
      >
        HomePage
      </button>
    </div>
  );
};

export default NotFound;
