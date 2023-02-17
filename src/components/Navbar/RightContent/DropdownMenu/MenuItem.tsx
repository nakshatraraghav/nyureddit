import { Menu } from "@headlessui/react";

type MenuItemProps = {
  children: JSX.Element | string;
};

const MenuItem = ({ children }: MenuItemProps) => {
  return (
    <div className="p-1">
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${
              active ? "bg-zinc-800 text-white" : "text-gray-900"
            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
          >
            {children}
          </button>
        )}
      </Menu.Item>
    </div>
  );
};

export default MenuItem;
