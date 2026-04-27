import dotenv from "dotenv";
dotenv.config();
import { MongoClient, ObjectId } from "mongodb";
import { User } from "./types";
import bcrypt from "bcrypt";

const uri =
  "mongodb+srv://pmourdalova_db_user:Qm9zifKqhSGhvyU0@cluster0.9asgdtt.mongodb.net/?appName=Cluster0";

const saltRounds: number = 10;

export const MONGODB_URI = process.env.MONGODB_URI ?? uri;

export const client = new MongoClient(MONGODB_URI);

export const userCollection = client.db("maskr").collection<User>("users");

export async function createUser(
  username: string,
  email: string,
  password: string,
  image: string,
) {
  if (email === "" || password === "") {
    throw new Error("Email and password required");
  }
  try {
    await userCollection.insertOne({
      username: username,
      image: image,
      email: email,
      password: await bcrypt.hash(password, saltRounds),
    });
  } catch (e) {
    console.log(e);
  }
}

export async function editUser(
  id: ObjectId | undefined,
  email: string,
  image: string,
  username: string,
  oudeWachtwoord?: string | null,
  nieuweWachtwoord?: string | null,
) {
  if (!id || !email || !username) {
    throw new Error("Id, email en gebruikersnaam zijn verplicht");
  }

  const result = await userCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { email, image, username } },
  );

  if (result.matchedCount === 0) {
    throw new Error(`Gebruiker met id "${id}" niet gevonden`);
  }

  console.log(oudeWachtwoord);

  const user = await userCollection.findOne({ _id: new ObjectId(id) });

  if (user && oudeWachtwoord && nieuweWachtwoord) {
    console.log("eerst");
    if (await bcrypt.compare(oudeWachtwoord, user.password!)) {
      const hashedPass = await bcrypt.hash(nieuweWachtwoord, saltRounds);
      console.log("tweede");
      try {
        await userCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { password: hashedPass } },
        );

        return true;
      } catch (e) {
        return false;
      }
    }
  }
}

export async function login(email: string, password: string) {
  if (email === "" || password === "") {
    throw new Error("Email and password required");
  }

  let user = await userCollection.findOne<User>({
    email: email,
  });
  console.log("user: " + user);
  if (user) {
    if (await bcrypt.compare(password, user.password!)) {
      return user;
    } else {
      throw new Error("Password incorrect");
    }
  } else {
    throw new Error("User not found");
  }
}

async function exit() {
  try {
    await client.close();
    console.log("Disconnected from database");
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
}

export async function connect() {
  await client.connect();
  console.log("Connected to database");
  process.on("SIGINT", exit);
}
