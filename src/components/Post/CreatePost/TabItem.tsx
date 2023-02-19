import type { Dispatch, SetStateAction } from "react";
import type { FormTab } from "./FormTabsData";

type TabItemProps = {
  item: FormTab;
  selected: boolean;
  setSelectedTab: Dispatch<SetStateAction<string>>;
};

const TabItem: React.FC<TabItemProps> = ({
  item,
  selected,
  setSelectedTab,
}) => {
  return (
    <div
      className={`flex flex-grow items-center justify-center p-2 border-r-[1px] text-gray-500 font-medium space-x-2 hover:bg-gray-50 ${
        selected ? "text-blue-600 border-b-2 border-b-blue-600" : ""
      }`}
      onClick={() => {
        setSelectedTab(item.title);
      }}
    >
      <div className="flex items-center justify-center">
        <item.icon />
      </div>
      <div className="hidden md:flex text-sm">{item.title}</div>
    </div>
  );
};

export default TabItem;
