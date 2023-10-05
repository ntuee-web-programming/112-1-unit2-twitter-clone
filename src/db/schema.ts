import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

// schemas define the structure of the tables in the database
// watch this playlist to learn more about database schemas:
// although it uses MySQL, the concepts are the same
// https://planetscale.com/learn/courses/mysql-for-developers/schema/introduction-to-schema

export const usersTable = pgTable(
  "users",
  {
    // It is recommended to use something that means nothing outside of the database
    // as the primary key, so that you don't have to change it if the data it represents
    // changes. For example, if you use a user's email as the primary key, and then
    // the user changes their email, you have to update all the foreign keys that
    // reference that email. If you use a serial primary key, you don't have to worry
    // about that.
    id: serial("id").primaryKey(),
    // It is a good idea to set a maximum length for varchars, so that you don't
    // waste space in the database. It is also a good idea to move as much constraints
    // to the database as possible, so that you don't have to worry about them in
    // your application code.
    handle: varchar("handle", { length: 50 }).notNull().unique(),
    displayName: varchar("display_name", { length: 50 }).notNull(),
  },
  (table) => ({
    // indexes are used to speed up queries. Good indexes can make your queries
    // run orders of magnitude faster. learn more about indexes here:
    // https://planetscale.com/learn/courses/mysql-for-developers/indexes/introduction-to-indexes
    handleIndex: index("handle_index").on(table.handle),
  }),
);

export const tweetsTable = pgTable(
  "tweets",
  {
    id: serial("id").primaryKey(),
    content: varchar("content", { length: 280 }).notNull(),
    userHandle: varchar("user_handle", { length: 50 })
      .notNull()
      // this is a foreign key constraint. It ensures that the user_handle
      // column in this table references a valid user_handle in the users table.
      // We can also specify what happens when the referenced row is deleted
      // or updated. In this case, we want to delete the tweet if the user
      // is deleted, so we use onDelete: "cascade". It is similar for onUpdate.
      .references(() => usersTable.handle, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    replyToTweetId: integer("reply_to_tweet_id"),
    createdAt: timestamp("created_at").default(sql`now()`),
  },
  (table) => ({
    userHandleIndex: index("user_handle_index").on(table.userHandle),
    createdAtIndex: index("created_at_index").on(table.createdAt),
    // we can even set composite indexes, which are indexes on multiple columns
    // learn more about composite indexes here:
    // https://planetscale.com/learn/courses/mysql-for-developers/indexes/composite-indexes
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
    userHandle: varchar("user_handle", { length: 50 })
      .notNull()
      .references(() => usersTable.handle, { onDelete: "cascade" }),
    tweetId: integer("tweet_id")
      .notNull()
      .references(() => tweetsTable.id, { onDelete: "cascade" }),
  },
  (table) => ({
    tweetIdIndex: index("tweet_id_index").on(table.tweetId),
    userHandleIndex: index("user_handle_index").on(table.userHandle),
    // unique constraints ensure that there are no duplicate combinations of
    // values in the table. In this case, we want to ensure that a user can't
    // like the same tweet twice.
    uniqCombination: unique().on(table.userHandle, table.tweetId),
  }),
);
