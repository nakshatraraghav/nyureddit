import { BsMic, BsMoon, BsSun } from "react-icons/bs";

import { BsChevronDown } from "react-icons/bs";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";

import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";

import { AiOutlineStar } from "react-icons/ai";

import { BiChevronDown, BiChevronUp } from "react-icons/bi";

import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { BsLink45Deg } from "react-icons/bs";

import { BiPoll } from "react-icons/bi";
import { IoDocumentText } from "react-icons/io5";

import { RxCrossCircled } from "react-icons/rx";

export const Remove = RxCrossCircled;

export const CreatePostFormIcons = {
  post: IoDocumentText,
  image: IoImageOutline,
  link: BsLink45Deg,
  poll: BiPoll,
  talk: BsMic,
};

export const CreatePostLinkIcons = {
  reddit: FaReddit,
  image: IoImageOutline,
  link: BsLink45Deg,
};

export const CommunityModalIcons = {
  public: BsFillPersonFill,
  restricted: BsFillEyeFill,
  private: HiLockClosed,
};

export const chevron = {
  down: BiChevronDown,
  up: BiChevronUp,
};

export const themeIcons = {
  dark: BsMoon,
  light: BsSun,
};

export const MenuButtonIcons = {
  chevron: BsChevronDown,
  reddit: FaRedditSquare,
  account: VscAccount,
};

export const MenuItemIcons = {
  profile: CgProfile,
  logout: MdOutlineLogin,
  karma: AiOutlineStar,
};
