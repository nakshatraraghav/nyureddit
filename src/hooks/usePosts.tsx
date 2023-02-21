import React from "react";

import { useAtom } from "jotai";
import { Post, postsState } from "@/atoms/posts";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "@/firebase/app";
import { deleteDoc, doc } from "firebase/firestore";

const usePosts = () => {
  const [postsStateValue, setPostsStateValue] = useAtom(postsState);

  async function onVote() {}

  function onSelectPost() {}

  async function onDeletePost(post: Post) {
    // Step 1: Check if the post to be deleted has a image
    //    if so then delete the image from firebase storage

    // Step 2: Delete the doc from the posts collection

    // Step 3: Update the state to reflect the new Posts

    try {
      if (post.imageURL) {
        const imageRef = ref(storage, `${post.communityId}/${post.id}/image`);
        await deleteObject(imageRef);
      }
      // then delete the post
      const postDocRef = doc(firestore, `posts/${post.id}`);
      await deleteDoc(postDocRef);

      setPostsStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((doc) => post.id !== doc.id),
      }));
      return true;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  }

  return {
    postsStateValue,
    setPostsStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};

export default usePosts;
