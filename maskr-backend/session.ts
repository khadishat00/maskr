import session from "express-session";
import MongoStore from "connect-mongo";
import { MONGODB_URI } from "./database";
import { User } from "./types";

declare module "express-session" {
  export interface SessionData {
    user?: User;
  }
}

export default session({
  secret: process.env.SESSION_SECRET ?? "gdgg",
  store: MongoStore.create({
    mongoUrl: MONGODB_URI,
    dbName: "maskr",
    collectionName: "sessions",
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
});
