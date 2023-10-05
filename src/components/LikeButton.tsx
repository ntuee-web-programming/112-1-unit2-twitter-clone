"use client";

import { useState } from "react";
import type { EventHandler, MouseEvent } from "react";

import { Heart } from "lucide-react";

import useLike from "@/hooks/useLike";
import { cn } from "@/lib/utils";

type LikeButtonProps = {
  initialLikes: number;
  initialLiked?: boolean;
  tweetId: number;
  handle?: string;
};

export default function LikeButton({
  initialLikes,
  initialLiked,
  tweetId,
  handle,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const { likeTweet, unlikeTweet, loading } = useLike();

  const handleClick: EventHandler<MouseEvent> = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!handle) return;
    if (liked) {
      await unlikeTweet({
        tweetId,
        userHandle: handle,
      });
      setLikesCount((prev) => prev - 1);
      setLiked(false);
    } else {
      await likeTweet({
        tweetId,
        userHandle: handle,
      });
      setLikesCount((prev) => prev + 1);
      setLiked(true);
    }
  };

  return (
    <button
      className={cn(
        "hover:text-brand hover:bg-brand/10 flex w-12 items-center gap-1 rounded-full p-1.5 transition-colors duration-300",
        liked && "text-brand bg-brand/10",
        loading && "animate-pulse cursor-not-allowed",
      )}
      onClick={handleClick}
    >
      <Heart size={18} />
      {likesCount > 0 && likesCount}
    </button>
  );
}
