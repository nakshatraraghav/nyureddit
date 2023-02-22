import React from "react";
import { NextPage } from "next";
import PageLayout from "@/layouts/PageLayout";

import usePosts from "@/hooks/usePosts";
import PostItem from "@/components/Post/Posts/PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/app";

const PostPage: NextPage = () => {
  const { postsStateValue, setPostsStateValue, onVote, onDeletePost } =
    usePosts();

  const [user] = useAuthState(auth);
  if (postsStateValue.selectedPost) {
    return (
      <PageLayout>
        <>
          <PostItem
            post={postsStateValue.selectedPost}
            onVote={onVote}
            onDeletePost={onDeletePost}
            userVoteValue={
              postsStateValue.postVotes.find(
                (item) => item.id === postsStateValue.selectedPost?.id
              )?.voteValue
            }
            userIsCreator={
              user?.uid === postsStateValue.selectedPost?.creatorId
            }
          />
          {/* Selected Post */}
          {/* Comments */}
        </>
        <></>
      </PageLayout>
    );
  } else {
    return <div>post not found </div>;
  }
};

export default PostPage;
