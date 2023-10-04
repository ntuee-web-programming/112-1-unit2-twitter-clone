import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";

export default function useTweet() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postTweet = useCallback(
    async ({
      handle,
      content,
      replyToTweetId,
    }: {
      handle: string;
      content: string;
      replyToTweetId?: number;
    }) => {
      setLoading(true);
      try {
        await fetch("/api/tweets", {
          method: "POST",
          body: JSON.stringify({
            handle,
            content,
            replyToTweetId,
          }),
        });
        router.refresh();
      } catch (error) {
        console.error(error);
        alert("Error posting tweet");
      } finally {
        setLoading(false);
      }
    },
    [router],
  );

  return {
    postTweet,
    loading,
  };
}
