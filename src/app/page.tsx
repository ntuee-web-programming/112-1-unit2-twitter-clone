import { eq, desc, isNull, sql } from "drizzle-orm";

import NameDialog from "@/components/NameDialog";
import Tweet from "@/components/Tweet";
import TweetInput from "@/components/TweetInput";
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
    .innerJoin(usersTable, eq(tweetsTable.userHandle, usersTable.handle))
    .leftJoin(likesSubquery, eq(tweetsTable.id, likesSubquery.tweetId))
    .execute();

  return (
    <>
      <div className="flex h-screen w-full max-w-2xl flex-col overflow-scroll pt-2">
        <h1 className="mb-2 bg-white px-4 text-xl font-bold">Home</h1>
        <div className="w-full px-4 pt-3">
          <TweetInput />
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
