import CreateNewPost from "@/components/Post/CreatePost/CreateNewPost";
import { auth } from "@/firebase/app";
import PageLayout from "@/layouts/PageLayout";
import { Fragment } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Submit = () => {
  const [user] = useAuthState(auth);
  return (
    <PageLayout>
      <Fragment>
        <div className="p-4 border-b-[1px] border-gray-400">
          {user && <CreateNewPost user={user} />}
        </div>
      </Fragment>
      <Fragment>
        <div>2</div>
      </Fragment>
    </PageLayout>
  );
};

export default Submit;
