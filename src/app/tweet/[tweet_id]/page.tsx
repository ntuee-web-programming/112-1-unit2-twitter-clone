import Link from "next/link";
import { redirect } from "next/navigation";

import dayjs from "dayjs";
import { eq, sql } from "drizzle-orm";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Share,
} from "lucide-react";

import ReplyInput from "@/components/ReplyInput";
import Tweet from "@/components/Tweet";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { likesTable, tweetsTable, usersTable } from "@/db/schema";
import { getAvatar } from "@/lib/utils";

type TweetPageProps = {
  params: {
    // this came from the file name: [tweet_id].tsx
    tweet_id: string;
  };
  searchParams: {
    // this came from the query string: ?username=madmaxieee
    username?: string;
    handle?: string;
  };
};

// these two fields are always available in the props object of a page component
export default async function TweetPage({
  params: { tweet_id },
  searchParams: { username, handle },
}: TweetPageProps) {
  const tweet_id_num = parseInt(tweet_id);

  const errorRedirect = () => {
    const params = new URLSearchParams();
    username && params.set("username", username);
    handle && params.set("handle", handle);
    redirect(`/?${params.toString()}`);
  };

  if (isNaN(tweet_id_num)) {
    errorRedirect();
  }

  const likesSubquery = db.$with("likes_count").as(
    db
      .select({
        tweetId: likesTable.tweetId,
        likes: sql<number | null>`count(*)`.as("likes"),
      })
      .from(likesTable)
      .groupBy(likesTable.tweetId),
  );

  const [tweet] = await db
    .with(likesSubquery)
    .select({
      id: tweetsTable.id,
      content: tweetsTable.content,
      username: usersTable.displayName,
      handle: usersTable.handle,
      likes: likesSubquery.likes,
      createdAt: tweetsTable.createdAt,
    })
    .from(tweetsTable)
    .where(eq(tweetsTable.id, tweet_id_num))
    .innerJoin(usersTable, eq(tweetsTable.userHandle, usersTable.handle))
    .leftJoin(likesSubquery, eq(tweetsTable.id, likesSubquery.tweetId))
    .limit(1)
    .execute();

  if (!tweet) {
    errorRedirect();
  }

  const replies = await db
    .with(likesSubquery)
    .select({
      id: tweetsTable.id,
      content: tweetsTable.content,
      username: usersTable.displayName,
      handle: usersTable.handle,
      likes: likesSubquery.likes,
      createdAt: tweetsTable.createdAt,
    })
    .from(tweetsTable)
    .where(eq(tweetsTable.replyToTweetId, tweet_id_num))
    .innerJoin(usersTable, eq(tweetsTable.userHandle, usersTable.handle))
    .leftJoin(likesSubquery, eq(tweetsTable.id, likesSubquery.tweetId))
    .execute();

  return (
    <>
      <div className="flex w-full max-w-xl flex-col pt-2">
        <div className="mb-2 flex items-center gap-8 px-4">
          <Link href={{ pathname: "/", query: { username, handle } }}>
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-xl font-bold">Tweet</h1>
        </div>
        <div className="flex flex-col px-4 pt-3">
          <div className="flex justify-between">
            <div className="flex w-full gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getAvatar(tweet.username)}
                alt="user avatar"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <p className="font-bold">{tweet.username ?? "..."}</p>
                <p className="font-normal text-gray-500">
                  @{tweet.handle ?? "..."}
                </p>
              </div>
            </div>
            <button className="hover:text-brand hover:bg-brand/10 h-fit rounded-full p-2.5 text-gray-400 transition-colors duration-300">
              <MoreHorizontal size={16} />
            </button>
          </div>
          <article className="mt-3 text-xl">{tweet.content}</article>
          <time className="my-4 block text-sm text-gray-500">
            {dayjs(tweet.createdAt).format("h:mm A · D MMM YYYY")}
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
              {tweet.likes}
            </button>
            <button className="hover:text-brand hover:bg-brand/10 rounded-full p-1.5 transition-colors duration-300">
              <Share size={18} />
            </button>
          </div>
          <Separator />
        </div>
        <ReplyInput replyToTweetId={tweet.id} />
        <Separator />
        {replies.map((reply) => (
          <Tweet
            key={reply.id}
            id={reply.id}
            authorName={reply.username}
            authorHandle={reply.handle}
            content={reply.content}
            likes={reply.likes ?? 0}
            createdAt={reply.createdAt!}
            replies={0}
          />
        ))}
      </div>
    </>
  );
}
