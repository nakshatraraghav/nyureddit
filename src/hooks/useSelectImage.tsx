import React, { useState } from "react";

function useSelectImage() {
  const [selectedImage, setSelectedImage] = useState<string>();

  function onSelectImage(evt: React.ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();

    if (evt.target.files?.[0]) {
      reader.readAsDataURL(evt.target.files[0]);
    }

    reader.onload = (readerEvt) => {
      if (readerEvt.target?.result) {
        setSelectedImage(readerEvt.target.result as string);
      }
    };
  }

  return { selectedImage, setSelectedImage, onSelectImage };
}

export default useSelectImage;
