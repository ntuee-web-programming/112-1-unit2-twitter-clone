import Link from "next/link";

import {
  ArrowLeft,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Share,
} from "lucide-react";

import GrowingTextarea from "@/components/GrowingTextarea";
import { Separator } from "@/components/ui/separator";
import { getAvatar, getHandle } from "@/lib/utils";

type TweetPageProps = {
  params: {
    // this came from the file name: [tweet_id].tsx
    tweet_id: string;
  };
  searchParams: {
    // this came from the query string: ?username=madmaxieee
    username?: string;
  };
};

// these two fields are always available in the props object of a page component
export default function TweetPage({
  searchParams: { username },
}: TweetPageProps) {
  return (
    <>
      <div className="flex w-full max-w-xl flex-col pt-2">
        <div className="mb-2 flex items-center gap-8 px-4">
          <Link
            href={{
              pathname: "/",
              query: { username },
            }}
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-xl font-bold">Tweet</h1>
        </div>
        <div className="flex flex-col px-4 pt-3">
          <div className="flex justify-between">
            <div className="flex w-full gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getAvatar(username)}
                alt="user avatar"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <p className="font-bold">{username}</p>
                <p className="font-normal text-gray-500">
                  @{getHandle(username)}
                </p>
              </div>
            </div>

            <button className="hover:text-brand hover:bg-brand/10 h-fit rounded-full p-2.5 text-gray-400 transition-colors duration-300">
              <MoreHorizontal size={16} />
            </button>
          </div>
          <article className="mt-3 text-xl">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </article>
          <time className="my-4 block text-sm text-gray-500">
            12:00 PM · 2 Oct 2023
          </time>
          <Separator />
          <div className="my-2 flex items-center justify-between gap-4 text-gray-400">
            <button className="hover:text-brand hover:bg-brand/10 flex items-center gap-1 rounded-full p-1.5 transition-colors duration-300">
              <MessageCircle size={20} className="-scale-x-100" />
              {5}
            </button>
            <button className="hover:text-brand hover:bg-brand/10 rounded-full p-1.5 transition-colors duration-300">
              <Repeat2 size={22} />
            </button>
            <button className="hover:text-brand hover:bg-brand/10 flex items-center gap-1 rounded-full p-1.5 transition-colors duration-300">
              <Heart size={18} />
              {18}
            </button>
            <button className="hover:text-brand hover:bg-brand/10 rounded-full p-1.5 transition-colors duration-300">
              <Share size={18} />
            </button>
          </div>
          <Separator />
        </div>
        <div className="grid grid-cols-[fit-content(48px)_1fr] gap-4 px-4 pt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getAvatar(username)}
            alt="user avatar"
            width={48}
            height={48}
            className="col-start-1 row-start-2 h-10 w-10 rounded-full"
          />
          <p className="col-start-2 row-start-1 text-gray-500">
            Replying to <span className="text-brand">@madmaxieee</span>
          </p>
          <GrowingTextarea
            wrapperClassName="col-start-2 row-start-2"
            className="bg-transparent text-xl outline-none placeholder:text-gray-500"
            placeholder="Tweet your reply"
          />
        </div>
        <div className="p-4 text-end">
          <button className="bg-brand hover:bg-brand/70 rounded-full px-4 py-2 text-white transition-colors">
            Reply
          </button>
        </div>
        <Separator />
      </div>
    </>
  );
}
