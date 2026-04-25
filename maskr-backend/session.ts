import { MONGODB_URI } from "./database";
import session, { MemoryStore } from "express-session";
import { User } from "./types";
import mongoDbSession from "connect-mongodb-session";
const MongoDBStore = mongoDbSession(session);

const mongoStore = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
  databaseName: "maskr",
});

declare module "express-session" {
  export interface SessionData {
    user?: User;
  }
}

export default session({
  secret:
    process.env.SESSION_SECRET ??
    "60046333cbc44a5df7da47ed9ec9af45169b8949b1b03c6f2f87a0469ae014e4",
  store: mongoStore,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
});
