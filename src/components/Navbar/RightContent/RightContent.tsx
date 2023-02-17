import AuthModal from "@/components/Modal/Auth/AuthModal";
import { User } from "firebase/auth";
import AuthButtons from "./AuthButtons";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import Icons from "./Icons";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <div>
      <AuthModal />
      <div className="flex items-center justify-between md:space-x-4">
        {user ? (
          <Icons />
        ) : (
          <div className="hidden md:flex">
            <AuthButtons />
          </div>
        )}
        <DropdownMenu user={user} />
      </div>
    </div>
  );
};

export default RightContent;
