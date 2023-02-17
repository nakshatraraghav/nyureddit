import { storage } from "@/firebase/app";
import { ref, uploadString } from "firebase/storage";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

const Index = () => {
  const [file, setFile] = useState<string>();
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      {file ? (
        <div>
          <Image src={file} height={400} width={400} alt="image" />
          <button
            className="p-2 mr-4 bg-white rounded-lg text-black"
            onClick={() => {
              setFile("");
            }}
          >
            remove
          </button>
          <button
            className="p-2 bg-white rounded-lg text-black"
            onClick={async () => {
              const imageRef = ref(storage, "images/imgae.jpg");
              try {
                await uploadString(imageRef, file, "data_url");
                alert("file uploaded");
              } catch (error: any) {
                alert(error.message);
              }
            }}
          >
            upload
          </button>
        </div>
      ) : (
        <div>
          <input
            type="file"
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              const reader = new FileReader();
              if (evt.target.files?.[0]) {
                reader.readAsDataURL(evt.target.files[0]);
              }
              reader.onload = (readerEvent) => {
                if (readerEvent.target?.result) {
                  setFile(readerEvent.target.result as string);
                }
              };
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
