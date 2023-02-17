import React, { Fragment } from "react";

import { MenuButtonIcons } from "@/assets/icons";

import { Menu } from "@headlessui/react";
import { User } from "firebase/auth";

type DropdownMenuProps = {
  user?: User | null;
};

const MenuButton: React.FC<DropdownMenuProps> = (user) => {
  return (
    <div>
      <Menu.Button
        id="idk wtf"
        className="flex items-center justify-center cursor-pointer px-0 py-2 rounded-lg hover:outline-red-200 outline-slate-500"
      >
        {user ? (
          <div className="flex items-center">
            <div className="flex items-center space-x-1">
              <Fragment>
                <MenuButtonIcons.reddit
                  fontSize={28}
                  className="mr-1 text-gray-400"
                />
                {user ? (
                  <div className="hidden lg:text-sm">
                    {user?.user?.displayName ||
                      user?.user?.email?.split("@")[0]}
                  </div>
                ) : null}
              </Fragment>
              <MenuButtonIcons.chevron fontWeight={700} />
            </div>
          </div>
        ) : (
          <MenuButtonIcons.account />
        )}
      </Menu.Button>
    </div>
  );
};

export default MenuButton;
