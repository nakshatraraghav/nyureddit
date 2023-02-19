import { ChangeEvent } from "react";

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onInputsChange: (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handlePostCreation: () => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  onInputsChange,
  handlePostCreation,
  loading,
}) => {
  return (
    <div className="flex flex-col w-full p-4 space-y-4 border-b-2 border-x-2">
      <input
        type="text"
        name="title"
        value={textInputs.title}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholder="Post Title"
        onChange={onInputsChange}
      />
      <textarea
        className="mt-1 h-[100px] block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        name="body"
        placeholder="Text (Optional)"
        onChange={onInputsChange}
        value={textInputs.body}
      />
      <div className="flex justify-end items-center">
        <button
          className="button disabled:opacity-40"
          onClick={handlePostCreation}
          disabled={!textInputs.title || loading}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default TextInputs;
