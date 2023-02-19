import { Remove } from "@/assets/icons";
import React from "react";

type ErrorProps = {
  removeAlert: React.Dispatch<React.SetStateAction<string>>;
};

const Error: React.FC<ErrorProps> = ({ removeAlert }) => {
  return (
    <div role="alert" className="fixed bottom-4 left-4">
      <div className="flex justify-between items-center bg-red-500 text-white font-bold text-lg rounded-t px-4 py-2">
        <div>Could Not Create Post</div>
        <Remove
          fontSize={24}
          className="cursor-pointer hover:opacity-75 transition-all duration-300"
          onClick={() => {
            removeAlert("");
          }}
        />
      </div>

      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>
          Error while creating post, please try again later, or with a better
          internet connection
        </p>
      </div>
    </div>
  );
};

export default Error;
