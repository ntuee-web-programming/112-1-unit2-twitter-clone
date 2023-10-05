"use client";

import { useRef } from "react";

import GrowingTextarea from "@/components/GrowingTextarea";
import UserAvatar from "@/components/UserAvatar";
import useTweet from "@/hooks/useTweet";
import useUserInfo from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";

type ReplyInputProps = {
  replyToTweetId: number;
  replyToHandle: string;
};

export default function ReplyInput({
  replyToTweetId,
  replyToHandle,
}: ReplyInputProps) {
  const { handle } = useUserInfo();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { postTweet, loading } = useTweet();

  const handleReply = async () => {
    const content = textareaRef.current?.value;
    if (!content) return;
    if (!handle) return;

    try {
      await postTweet({
        handle,
        content,
        replyToTweetId,
      });
      textareaRef.current.value = "";
      textareaRef.current.dispatchEvent(
        new Event("input", { bubbles: true, composed: true }),
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-[fit-content(48px)_1fr] gap-4 px-4 pt-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <UserAvatar className="col-start-1 row-start-2 h-12 w-12" />
        <p className="col-start-2 row-start-1 text-gray-500">
          Replying to <span className="text-brand">@{replyToHandle}</span>
        </p>
        <GrowingTextarea
          ref={textareaRef}
          wrapperClassName="col-start-2 row-start-2"
          className="bg-transparent text-xl outline-none placeholder:text-gray-500"
          placeholder="Tweet your reply"
        />
      </div>
      <div className="p-4 text-end">
        <button
          className={cn(
            "bg-brand hover:bg-brand/70 my-2 rounded-full px-4 py-2 text-white transition-colors",
            "disabled:bg-brand/40 disabled:hover:bg-brand/40 disabled:cursor-not-allowed",
          )}
          onClick={handleReply}
          disabled={loading}
        >
          Reply
        </button>
      </div>
    </div>
  );
}
