import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  image?: string | null;
  username: string;
  email: string;
  password?: string;
}
