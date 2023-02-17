import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect } from "react";

import { modalAnimations } from "@/animations/modal";
import AuthInputs from "./AuthInputs";

import { useAtom } from "jotai";
import { authModalState } from "@/atoms/authModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/app";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useAtom(authModalState);
  const [user] = useAuthState(auth);
  console.log(user);

  useEffect(() => {
    if (user) {
      setModalState({
        ...modalState,
        open: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function toggleModalState() {
    setModalState({
      ...modalState,
      open: !modalState.open,
    });
  }
  return (
    <Fragment>
      <Transition appear show={modalState.open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleModalState}>
          <Transition.Child {...modalAnimations.open}>
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child {...modalAnimations.close}>
                <Dialog.Panel className="w-[600px] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className={`flex-col items-center justify-center`}>
                    <AuthInputs />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};

export default AuthModal;
