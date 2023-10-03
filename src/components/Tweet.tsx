"use client";

import Link from "next/link";

import { MessageCircle, Repeat2, Heart, Share } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { getAvatar, getHandle } from "@/lib/utils";

type TweetProps = {
  id: string;
  username: string;
  content: string;
  likes: number;
  replies: number;
};

export default function Tweet({
  username,
  content,
  likes,
  replies,
}: TweetProps) {
  return (
    <>
      <Link
        className="w-full px-4 pt-3 transition-colors hover:bg-gray-50"
        href={{
          pathname: "/tweet/id",
          query: { username },
        }}
      >
        <div className="flex gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getAvatar(username)}
            alt="avatar"
            className="h-12 w-12 rounded-full"
          />
          <article className="flex grow flex-col">
            <p className="font-bold">
              {username}
              <span className="ml-2 font-normal text-gray-400">
                @{getHandle(username)}
              </span>
              <span className="font-normal text-gray-400"> · </span>
              <span className="font-normal text-gray-400">1h</span>
            </p>
            <p>{content}</p>
            <div className="my-2 flex items-center justify-between gap-4 text-gray-400">
              <button
                className="hover:text-brand hover:bg-brand/10 flex items-center gap-1 rounded-full p-1.5 transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  alert("reply");
                }}
              >
                <MessageCircle size={20} className="-scale-x-100" />
                {replies}
              </button>
              <button className="hover:text-brand hover:bg-brand/10 rounded-full p-1.5 transition-colors duration-300">
                <Repeat2 size={22} />
              </button>
              <button
                className="hover:text-brand hover:bg-brand/10 flex items-center gap-1 rounded-full p-1.5 transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  alert("like");
                }}
              >
                <Heart size={18} />
                {likes}
              </button>
              <button className="hover:text-brand hover:bg-brand/10 rounded-full p-1.5 transition-colors duration-300">
                <Share size={18} />
              </button>
            </div>
            <Separator />
          </article>
        </div>
      </Link>
      <Separator />
    </>
  );
}
