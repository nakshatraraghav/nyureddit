import React from "react";

import { useSetAtom } from "jotai";
import { authModalState } from "@/atoms/authModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/app";

import { CreatePostLinkIcons } from "@/assets/icons";
import { useRouter } from "next/router";

const CreatePostLink: React.FC = () => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetAtom(authModalState);
  const router = useRouter();
  function handleOnClick() {
    if (!user) {
      setAuthModalState({
        open: true,
        view: "login",
      });
    }
    router.push(`/r/${router.query.id}/submit`);
  }

  return (
    <div className="flex justify-evenly items-center bg-white h-14 border-[1px] border-gray-400 p-2 mb-4 cursor-pointer">
      <CreatePostLinkIcons.reddit fontSize={36} className="text-gray-400" />
      <input
        type="text"
        placeholder="Create Post"
        className="input['text'] bg-gray-100 border-gray-200 h-[36px] rounded-lg text-sm placeholder:text-gray-400 hover:bg-white hover:border-[1px] hover:border-blue-500 focus:outline-none focus:border-[1px] focus:border-blue-500 transition-all duration-150"
        onClick={handleOnClick}
      />
      <CreatePostLinkIcons.image fontSize={28} className="text-gray-500" />
      <CreatePostLinkIcons.link fontSize={28} className="text-gray-500" />
    </div>
  );
};

export default CreatePostLink;
