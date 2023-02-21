import { Community } from "@/atoms/community";
import React from "react";

import { auth } from "@/firebase/app";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiCake } from "react-icons/bi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import UpdateCommunityImage from "./UpdateCommunityImage";

type AboutProps = {
  community: Community;
};

const About: React.FC<AboutProps> = ({ community }) => {
  const [user] = useAuthState(auth);

  return (
    <div className="sticky top-[14px] mt-6">
      <div className="flex justify-between items-center bg-blue-400 text-white p-3 rounded-t">
        <div className="flex text-sm font-bold">About This Community</div>
        <div className="px-3 py-2 hover:bg-blue-500 cursor-pointer transition-all duration-300 rounded-lg">
          <HiOutlineDotsHorizontal />
        </div>
      </div>
      <div className="flex flex-col p-3 bg-white rounded">
        <div className="flex flex-col space-y-2">
          <div className="font-medium">{community.id}</div>
          <div className="flex space-x-2 items-center text-sm border-b-2 pb-4 border-gray-300">
            <BiCake fontSize={16} />
            <div>
              Created At{"  "}
              {moment(new Date(community.createdAt.seconds * 1000)).format(
                "DD MMM YYYY"
              )}
            </div>
          </div>
          <div className="flex justify-between items-center border-b-2 border-gray-300 pb-4">
            <div className="flex flex-col text-sm font-medium space-y-1">
              <div>Members</div>
              <div>{community.numberOfMembers.toLocaleString()}</div>
            </div>
            <div className="flex flex-col text-sm font-medium space-y-1">
              <div>Active Members</div>
              <div>{community.numberOfMembers.toLocaleString()}</div>
            </div>
          </div>
          {/* <button className="button w-full">Create Post</button> */}
        </div>
        {community.creatorId === user?.uid && (
          <UpdateCommunityImage community={community} />
        )}
      </div>
    </div>
  );
};

export default About;
