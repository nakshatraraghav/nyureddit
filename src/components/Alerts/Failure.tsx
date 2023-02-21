import { Remove } from "@/assets/icons";
import React from "react";

type ErrorProps = {
  title: string;
  body: string;
  removeAlert: React.Dispatch<React.SetStateAction<string>>;
};

const Error: React.FC<ErrorProps> = ({ removeAlert, body, title }) => {
  return (
    <div role="alert" className="fixed bottom-4 left-4">
      <div className="flex justify-between items-center bg-red-500 text-white font-bold text-lg rounded-t px-4 py-2">
        <div>{title}</div>
        <Remove
          fontSize={24}
          className="cursor-pointer hover:opacity-75 transition-all duration-300"
          onClick={() => {
            removeAlert("");
          }}
        />
      </div>

      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>{body}</p>
      </div>
    </div>
  );
};

export default Error;
