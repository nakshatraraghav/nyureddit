import { FC } from "react";

import { authModalState } from "@/atoms/authModal";
import { useAtom } from "jotai";
import Login from "./Login";
import SignUp from "./SignUp";

import { Inter } from "@next/font/google";
import ResetPassword from "./ResetPassword";

const inter = Inter({
  weight: "variable",
  subsets: ["latin"],
});

const AuthInputs: FC = () => {
  const [modalState] = useAtom(authModalState);
  return (
    <div className={`flex items-center w-full mt-4 ${inter.className}`}>
      {modalState.view === "login" && <Login />}
      {modalState.view === "signup" && <SignUp />}
      {modalState.view === "resetpassword" && <ResetPassword />}
    </div>
  );
};

export default AuthInputs;
