import { NextResponse, type NextRequest } from "next/server";

import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { likesTable } from "@/db/schema";

const likeTweetRequestSchema = z.object({
  tweetId: z.number().positive(),
  userHandle: z.string().min(1).max(50),
});

type LikeTweetRequest = z.infer<typeof likeTweetRequestSchema>;

export async function GET(request: NextRequest) {
  const data = await request.json();

  try {
    likeTweetRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { tweetId, userHandle } = data as LikeTweetRequest;

  try {
    const [exist] = await db
      .select({ dummy: sql`1` })
      .from(likesTable)
      .where(
        and(
          eq(likesTable.tweetId, tweetId),
          eq(likesTable.userHandle, userHandle),
        ),
      )
      .execute();
    return NextResponse.json({ liked: Boolean(exist) }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    likeTweetRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { tweetId, userHandle } = data as LikeTweetRequest;

  try {
    await db
      .insert(likesTable)
      .values({
        tweetId,
        userHandle,
      })
      .onConflictDoNothing()
      .execute();
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}
