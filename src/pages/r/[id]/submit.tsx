import CreateNewPost from "@/components/Post/CreatePost/CreateNewPost";
import PageLayout from "@/layouts/PageLayout";
import { Fragment } from "react";

const submit = () => {
  return (
    <PageLayout>
      <Fragment>
        <div className="p-4 border-b-[1px] border-gray-400">
          <CreateNewPost />
        </div>
      </Fragment>
      <Fragment>
        <div>2</div>
      </Fragment>
    </PageLayout>
  );
};

export default submit;
