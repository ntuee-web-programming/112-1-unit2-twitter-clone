import { useState } from "react";

import { useRouter } from "next/navigation";

export default function useLike() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const likeTweet = async ({
    tweetId,
    userHandle,
  }: {
    tweetId: number;
    userHandle: string;
  }) => {
    if (loading) return;

    setLoading(true);
    try {
      await fetch("/api/likes", {
        method: "POST",
        body: JSON.stringify({
          tweetId,
          userHandle,
        }),
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error liking tweet");
    } finally {
      setLoading(false);
    }
  };

  const unlikeTweet = async ({
    tweetId,
    userHandle,
  }: {
    tweetId: number;
    userHandle: string;
  }) => {
    if (loading) return;

    setLoading(true);
    try {
      await fetch("/api/likes", {
        method: "DELETE",
        body: JSON.stringify({
          tweetId,
          userHandle,
        }),
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error unliking tweet");
    } finally {
      setLoading(false);
    }
  };

  return {
    likeTweet,
    unlikeTweet,
    loading,
  };
}
