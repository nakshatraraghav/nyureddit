import { Post, postsState, PostVote } from "@/atoms/posts";
import { auth, firestore, storage } from "@/firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useAtom, useAtomValue } from "jotai";

import { useAuthState } from "react-firebase-hooks/auth";

import { authModalState } from "@/atoms/authModal";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { communityState } from "@/atoms/community";
import { useRouter } from "next/router";

const usePosts = () => {
  const [postsStateValue, setPostsStateValue] = useAtom(postsState);
  const setAuthModalState = useSetAtom(authModalState);
  const { currentCommunity } = useAtomValue(communityState);
  const [user] = useAuthState(auth);

  const router = useRouter();

  async function onVote(post: Post, vote: number, communityId: string) {
    // User should not be able to vote if they are not logged in
    // this will pop up and ask the user to login to proceed
    if (!user) {
      setAuthModalState({
        open: true,
        view: "login",
      });
    }

    // destructring voteStatus from post
    const { voteStatus } = post;
    // checking to see if user has voted on this post before by iterating through the postVotes array
    const existingVote = postsStateValue.postVotes.find(
      (item) => item.postId === post.id
    );

    try {
      // this number signifies the ammount by which we change the post status
      // example: going from like to dislike changes voteStatus by -2
      // and so on
      let voteChange = vote;

      // Create instance of batch writes
      const batch = writeBatch(firestore);

      // Create copies of all state variable that would be modified
      // so as to change those variables without triggering
      // unncesarry renders
      let updatedPost = { ...post };
      let updatedPosts = [...postsStateValue.posts];
      let updatedPostVotes = [...postsStateValue.postVotes];

      // if user has not voted already
      if (!existingVote) {
        // create the document reference to the doc
        const postVoteDocRef = doc(
          collection(firestore, `users/${user?.uid}/postVotes`)
        );
        // create the new PostVote
        const newPostVote: PostVote = {
          id: postVoteDocRef.id,
          postId: post.id,
          communtiyId: communityId,
          voteValue: vote,
        };
        console.log("new Vote", newPostVote);
        // batch.set() to the postVoteDocRef
        batch.set(postVoteDocRef, newPostVote);

        // now we are updating the copied state variables
        updatedPost.voteStatus = voteStatus + vote;
        updatedPostVotes.push(newPostVote);
      } else {
        // in the previous case the PostVote document didnt exist and now it exists

        const postVoteDocRef = doc(
          firestore,
          `users/${user?.uid}/postVotes/${existingVote.id}`
        );

        if (existingVote.voteValue === vote) {
          // implies that user is trying to remove that vote
          voteChange = voteChange * -1;
          updatedPost.voteStatus = voteStatus - vote;
          updatedPostVotes = updatedPostVotes.filter(
            (item) => item.id !== existingVote.id
          );

          batch.delete(postVoteDocRef);
        } else {
          voteChange = 2 * vote;
          updatedPost.voteStatus = voteStatus + 2 * vote;
          const index = postsStateValue.postVotes.findIndex(
            (item) => item.id === existingVote.id
          );

          if (index !== -1) {
            updatedPostVotes[index] = {
              ...existingVote,
              voteValue: vote,
            };
          }

          batch.update(postVoteDocRef, {
            voteValue: vote,
          });
        }
      }

      let updatedState = { ...postsStateValue, postVotes: updatedPostVotes };

      const index = postsStateValue.posts.findIndex(
        (item) => item.id === post.id
      );

      updatedPosts[index!] = updatedPost;

      updatedState = {
        ...updatedState,
        posts: updatedPosts,
      };

      setPostsStateValue(updatedState);

      // check if this function is being called from a single post page or the community page

      if (postsStateValue.selectedPost) {
        setPostsStateValue((prev) => ({
          ...prev,
          selectedPost: updatedPost,
        }));
      }

      const postRef = doc(firestore, "posts", post.id);
      batch.update(postRef, {
        voteStatus: voteStatus + voteChange,
      });

      await batch.commit();

      // updated the state

      console.log(postsStateValue);
    } catch (error) {
      console.log(error);
    }
  }

  function onSelectPost(post: Post) {
    setPostsStateValue((prev) => ({
      ...prev,
      selectedPost: post,
    }));

    router.push(`${post.communityId}/comments/${post.id}`);
  }

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

  const getCommunityPostVotes = async (communityId: string) => {
    const postVotesQuery = query(
      collection(firestore, `users/${user?.uid}/postVotes`),
      where("communtiyId", "==", communityId)
    );
    const postVoteDocs = await getDocs(postVotesQuery);
    const postVotes = postVoteDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPostsStateValue((prev) => ({
      ...prev,
      postVotes: postVotes as PostVote[],
    }));
    console.log(postVotes);
  };

  useEffect(() => {
    if (!user?.uid || !currentCommunity) return;
    getCommunityPostVotes(currentCommunity.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, currentCommunity]);

  return {
    postsStateValue,
    setPostsStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  };
};

export default usePosts;
