import { Community } from "@/atoms/community";
import { firestore } from "@/firebase/app";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

type PostsProps = {
  communtiy: Community;
};

const Posts: React.FC<PostsProps> = ({ communtiy }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    async function getAllPosts() {
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
        console.log(posts);
      } catch (err: any) {
        setError(err.message);
        console.log(err);
      }
    }

    getAllPosts();
  }, []);

  return <div>loda lele</div>;
};

export default Posts;
