import React, { Fragment } from "react";

import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOffOutline,
} from "react-icons/io5";

const Icons: React.FC = () => {
  return (
    <div className="flex">
      <div className="hidden items-center border-r-2 border-gray-900-300 md:flex ">
        <div className="flex mx-1 p-1 cursor-pointer rounded-xl">
          <BsArrowUpRightCircle fontSize={20} />
        </div>
        <div className="flex mx-1 p-1 cursor-pointer rounded-xl">
          <IoFilterCircleOutline fontSize={22} />
        </div>
        <div className="flex mx-1 p-1 fontSize={22}1 p-1 cursor-pointer rounded-xl">
          <IoVideocamOffOutline fontSize={22} />
        </div>
      </div>
      <Fragment>
        <div className="flex mx-1 p-1 cursor-pointer rounded-xl">
          <BsChatDots fontSize={20} />
        </div>
        <div className="flex mx-1 p-1 cursor-pointer rounded-xl">
          <IoNotificationsOutline fontSize={20} />
        </div>
        <div className="hidden md:flex mx-1 p-1 cursor-pointer rounded-xl">
          <GrAdd fontSize={20} />
        </div>
      </Fragment>
    </div>
  );
};

export default Icons;
