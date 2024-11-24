import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebaseConfig/firebase";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/store/slice/userSlice";
import { website_LOGO_URL } from "../utils/constants/constants";
import { removeMovies } from "../utils/store/slice/movieSlice";
import {
  removeGptSlice,
  toggleGPTSearchPage,
} from "../utils/store/slice/gptSlice";
import {
  language,
  languageOptions,
} from "../utils/constants/languageConstants";
import { setLanguage } from "../utils/store/slice/configSlice";
import { removeMovieDetails } from "../utils/store/slice/movieDetailsSlice";

const Header = ({ login }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const gptPage = useSelector((store) => store.gpt?.showGPTSearchPage);
  const prefferedLang = useSelector((store) => store.config?.prefferedLang);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("preferredLanguage");
    if (storedLanguage) {
      dispatch(setLanguage(storedLanguage));
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user.auth.currentUser;
        dispatch(addUser({ uid, displayName, email, photoURL }));
        navigate("/browse");
      } else {
        // User is signed out
        localStorage.removeItem("preferredLanguage");
        dispatch(removeUser());
        dispatch(removeMovies());
        dispatch(removeGptSlice());
        dispatch(removeMovieDetails());
        navigate("/");
      }
    });
    return () => unsubscribe(); // Clean up the subscription when the component unmounts
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  const handleGptSearchPage = () => {
    dispatch(toggleGPTSearchPage());
  };

  const handleLanguagePreference = (e) => {
    dispatch(setLanguage(e.target.value));
    localStorage.setItem("preferredLanguage", e.target.value);
  };

  return (
    <div
      className={`flex-col pb-4 gap-y-9 md:flex-row flex pt-4 md:justify-between items-center w-screen md:absolute  md:pb-3 ${
        gptPage
          ? "absolute bg-black bg-opacity-80"
          : login
          ? "bg-transparent"
          : "bg-black"
      } md:bg-transparent z-50`}
    >
      <div className="md:ml-8  flex justify-between w-screen">
        <img
          src={website_LOGO_URL}
          alt="netflix-logo"
          className="w-[100px] md:w-[150px]  h-10 md:h-20  brightness-200 m-0"
        />
        <div className="flex items-center md:hidden pr-5">
          {user?.photoURL && (
            <img
              src={user?.photoURL}
              alt="profile-pic"
              className="w-8 h-8 bg-center bg-cover"
            />
          )}
          <p className="text-white font-bold mx-1">{user?.displayName}</p>
        </div>
      </div>

      <div className="flex items-center justify-around md:justify-end md:gap-x-5 md:mr-8 w-screen">
        <select
          onChange={handleLanguagePreference}
          className={`bg-gray-900 text-white  text-[10px] md:text-[16px] font-bold md:px-2 md:py-2 px-1 py-1 opacity-90 rounded-md ${
            login ? "absolute top-5 right-2" : null
          }`}
          value={prefferedLang}
        >
          {languageOptions.map((each) => (
            <option key={each} value={each} className="bg-gray-900">
              {each}
            </option>
          ))}
        </select>

        {user && (
          <>
            <button
              type="button"
              className="md:px-2 md:py-2 px-1.5 py-1 text-[10px] md:text-[16px] rounded-md bg-purple-900 text-white border-none outline-none hover:opacity-60"
              onClick={handleGptSearchPage}
            >
              {gptPage
                ? language.homePage[prefferedLang]
                : language.gptSearch[prefferedLang]}
            </button>
            <div className="md:flex md:items-center hidden ">
              {user?.photoURL && (
                <img
                  src={user?.photoURL}
                  alt="profile-pic"
                  className="w-12 h-12 bg-center bg-cover"
                />
              )}
              <p className="text-white font-bold mx-1">{user?.displayName}</p>
            </div>
            <button
              type="button"
              className=" text-white text-[10px] md:text-[16px] font-bold cursor-pointer md:px-2 md:py-2 px-1.5 py-1 bg-red-800 border-none outline-none rounded-md hover:opacity-60"
              onClick={handleSignOut}
            >
              {language.signOut[prefferedLang]}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
