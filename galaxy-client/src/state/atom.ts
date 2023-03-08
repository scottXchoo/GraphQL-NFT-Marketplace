import { atom } from "recoil";

export const chainStateAtom = atom<string>({
  key: "chainStateAtom",
  default: "ETH",
});
