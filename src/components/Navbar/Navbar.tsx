import React from "react";

import Image from "next/image";

import redditFace from "../../assets/images/redditFace.svg";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/app";
import CommunityDropdown from "./CommunityDropdown/CommunityDropdown";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <nav className="h-14 p-4 flex items-center space-x-4 bg-white">
      <div className="flex space-x-2">
        <Image src={redditFace} height="30" width={30} alt="reddit logo" />
        <h1 className="hidden text-xl md:flex">nyureddit</h1>
      </div>
      <CommunityDropdown />
      <SearchInput />
      <RightContent user={user} />
      {/* <RightContent user={user} /> */}
      {/* <AuthModal /> */}
    </nav>
  );
};

export default Navbar;
