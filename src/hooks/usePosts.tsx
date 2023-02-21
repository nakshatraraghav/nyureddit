import React from "react";

import { useAtom } from "jotai";
import { postsState } from "@/atoms/posts";

const usePosts = () => {
  const [postsStateValue, setPostsStateValue] = useAtom(postsState);

  function onVote() {}

  function onSelectPost() {}

  function onDeletePost() {}

  return {
    postsStateValue,
    setPostsStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};

export default usePosts;
