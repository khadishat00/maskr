import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  image?: string | null;
  username: string;
  email: string;
  password?: string;
}

//fotos waar de gebruiker uit kan kiezen
export const avatars = [
  "/assets/avatar1.png",
  "/assets/avatar2.png",
  //"/assets/avatar3.png",
  //"/assets/avatar4.png",
];
