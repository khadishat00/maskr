import express, { Router } from "express";
import { createUser, login } from "../database";
import { avatars } from "../assets";
import { User } from "../types";

const router: Router = express.Router();
router.get("/", (request, response) => {
  response.render("index");
});

router.get("/home", (request, response) => {
  response.render("home");
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
  if (username === "") {
    error = "Username mag niet leeg zijn";
    return response.render("signin", { error });
  }
  if (email === "") {
    error = "Email mag niet leeg zijn";
    return response.render("signin", { error });
  }
  if (!email.includes("@")) {
    error = "Vul een geldig emailadres in";
    return response.render("signin", { error });
  }
  if (password === "") {
    error = "Wachtwoord mag niet leeg zijn";
    return response.render("signin", { error });
  }
  try {
    await createUser(username, email, password, image);
    return response.render("login", {
      error: "Account is aangemaakt, nu kan je inloggen",
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
    delete user.password;
    request.session.user = user;
    request.session.save((err) => {
      if (err) {
        console.log(err);
        return response.render("login", { error: "Probeer het opnieuw" });
      }
      return response.redirect("/home");
    });
  } catch (e) {
    console.log(e);
    return response.render("login", { error: "Ongeldige email of wachtwoord" });
  }
});

router.post("/logout", (request, response) => {
  request.session.destroy(() => {
    response.redirect("/login");
  });
});

export default router;
