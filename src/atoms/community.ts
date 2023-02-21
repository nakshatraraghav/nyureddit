import { atom } from "jotai";
import { Timestamp } from "firebase/firestore";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt: Timestamp;
  imageUrl?: string;
}

export interface CommunitySnippets {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

interface CommunityState {
  communitySnippets: CommunitySnippets[];
  currentCommunity?: Community;
}

const defaultState: CommunityState = {
  communitySnippets: [],
};

export const communityState = atom<CommunityState>(defaultState);
