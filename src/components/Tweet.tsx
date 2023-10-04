"use client";

import Link from "next/link";

import dayjs from "dayjs";
import { MessageCircle, Repeat2, Heart, Share } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import useUserInfo from "@/hooks/useUserInfo";
import { getAvatar } from "@/lib/utils";

type TweetProps = {
  id: number;
  authorName: string;
  authorHandle: string;
  content: string;
  likes: number;
  replies: number;
  createdAt: Date;
};

export default function Tweet({
  id,
  authorName,
  authorHandle,
  content,
  likes,
  replies,
  createdAt,
}: TweetProps) {
  const { username, handle } = useUserInfo();

  return (
    <>
      <Link
        className="w-full px-4 pt-3 transition-colors hover:bg-gray-50"
        href={{
          pathname: `/tweet/${id}`,
          query: {
            username,
            handle,
          },
        }}
      >
        <div className="flex gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getAvatar(authorName)}
            alt="avatar"
            className="h-12 w-12 rounded-full"
          />
          <article className="flex grow flex-col">
            <p className="font-bold">
              {authorName}
              <span className="ml-2 font-normal text-gray-400">
                @{authorHandle}
              </span>
              <span className="ml-2 font-normal text-gray-400">
                {dayjs(createdAt).format("h:mm A · D MMM YYYY")}
              </span>
            </p>
            <article className="mt-2 whitespace-pre-wrap">{content}</article>
            <div className="my-2 flex items-center justify-between gap-4 text-gray-400">
              <button className="hover:text-brand hover:bg-brand/10 flex items-center gap-1 rounded-full p-1.5 transition-colors duration-300">
                <MessageCircle size={20} className="-scale-x-100" />
                {replies > 0 && replies}
              </button>
              <button className="hover:text-brand hover:bg-brand/10 rounded-full p-1.5 transition-colors duration-300">
                <Repeat2 size={22} />
              </button>
              <button className="hover:text-brand hover:bg-brand/10 flex items-center gap-1 rounded-full p-1.5 transition-colors duration-300">
                <Heart size={18} />
                {likes > 0 && likes}
              </button>
              <button className="hover:text-brand hover:bg-brand/10 rounded-full p-1.5 transition-colors duration-300">
                <Share size={18} />
              </button>
            </div>
          </article>
        </div>
      </Link>
      <Separator />
    </>
  );
}
