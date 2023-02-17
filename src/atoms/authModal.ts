import { atom } from "jotai";

export interface AuthModalState {
  open: boolean;
  view: "login" | "signup" | "resetpassword";
}

export const authModalState = atom<AuthModalState>({
  open: false,
  view: "login",
});
