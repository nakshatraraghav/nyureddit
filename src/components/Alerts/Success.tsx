import React from "react";

import { Remove } from "@/assets/icons";

type SuccessProps = {
  title: string;
  body: string;
  removeAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

const Success: React.FC<SuccessProps> = ({ removeAlert, body, title }) => {
  return (
    <div
      className="fixed bottom-4 left-4 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
      role="alert"
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <p className="font-bold text-lg">{title}</p>
          <Remove
            fontSize={24}
            className="cursor-pointer hover:opacity-75 transition-all duration-300"
            onClick={() => {
              removeAlert(false);
            }}
          />
        </div>

        <div>
          <p className="text-sm">{body}</p>
        </div>
      </div>
    </div>
  );
};

export default Success;
