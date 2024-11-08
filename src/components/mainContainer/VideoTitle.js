import React from "react";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { language } from "../../utils/constants/languageConstants";
import { useSelector } from "react-redux";

const VideoTitle = ({ title, overview }) => {
  const prefferedLang = useSelector((store) => store.config?.prefferedLang);
  const showBrowsePage = useSelector((store) => store.movies?.showBrowsePage);

  if (!showBrowsePage) return;

  return (
    <div className="w-screen aspect-video flex flex-col md:pt-[20%] pt-32 gap-y-2 pl-4 md:pl-12 mb-40 text-white absolute md:z-40">
      <h1 className="font-bold text-xl md:text-6xl">{title}</h1>
      <h3 className="text-xl w-[40%] pl-2 md:block hidden">{overview}</h3>
      <div className="flex items-center gap-x-5 pl-2">
        <button className="flex items-center  gap-x-1  py-[5px] px-[10px] md:py-[10px] md:px-[25px] bg-white text-black rounded-lg hover:opacity-60">
          <FaPlay />
          <span className="font-bold">{language.play[prefferedLang]}</span>
        </button>
        <button className=" hidden md:flex items-center  gap-x-1 py-[10px] px-[25px]  bg-gray-600 opacity-50 text-black rounded-lg hover:opacity-100">
          <FaInfoCircle />
          <span className="font-bold">{language.moreInfo[prefferedLang]}</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
