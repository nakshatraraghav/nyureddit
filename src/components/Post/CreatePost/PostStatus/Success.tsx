import React from "react";

const Sucess: React.FC = () => {
  return (
    <div
      className="fixed bottom-4 left-4 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
      role="alert"
    >
      <div className="flex">
        <div className="py-1"></div>
        <div>
          <p className="font-bold">Post Created</p>
          <p className="text-sm">Post has sucessfully been created</p>
        </div>
      </div>
    </div>
  );
};

export default Sucess;
