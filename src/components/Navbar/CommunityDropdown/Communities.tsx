import MenuItem from "../RightContent/DropdownMenu/MenuItem";

import { CreateCommunityModalState } from "@/atoms/createCommunityModal";
import { useAtom } from "jotai";
import { authModalState } from "@/atoms/authModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/app";

import { MenuItemIcons } from "@/assets/icons";

const Communities = () => {
  const [, setModalState] = useAtom(CreateCommunityModalState);
  const [, setAuthModal] = useAtom(authModalState);
  const [user, loading, error] = useAuthState(auth);
  return (
    <MenuItem>
      <div>
        {user ? (
          <div
            onClick={() => {
              setModalState({
                open: true,
              });
            }}
          >
            Create a Community
          </div>
        ) : (
          <div
            className="flex items-center space-x-2"
            onClick={() => {
              setAuthModal({
                open: true,
                view: "login",
              });
            }}
          >
            <MenuItemIcons.logout fontSize={20} />
            <div className="">Login to Create a Community</div>
          </div>
        )}
      </div>
    </MenuItem>
  );
};

export default Communities;
