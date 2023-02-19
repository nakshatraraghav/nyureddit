import React from "react";

const Error: React.FC = () => {
  return (
    <div role="alert" className="fixed bottom-4 left-4">
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        Could Not Create Post
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
