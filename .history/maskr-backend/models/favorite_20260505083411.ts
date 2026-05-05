import { Collection, ObjectId } from "mongodb";
import { db } from "../database";

let favoritesCollection: Collection;

export async function initializeFavorites() {
  favoritesCollection = db.collection("favorites");
}

export async function addFavorite(userId: string, song: any) {
  return await favoritesCollection.insertOne({
    userId: new ObjectId(userId),
    song,
    addedAt: new Date(),
  });
}

export async function removeFavorite(userId: string, songId: string) {
  return await favoritesCollection.deleteOne({
    userId: new ObjectId(userId),
    "song.id": songId,
  });
}

export async function getFavorites(userId: string) {
  return await favoritesCollection.find({ userId: new ObjectId(userId) }).toArray();
}