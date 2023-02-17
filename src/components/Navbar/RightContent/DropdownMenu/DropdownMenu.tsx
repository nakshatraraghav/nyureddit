import React from "react";
import { Menu } from "@headlessui/react";
import { User } from "firebase/auth";
import MenuButton from "./MenuButton";
import DropdownMenuItems from "./DropdownMenuItems";

type DropdownMenuProps = {
  user?: User | null;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ user }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton user={user} />
      <DropdownMenuItems user={user} />
    </Menu>
  );
};

export default DropdownMenu;
