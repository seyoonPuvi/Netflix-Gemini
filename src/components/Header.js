import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser, addUserName, removeUser } from "../utils/userSlice";
import { website_LOGO_URL } from "../utils/constants";
import { removeMovies } from "../utils/movieSlice";
import { removeGptSlice, toggleGPTSearchPage } from "../utils/gptSlice";
import { language, languageOptions } from "../utils/languageConstants";
import { setLanguage } from "../utils/configSlice";

const Header = () => {
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
        navigate("/");
      }
    });
    return () => unsubscribe(); // Clean up the subscription when the component unmounts
  }, []);

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
    <div className="flex justify-between items-center w-screen absolute bg-gradient-to-b from-black z-50">
      <div className="ml-8">
        <img
          src={website_LOGO_URL}
          alt="netflix-logo"
          className="w-[200px] h-25  brightness-200"
        />
      </div>

      <div className="flex items-center justify-around  w-[32%] mr-8">
        <select
          onChange={handleLanguagePreference}
          className="bg-gray-900 text-white font-bold px-2 py-2 opacity-90 rounded-md"
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
              className="px-2 py-2 rounded-md bg-purple-900 text-white border-none outline-none hover:opacity-60"
              onClick={handleGptSearchPage}
            >
              {gptPage
                ? language.homePage[prefferedLang]
                : language.gptSearch[prefferedLang]}
            </button>
            <div className="flex items-center">
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
              className=" text-white font-bold cursor-pointer px-2 py-2 bg-red-800 border-none outline-none rounded-md hover:opacity-60"
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
