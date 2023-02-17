import { ChangeEvent, FC, FormEvent, Fragment, useState } from "react";

import { authModalState } from "@/atoms/authModal";
import { useAtom } from "jotai";

import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/app";

import FIREBASE_ERRORS from "@/firebase/errors";

const ResetPassword: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [sucess, setSucess] = useState<boolean>(false);
  const [modalState, setModalState] = useAtom(authModalState);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmit = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (!email || email.length === 0) {
      setFormError("Please enter a valid email");
      return;
    }
    if (error) {
      setFormError(error.message);
      return;
    }
    sendPasswordResetEmail(email)
      .then(() => {
        setSucess(true);
      })
      .catch((error) => {
        alert(error.message);
        setFormError(error.message);
      });
  };

  return (
    <form className="px-8 pt-2 pb-8 mb-4 w-full">
      <div>
        <h1 className="text-2xl mb-4">Reset Password</h1>
      </div>
      {sucess ? (
        <p>Please check your email, we have sent you password reset mail</p>
      ) : (
        <Fragment>
          <p>
            Enter the E-Mail associated with your account and we&apos;ll send
            you a reset link
          </p>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              E-Mail
            </label>
            <input
              type="email"
              name="email"
              value={email}
              className="shadow rounded-2xl bg-slate-100 appearance-none border-2 w-full py-2 px-3 text-gray-700 leading-tight hover:border-blue-500 focus:outline-none"
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                setEmail(evt.target.value);
              }}
            />
          </div>
          <button
            className="button rounded-xl bg-slate-200 text-black hover:bg-black hover:text-white"
            onClick={onSubmit}
          >
            Reset Password
          </button>
          <p className="text-red-600 font-semibold mt-2">
            {formError
              ? FIREBASE_ERRORS[formError as keyof typeof FIREBASE_ERRORS] ||
                formError
              : null}
          </p>
          <p className="mt-4">
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
        </Fragment>
      )}
    </form>
  );
};

export default ResetPassword;
