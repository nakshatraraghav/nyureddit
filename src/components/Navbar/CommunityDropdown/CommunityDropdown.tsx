import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

import { chevron } from "@/assets/icons";

import { DropdownAnimations } from "@/animations/dropdown";

import { BiHome } from "react-icons/bi";
// import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import Communities from "./Communities";

const CommunityDropdown: React.FC = () => {
  return (
    <Fragment>
      <div>
        <Menu
          as="div"
          className="relative inline-block text-left"
          id="headlessui-menu-button-:Rcim:"
        >
          <div>
            <Menu.Button className="flex w-full justify-center rounded-md p-[6px] text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <div className="flex md:space-x-1">
                <BiHome fontSize={18} className="md:mr-2" />
                <div className="hidden md:flex">Home</div>
              </div>
              <chevron.down className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>
          <Transition {...DropdownAnimations}>
            <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Communities />
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </Fragment>
  );
};

export default CommunityDropdown;
