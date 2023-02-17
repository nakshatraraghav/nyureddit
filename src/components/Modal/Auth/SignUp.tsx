import { FormEvent, useEffect, useState } from "react";

import { authModalState } from "@/atoms/authModal";
import { useAtom } from "jotai";

import { auth, firestore } from "@/firebase/app";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import FIREBASE_ERRROS from "@/firebase/errors";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>("");
  const [modalState, setModalState] = useAtom(authModalState);

  const [createUserWithEmailAndPassword, userCredential, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const createUserDocument = async (user: User) => {
    // await addDoc(collection(firestore, "users"), JSON.parse(JSON.stringify(user)));
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCredential) {
      createUserDocument(userCredential.user);
    }
  }, [userCredential]);

  const onSubmit = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (error) {
      setError("");
      return;
    }
    if (!email || email.length === 0 || !password || password.length === 0) {
      setError("invalid email or password length please check it again");
      return;
    }
    createUserWithEmailAndPassword(email, password);
  };

  return (
    <form className="px-8 pt-2 pb-8 mb-4 w-full">
      <div>
        <h1 className="text-2xl mb-4">Sign Up</h1>
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
          placeholder="example@host.com"
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
      {loading ? (
        <button disabled className="button opacity-50">
          Loading
        </button>
      ) : (
        <button className="button" onClick={onSubmit}>
          Sign Up
        </button>
      )}
      {error || userError ? (
        <p className="text-red-600 font-semibold mt-2">
          {error ||
            FIREBASE_ERRROS[userError?.message as keyof typeof FIREBASE_ERRROS]}
        </p>
      ) : null}
      <p className="mt-6">
        already have an account?{" "}
        <span
          className="text-blue-500 hover:text-blue-800 transition-none duration-300 cursor-pointer"
          onClick={() => {
            setModalState({
              ...modalState,
              view: "login",
            });
          }}
        >
          Log In
        </span>
      </p>
    </form>
  );
};

export default SignUp;
