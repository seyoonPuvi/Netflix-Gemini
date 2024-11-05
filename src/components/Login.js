import React, { useState, useRef } from "react";
import { language } from "../utils/languageConstants";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { profilePic_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const prefferedLang = useSelector((store) => store.config?.prefferedLang);
  const [isSignIn, toggleSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    const nameValue = name.current ? name.current.value : "";
    const emailValue = email.current ? email.current.value : "";
    const passwordValue = password.current ? password.current.value : "";

    const message = checkValidData(
      isSignIn,
      nameValue,
      emailValue,
      passwordValue
    );
    setErrorMessage(message);
    if (message) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameValue,
            photoURL: profilePic_URL,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode + " " + errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
          // ..
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {})
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };

  return (
    <>
      <div className="bg-loginPageBg h-lvh">
        <Header />
        <div className="h-3/4 w-full flex justify-center items-center">
          <form
            className="bg-black  w-[350px] opacity-90 py-10 px-8 text-white rounded-lg"
            onSubmit={(e) => e.preventDefault()}
          >
            <h1 className="text-3xl  font-bold mb-8">
              {isSignIn
                ? language.signIN[prefferedLang]
                : language.signUP[prefferedLang]}
            </h1>
            {!isSignIn && (
              <input
                ref={name}
                type="text"
                placeholder={language.fullName[prefferedLang]}
                className="p-3 my-3 w-full bg-slate-700"
              />
            )}
            <input
              ref={email}
              type="text"
              placeholder={language.email[prefferedLang]}
              className="p-3 my-3 w-full bg-slate-700"
            />
            <input
              ref={password}
              type="password"
              placeholder={language.password[prefferedLang]}
              className="p-3 my-3 w-full bg-slate-700"
            />
            <p className="text-red-600 text-xl">{errorMessage}</p>
            <button
              type="button"
              className="bg-red-800 font-bold text-xl w-full my-6 p-2 rounded-lg"
              onClick={handleButtonClick}
            >
              {isSignIn
                ? language.signIN[prefferedLang]
                : language.signUP[prefferedLang]}
            </button>
            <p
              className="pl-1 cursor-pointer"
              onClick={() => {
                toggleSignIn(!isSignIn);
              }}
            >
              {isSignIn
                ? language.newToNetflix[prefferedLang]
                : language.alreadyAMember[prefferedLang]}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
