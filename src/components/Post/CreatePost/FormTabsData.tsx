import { CreatePostFormIcons } from "@/assets/icons";
import { IconType } from "react-icons";

export type FormTab = {
  title: string;
  icon: IconType;
};

const formTabs: FormTab[] = [
  {
    title: "Post",
    icon: CreatePostFormIcons.post,
  },
  {
    title: "Images & Video",
    icon: CreatePostFormIcons.image,
  },
  {
    title: "Link",
    icon: CreatePostFormIcons.link,
  },
  {
    title: "Poll",
    icon: CreatePostFormIcons.poll,
  },
  {
    title: "Talk",
    icon: CreatePostFormIcons.talk,
  },
];

export default formTabs;
