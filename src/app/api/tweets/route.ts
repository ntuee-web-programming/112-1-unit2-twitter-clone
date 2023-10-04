import { NextResponse } from "next/server";

import { desc } from "drizzle-orm";

import { db } from "@/db";
import { tweetsTable } from "@/db/schema";

export async function GET() {
  const tweets = await db
    .select({
      id: tweetsTable.id,
      content: tweetsTable.content,
      createdAt: tweetsTable.createdAt,
    })
    .from(tweetsTable)
    .orderBy(desc(tweetsTable.createdAt));

  return NextResponse.json({ tweets }, { status: 200 });
}
