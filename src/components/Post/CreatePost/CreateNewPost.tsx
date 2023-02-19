import { firestore, storage } from "@/firebase/app";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";
import { useState } from "react";
import formTabs from "./FormTabsData";
import ImageUpload from "./ImageUpload";
import Failure from "./PostStatus/Failure";
import Success from "./PostStatus/Success";
import TabItem from "./TabItem";
import TextInputs from "./TextInputs";

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
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
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
      setLoading(false);
      setSuccess(true);
      setTextInputs({
        body: "",
        title: "",
      });
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
    }
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
      <div
        className="flex items-center justify-center mt-4"
        onClick={() => {
          router.back();
          setSuccess(false);
          setError("");
        }}
      >
        <button className="button">Back to Community Page</button>
      </div>
      {error && <Failure removeAlert={setError} />}
      {success && <Success removeAlert={setSuccess} />}
    </div>
  );
};

export default CreateNewPost;
