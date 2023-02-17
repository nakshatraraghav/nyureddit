import React from "react";

import { useAtom } from "jotai";
import { authModalState } from "@/atoms/authModal";

const AuthButtons = () => {
  const [modalState, setModalState] = useAtom(authModalState);
  return (
    <div className="flex text-sm md:text-base space-x-2">
      {/* basically these buttons would trigger the modal to open and close */}
      <button
        className="button rounded-xl bg-slate-200 text-black hover:bg-black hover:text-white"
        onClick={() => {
          setModalState({
            view: "signup",
            open: true,
          });
        }}
      >
        Sign Up
      </button>
      <button
        className="button"
        onClick={() => {
          setModalState({
            view: "login",
            open: true,
          });
        }}
      >
        Log In
      </button>
    </div>
  );
};

export default AuthButtons;
