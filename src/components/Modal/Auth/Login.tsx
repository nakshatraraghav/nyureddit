import { FormEvent, useState } from "react";

import { authModalState } from "@/atoms/authModal";
import { useAtom } from "jotai";

import { auth } from "@/firebase/app";
import FIREBASE_ERRORS from "@/firebase/errors";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [modalState, setModalState] = useAtom(authModalState);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    signInWithEmailAndPassword(email, password);
    console.log(user);
  };

  return (
    <form className="px-8 pt-2 pb-8 mb-4 w-full">
      <div>
        <h1 className="text-2xl mb-4">Login</h1>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="username">
          E-Mail
        </label>
        <input
          className="shadow bg-slate-100 appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight hover:border-blue-500 focus:outline-none"
          value={email}
          type="text"
          required
          placeholder="email"
          onChange={(evt) => {
            setEmail(evt.target.value);
          }}
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow bg-slate-100 appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight hover:border-blue-500 focus:outline-none"
          name="password"
          type="password"
          value={password}
          required
          placeholder="******************"
          onChange={(evt) => {
            setPassword(evt.target.value);
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        {loading ? (
          <button disabled className="button opacity-50">
            Loading
          </button>
        ) : (
          <button className="button" onClick={onSubmit}>
            Log In
          </button>
        )}
        <button
          className="text-blue-400 hover:text-blue-700 transition-all duration-300 hover:underline"
          onClick={(evt) => {
            setModalState({
              ...modalState,
              view: "resetpassword",
            });
          }}
        >
          Forgot Password?
        </button>
      </div>
      <p className="text-red-600 font-semibold mt-2">
        {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
      </p>
      <p className="mt-6">
        new to pureddit?{" "}
        <span
          className="text-blue-500 hover:text-blue-800 transition-none duration-300 cursor-pointer"
          onClick={() => {
            setModalState({
              ...modalState,
              view: "signup",
            });
          }}
        >
          Sign Up
        </span>
      </p>
    </form>
  );
};

export default Login;
