"use client";

import { useRef } from "react";

import { ChevronDown } from "lucide-react";

import GrowingTextarea from "@/components/GrowingTextarea";
import UserAvatar from "@/components/UserAvatar";
import { Separator } from "@/components/ui/separator";
import useTweet from "@/hooks/useTweet";
import useUserInfo from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";

export default function TweetInput() {
  const { handle } = useUserInfo();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { postTweet, loading } = useTweet();

  const handleTweet = async () => {
    const content = textareaRef.current?.value;
    if (!content) return;
    if (!handle) return;

    try {
      await postTweet({
        handle,
        content,
      });
      textareaRef.current.value = "";
      textareaRef.current.dispatchEvent(
        new Event("input", { bubbles: true, composed: true }),
      );
    } catch (e) {
      console.error(e);
    }

    textareaRef.current.value = "";
  };

  return (
    <div className="flex gap-4">
      <UserAvatar className="h-12 w-12" />
      <div className="flex w-full flex-col px-2">
        <button className="text-brand flex w-fit items-center rounded-full border-[1px] border-gray-300 px-2 text-sm font-bold">
          Everyone
          <ChevronDown size={16} className="text-gray-300" />
        </button>
        <div className="mb-2 mt-6">
          <GrowingTextarea
            ref={textareaRef}
            className="bg-transparent outline-none placeholder:text-gray-500"
            placeholder="What's happening?"
          />
        </div>
        <Separator />
        <div className="flex justify-end">
          <button
            className={cn(
              "bg-brand hover:bg-brand/70 my-2 rounded-full px-4 py-2 text-white transition-colors",
              "disabled:bg-brand/40 disabled:hover:bg-brand/40 disabled:cursor-not-allowed",
            )}
            onClick={handleTweet}
            disabled={loading}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
