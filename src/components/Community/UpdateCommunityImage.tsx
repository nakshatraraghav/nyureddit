import useSelectImage from "@/hooks/useSelectImage";
import Image from "next/image";
import React, { Fragment, useRef, useState } from "react";

import { Community } from "@/atoms/community";
import { firestore, storage } from "@/firebase/app";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

import Spinner from "../Spinner/Spinner";
import { doc, updateDoc } from "firebase/firestore";

import { useAtom, useSetAtom } from "jotai";
import { communityState } from "@/atoms/community";

type UpdateCommunityImageProps = {
  community: Community;
};

const UpdateCommunityImage: React.FC<UpdateCommunityImageProps> = ({
  community,
}) => {
  const { selectedImage, setSelectedImage, onSelectImage } = useSelectImage();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const setCommunityState = useSetAtom(communityState);
  async function handleCommunityImageUpdate() {
    setLoading(true);
    try {
      const imageRef = ref(storage, `${community.id}/communityImage/image`);
      const communityDocRef = doc(firestore, `communities/${community.id}`);

      await uploadString(imageRef, selectedImage as string, "data_url");
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(communityDocRef, {
        imageUrl: downloadURL,
      });

      setCommunityState((prev) => ({
        ...prev,
        imageUrl: downloadURL,
      }));

      setSelectedImage("");
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  }

  return (
    <Fragment>
      <div className="my-2 text-sm font-bold">Update Community Image</div>
      <div className="flex items-center space-x-6">
        {selectedImage ? (
          <button className="button" onClick={handleCommunityImageUpdate}>
            {loading ? <Spinner /> : "Update"}
          </button>
        ) : (
          <button
            className="button"
            onClick={() => {
              imageInputRef.current?.click();
            }}
          >
            Select Image
          </button>
        )}
        {selectedImage && (
          <div className="w-16 h-16 rounded-full">
            <Image
              src={selectedImage}
              height={50}
              width={50}
              className="w-16 h-16 rounded-full"
              alt="Moderator Selected Community Image"
            />
          </div>
        )}
        <input
          type="file"
          hidden
          ref={imageInputRef}
          onChange={onSelectImage}
        />
        {error && <div>{error}</div>}
      </div>
    </Fragment>
  );
};

export default UpdateCommunityImage;
