import { Timestamp } from "firebase/firestore";
import { atom } from "jotai";

export type Post = {
  id: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body?: string;
  numberOfComments: number;
  voteStatus: number;
  imageURL?: string;
  communityImageURL?: string;
  createdAt: Timestamp;
};

export type PostVote = {
  id?: string;
  postId: string;
  communtiyId: string;
  voteValue: number;
};

interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  postVotes: PostVote[];
}

const defaultState: PostState = {
  selectedPost: null,
  posts: [],
  postVotes: [],
};

export const postsState = atom<PostState>(defaultState);
