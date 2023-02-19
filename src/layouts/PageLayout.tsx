import React from "react";

type PageLayoutProps = {
  children: React.ReactNode[];
};

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center px-4 py-0 border border-red-900">
      <div className="flex justify-center w-11/12 max-w-[860px] border border-green-900">
        <div className="flex flex-col w-full md:w-4/6 mr-0 md:mr-6 border border-orange-600">
          {children[0]}
        </div>
        {/*left container */}
        <div className="hidden flex-grow md:flex md:flex-col border border-black">
          {children[1]}
        </div>{" "}
        {/*right container */}
      </div>
    </div>
  );
};

export default PageLayout;
