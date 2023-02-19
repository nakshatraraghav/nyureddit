import { firestore, storage } from "@/firebase/app";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { useRouter } from "next/router";
import { useState } from "react";
import formTabs from "./FormTabsData";
import ImageUpload from "./ImageUpload";
import TabItem from "./TabItem";
import TextInputs from "./TextInputs";

import { v4 } from "uuid";

type CreateNewPostProps = {
  user: User;
};

const CreateNewPost: React.FC<CreateNewPostProps> = ({ user }) => {
  const [selectedTab, setSelectedTab] = useState<string>(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [selectedImage, setSelectedImage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  function onInputsChange(
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setTextInputs((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  }

  function onSelectImage(evt: React.ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    if (evt.target.files?.[0]) {
      reader.readAsDataURL(evt.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedImage(readerEvent.target.result as string);
      }
    };
  }

  async function handlePostCreation() {
    setLoading(true);
    const communityId = router.query.id as string;
    const newPost = {
      communityId: communityId,
      creatorId: user.uid,
      creatorDisplayName: (user.email?.split("@")[0] as string) || "",
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };

    try {
      const collectionRef = collection(firestore, "posts");
      const createdPost = await addDoc(collectionRef, newPost);

      if (selectedImage) {
        const imageRef = ref(
          storage,
          `${communityId}/${createdPost.id}/images/${Math.floor(
            Math.random() * 1000000
          )}`
        );
        await uploadString(imageRef, selectedImage, "data_url");
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(createdPost, {
          downloadURL: downloadURL,
        });
      }
    } catch (error: any) {
      console.log(error.message);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col bg-white rounded-md mt-2 ">
      <div className="flex w-full border-2">
        {formTabs.map((item) => {
          return (
            <TabItem
              key={item.title}
              item={item}
              selected={selectedTab === item.title}
              setSelectedTab={setSelectedTab}
            />
          );
        })}
      </div>
      <div>
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            handlePostCreation={handlePostCreation}
            loading={loading}
            onInputsChange={onInputsChange}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedImage}
            setSelectedImage={setSelectedImage}
            setSelectedTab={setSelectedTab}
            onSelectImage={onSelectImage}
          />
        )}
      </div>
    </div>
  );
};

export default CreateNewPost;
