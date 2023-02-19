import React, { useRef } from "react";

import Image from "next/image";

type ImageUploadProps = {
  selectedFile?: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | undefined>>;
  onSelectImage: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  setSelectedImage,
  setSelectedTab,
  onSelectImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center justify-center h-72 border-dashed border-2 rounded-lg mt-2">
      {selectedFile ? (
        <div className="space-y-4">
          <Image
            src={selectedFile}
            height={400}
            width={400}
            alt="Photo uploaded by user"
          />
          <div className="flex items-center justify-center space-x-4">
            <button
              className="button"
              onClick={() => {
                setSelectedTab("Post");
              }}
            >
              Back To Post
            </button>
            <button
              className="button"
              onClick={() => {
                setSelectedImage("");
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            className="button"
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            Upload Image
          </button>
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={onSelectImage}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
