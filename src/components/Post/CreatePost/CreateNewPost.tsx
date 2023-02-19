import { ChangeEvent, useState } from "react";
import formTabs from "./FormTabsData";
import TabItem from "./TabItem";
import TextInputs from "./TextInputs";

const CreateNewPost = () => {
  const [selectedTab, setSelectedTab] = useState<string>(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  function onInputsChange(
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setTextInputs((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  }

  function handlePostCreation() {}

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
      </div>
    </div>
  );
};

export default CreateNewPost;
