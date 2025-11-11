import {
    boolean,
    integer,
    pgTable,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text(),
    email: text().unique(),
    password: text(),
    created_at: timestamp().defaultNow(),
});

export const todos = pgTable("todos", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    user_id: integer().references(() => users.id),
    title: text(),
    is_done: boolean().default(false),
    created_at: timestamp().defaultNow(),
});
