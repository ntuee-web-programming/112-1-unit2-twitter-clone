import { eq, desc, isNull, sql } from "drizzle-orm";
import { ChevronDown } from "lucide-react";

import GrowingTextarea from "@/components/GrowingTextarea";
import NameDialog from "@/components/NameDialog";
import Tweet from "@/components/Tweet";
import UserAvatar from "@/components/UserAvatar";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { likesTable, tweetsTable, usersTable } from "@/db/schema";

type HomePageProps = {
  searchParams: {
    username?: string;
    handle?: string;
  };
};

export default async function Home({
  searchParams: { username, handle },
}: HomePageProps) {
  if (username && handle) {
    await db
      .insert(usersTable)
      .values({
        displayName: username,
        handle,
      })
      .onConflictDoUpdate({
        target: usersTable.handle,
        set: {
          displayName: username,
        },
      })
      .execute();
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

  const tweets = await db
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
    .where(isNull(tweetsTable.replyToTweetId))
    .orderBy(desc(tweetsTable.createdAt))
    .innerJoin(usersTable, eq(tweetsTable.userId, usersTable.id))
    .leftJoin(likesSubquery, eq(tweetsTable.id, likesSubquery.tweetId))
    .execute();

  console.log(tweets);

  return (
    <>
      <div className="flex w-full max-w-xl flex-col pt-2">
        <h1 className="mb-2 px-4 text-xl font-bold">Home</h1>
        <div className="w-full px-4 pt-3">
          <div className="flex gap-4">
            <UserAvatar className="h-12 w-12" />
            <div className="flex w-full flex-col px-2">
              <button className="text-brand flex w-fit items-center rounded-full border-[1px] border-gray-300 px-2 text-sm font-bold">
                Everyone
                <ChevronDown size={16} className="text-gray-300" />
              </button>
              <div className="mb-2 mt-6">
                <GrowingTextarea
                  className="bg-transparent outline-none placeholder:text-gray-500"
                  placeholder="What's happening?"
                />
              </div>
              <Separator />
              <div className="flex justify-end">
                <button className="bg-brand hover:bg-brand/70 my-2 rounded-full px-4 py-2 text-white transition-colors">
                  Tweet
                </button>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            id={tweet.id}
            authorName={tweet.username}
            authorHandle={tweet.handle}
            content={tweet.content}
            likes={tweet.likes ?? 0}
            createdAt={tweet.createdAt!}
            replies={0}
          />
        ))}
      </div>
      <NameDialog />
    </>
  );
}
