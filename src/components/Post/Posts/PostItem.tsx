import { Post } from "@/atoms/posts";
import React, { Fragment, useState } from "react";

import { PostIcons } from "@/assets/icons";

import moment from "moment";
import Image from "next/image";
import Spinner from "@/components/Spinner/Spinner";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean; // we will use this to conditionally show the delete post button
  userVoteValue?: number;
  onVote: () => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost: () => void;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}) => {
  const [error, setError] = useState<string>("");
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const handleDeletePost = async () => {
    setDeleteLoading(true);
    try {
      console.log("delete button clicked");
      const success = await onDeletePost(post);
      if (!success) {
        throw Error("failed to delete this post");
      }

      console.log("post deletd");
    } catch (error: any) {
      setError(error.message);
    }
    setDeleteLoading(false);
  };

  return (
    <div
      className="flex bg-white border-2 border-gray-400 rounded hover:border-gray-500 cursor-pointer"
      onClick={onSelectPost}
    >
      <div className="flex flex-col items-center bg-gray-100 p-2 w-[40px] rounded space-y-2">
        <div
          className={`mt-2 ${
            userVoteValue === 1 ? "text-red-500" : "text-gray-400"
          }`}
        >
          {userVoteValue === 1 ? (
            <PostIcons.upvote fontSize={22} />
          ) : (
            <PostIcons.upvoted fontSize={22} />
          )}
        </div>
        <div>{post.voteStatus}</div>
        <div
          className={`${
            userVoteValue === -1 ? "text-red-500" : "text-gray-400"
          }`}
        >
          {userVoteValue === -1 ? (
            <PostIcons.downvote fontSize={22} />
          ) : (
            <PostIcons.downvoted fontSize={22} />
          )}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col space-y-2 p-3">
          <div className="flex space-x-2 text-xs">
            {/* check if we are on home page, if we are then show the communnity image */}
            <div className="text-gray-400">
              Posted by u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
            </div>
          </div>
          <div className="mb-2">
            <div className="text-lg font-medium">{post.title}</div>
            <div>{post.body}</div>
          </div>
          {post.imageURL && (
            <Image
              src={post.imageURL}
              height={400}
              width={400}
              alt="image posted by user"
              className="object-contain"
            />
          )}
        </div>
        <div className="flex ml-2 mb-2 space-x-4 text-gray-500 text-sm font-medium">
          <div className="flex items-center px-2 py-2 rounded hover:bg-gray-200 space-x-2 justify-between transition-all duration-300">
            <PostIcons.chat />
            <div>{post.numberOfComments}</div>
          </div>
          <div className="flex items-center px-2 py-2 rounded hover:bg-gray-200 space-x-2 justify-between transition-all duration-300">
            <PostIcons.share />
            <div>Share</div>
          </div>
          <div className="flex items-center px-2 py-2 rounded hover:bg-gray-200 space-x-2 justify-between transition-all duration-300">
            <PostIcons.save />
            <div>Save</div>
          </div>
          {userIsCreator ? (
            <div
              className="flex items-center px-2 py-2 rounded hover:bg-gray-200 space-x-2 justify-between transition-all duration-300"
              onClick={handleDeletePost}
            >
              {deleteLoading ? (
                <Fragment>
                  <Spinner />
                  <div>Deleting</div>
                </Fragment>
              ) : (
                <Fragment>
                  <PostIcons.delete />
                  <div>Delete</div>
                </Fragment>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
