import { atom, useAtom } from "jotai";

export interface createCommunityModalState {
  open: boolean;
}

export const CreateCommunityModalState = atom<createCommunityModalState>({
  open: false,
});
