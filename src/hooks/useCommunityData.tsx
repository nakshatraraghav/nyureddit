import { authModalState } from "@/atoms/authModal";
import {
  Community,
  CommunitySnippets,
  communityState,
} from "@/atoms/community";
import { useAtom, useSetAtom } from "jotai";

import { auth, firestore } from "@/firebase/app";
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function useCommunityData() {
  const [communityStateValue, setCommunityStateValue] = useAtom(communityState);
  const setAuthModalState = useSetAtom(authModalState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [user] = useAuthState(auth);

  // we also need to populate the communisyStateValue whenever the user changes so
  // we do not display stale or wrong data

  async function getCommunitySnippets() {
    setLoading(true);
    try {
      const communitySnippetsColRef = collection(
        firestore,
        `users/${user?.uid}/communitySnippets`
      );
      const snapshot = await getDocs(communitySnippetsColRef);
      const snippets = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      console.log(snippets);
      setCommunityStateValue((prev) => ({
        ...prev,
        communitySnippets: snippets as CommunitySnippets[],
      }));
      console.log(communityState);
    } catch (err: any) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (!user) return;
    getCommunitySnippets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function joinOrLeaveCommunity(communityData: Community, isJoined: boolean) {
    // check if the user is logged in if not then open the login modal
    if (!user) {
      setAuthModalState({
        open: true,
        view: "login",
      });
    }
    // check if the user is joined in this community
    // if joined then this function should call the leave() function
    // else call the join function
    if (isJoined) {
      leave(communityData);
    } else {
      join(communityData);
    }
  }

  async function join(communityData: Community) {
    // batch write
    // add to community snippets of the logged in user
    // update the numberOfMembers of the community
    setLoading(true);
    const batch = writeBatch(firestore);
    const newCommunity: CommunitySnippets = {
      communityId: communityData.id,
      imageURL: communityData?.imageUrl || "",
      isModerator: false,
    };
    const newCommunityDocRef = doc(
      firestore,
      `users/${user?.uid}/communitySnippets/${communityData.id}`
    );
    const communityDocRef = doc(firestore, `/communities/${communityData.id}`);

    batch.set(newCommunityDocRef, newCommunity);
    batch.update(communityDocRef, {
      numberOfMembers: increment(1),
    });
    // writing out these batched like this does nothiing
    // we also have to run the commit function on the batch obejct
    await batch.commit();

    // now after that our db has been updated we can update the state
    setCommunityStateValue((prev) => ({
      ...prev,
      communitySnippets: [...prev.communitySnippets, newCommunity],
    }));
    setLoading(false);
    try {
    } catch (err: any) {
      setError(err.message);
    }
  }

  function leave(communityData: Community) {
    // same batch write
    // but here we would be deleting the communitySnippet and then decrementing the numberOfMembers count
    setLoading(true);
    try {
      const batch = writeBatch(firestore);
      const toDeleteCommunityDocRef = doc(
        firestore,
        `users/${user?.uid}/communitySnippets/${communityData.id}`
      );
      const communityDocRef = doc(
        firestore,
        `/communities/${communityData.id}`
      );
      batch.delete(toDeleteCommunityDocRef);
      batch.update(communityDocRef, {
        numberOfMembers: increment(-1),
      });

      batch.commit();

      // now update the state with the deleted community
      setCommunityStateValue((prev) => ({
        ...prev,
        communitySnippets: prev.communitySnippets.filter(
          (item) => item.communityId !== communityData.id
        ),
      }));
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
    }
  }
  console.log(communityStateValue);
  return { communityStateValue, joinOrLeaveCommunity, loading, error };
}
