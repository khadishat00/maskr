import express, { Router } from "express";
import { createUser, login } from "../database";
import { avatars } from "../assets";
import { User } from "../types";
import YTMusic from "ytmusic-api";
import { addFavorite, removeFavorite, getFavorites } from "../models/favorite";


const router: Router = express.Router();
const ytmusic = new YTMusic();

// initialiseren van ytmusic
ytmusic.initialize().catch(console.error);

router.get("/", (request, response) => {
  response.render("index");
});

router.get("/signin", (request, response) => {
  response.render("signin", { error: "" });
});

router.post("/signin", async (request, response) => {
  const username: string = request.body.username;
  const email: string = request.body.email;
  const password: string = request.body.password;
  const image: string = avatars[0];
  let error = "";

  if (username == "") {
    error = "Username mag niet leeg zijn";
    return response.render("signin", { error: error });
  }

  if (email == "") {
    error = "Email mag niet leeg zijn";
    return response.render("signin", { error: error });
  }

  if (!email.includes("@")) {
    error = "Vul een geldige email adres in";
    return response.render("signin", { error: error });
  }

  if (password == "") {
    error = "Wachtwoord mag niet leeg zijn";
    return response.render("signin", { error: error });
  }
  try {
    await createUser(username, email, password, image);
    return response.render("login", {
      error: "account is aangemaakt nu kan je inloggen",
    });
  } catch (e) {
    console.log(e);
    return response.render("signin", { error: "Probeer het opnieuw" });
  }
});

router.get("/login", (request, response) => {
  response.render("login", { error: "" });
});

router.post("/login", async (request, response) => {
  const email: string = request.body.email;
  const password: string = request.body.password;

  try {
    let user: User = await login(email, password);
    console.log(user);
    delete user.password;
    request.session.user = user;

    request.session.save((err) => {
      if (err) {
        console.log("Session save error:", err);
        return response.render("login", { error: "Probeer het opnieuw" });
      }
      return response.redirect("/home");
    });
  } catch (e) {
    console.log(e);
    return response.render("login", { error: "Ongeldige email of wachtwoord" });
  }
});

router.post("/logout", async (request, response) => {
  request.session.destroy(() => {
    response.redirect("/login");
  });
});

// API route
router.get("/api/songs/:query", async (req, res) => {
  try {
    const results = await ytmusic.search(req.params.query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Zoeken mislukt" });
  }
});

router.get("/api/popular-songs", async (req, res) => {
  try {
    const results = await ytmusic.search("popular music");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Nummers laden mislukt" });
  }
});

//  favorite toevoegen
router.post("/api/favorites/:songId", async (req, res) => {
  try {
    if (!req.session.user?._id) {
      return res.status(401).json({ error: "Niet ingelogd" });
    }
    
    const result = await addFavorite(req.session.user._id.toString(), req.body.song);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Favorite toevoegen mislukt" });
  }
});

// Verwijder favorite
router.delete("/api/favorites/:songId", async (req, res) => {
  try {
    if (!req.session.user?._id) {
      return res.status(401).json({ error: "Niet ingelogd" });
    }
    
    const result = await removeFavorite(req.session.user._id.toString(), req.params.songId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Favorite verwijderen mislukt" });
  }
});

// favorites ophalen
router.get("/api/favorites", async (req, res) => {
  try {
    if (!req.session.user?._id) {
      return res.status(401).json({ error: "Niet ingelogd" });
    }
    
    const favorites = await getFavorites(req.session.user._id.toString());
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Favorites laden mislukt" });
  }
});



export default router;
