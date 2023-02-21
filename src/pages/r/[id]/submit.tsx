import { communityState } from "@/atoms/community";
import About from "@/components/Community/About";
import CreateNewPost from "@/components/Post/CreatePost/CreateNewPost";
import { auth } from "@/firebase/app";
import PageLayout from "@/layouts/PageLayout";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Submit: React.FC = () => {
  const [user] = useAuthState(auth);
  const communityData = useAtomValue(communityState);

  return (
    <PageLayout>
      <Fragment>
        <div className="p-4 border-b-[1px] border-gray-400">
          {user && <CreateNewPost user={user} />}
        </div>
      </Fragment>
      <Fragment>
        {communityData.currentCommunity ? (
          <About community={communityData.currentCommunity} />
        ) : (
          <div className="p-4">
            Please navigate once to the Current Community&apos;s Page
          </div>
        )}
      </Fragment>
    </PageLayout>
  );
};

export default Submit;
