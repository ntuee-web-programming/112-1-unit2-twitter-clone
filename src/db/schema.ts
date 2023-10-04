import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    handle: varchar("handle", { length: 50 }).notNull().unique(),
    displayName: varchar("display_name", { length: 50 }).notNull(),
  },
  (table) => ({
    handleIndex: index("handle_index").on(table.handle),
  }),
);

export const tweetsTable = pgTable(
  "tweets",
  {
    id: serial("id").primaryKey(),
    content: varchar("content", { length: 280 }).notNull(),
    userId: integer("user_id")
      .references(() => usersTable.id)
      .notNull(),
    replyToTweetId: integer("reply_to_tweet_id"),
    createdAt: timestamp("created_at").default(sql`now()`),
  },
  (table) => ({
    userIdIndex: index("user_id_index").on(table.userId),
    createdAtIndex: index("created_at_index").on(table.createdAt),
    replyToAndTimeIndex: index("reply_to_time_index").on(
      table.replyToTweetId,
      table.createdAt,
    ),
  }),
);

export const likesTable = pgTable(
  "likes",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .references(() => usersTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    tweetId: integer("tweet_id")
      .references(() => tweetsTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => ({
    tweetIdIndex: index("tweet_id_index").on(table.tweetId),
    userIdIndex: index("user_id_index").on(table.userId),
  }),
);
