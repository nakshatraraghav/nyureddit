import { Community } from "@/atoms/community";
import { auth, firestore } from "@/firebase/app";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import usePosts from "@/hooks/usePosts";
import { Post } from "@/atoms/posts";
import PostItem from "./PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import PostSkeletonLoader from "./PostSkeletonLoader";

type PostsProps = {
  communtiy: Community;
};

const Posts: React.FC<PostsProps> = ({ communtiy }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [user] = useAuthState(auth);
  const {
    postsStateValue,
    setPostsStateValue,
    onDeletePost,
    onVote,
    onSelectPost,
  } = usePosts();

  useEffect(() => {
    async function getAllPosts() {
      setLoading(true);
      try {
        const postsCollectionRef = collection(firestore, "posts");
        const postsQuery = query(
          postsCollectionRef,
          where("communityId", "==", communtiy.id),
          orderBy("createdAt", "desc")
        );
        const postsDocs = await getDocs(postsQuery);
        const posts = postsDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostsStateValue((prev) => ({
          ...prev,
          posts: posts as Post[],
        }));
      } catch (err: any) {
        setError(err.message);
        console.log(err);
      }
      setLoading(false);
    }

    getAllPosts();
  }, []);

  return (
    <div className="flex flex-col">
      {!loading ? (
        postsStateValue.posts.map((post) => (
          <PostItem
            key={post.title}
            post={post}
            onDeletePost={onDeletePost}
            onVote={onVote}
            onSelectPost={onSelectPost}
            userVoteValue={
              postsStateValue.postVotes.find((vote) => vote.postId === post.id)
                ?.voteValue
            }
            userIsCreator={user?.uid === post.creatorId}
          />
        ))
      ) : (
        <div>
          <PostSkeletonLoader />
          <PostSkeletonLoader />
          <PostSkeletonLoader />
          <PostSkeletonLoader />
        </div>
      )}
    </div>
  );
};

export default Posts;
