import express, { Router } from "express";
import { createUser, login } from "../database";
import { avatars } from "../assets";

import { User } from "../types";

const router: Router = express.Router();

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

  //checks
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
    //session
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

  //response.render("login", { error: error });
});

router.post("/logout", async (request, response) => {
  request.session.destroy(() => {
    response.redirect("/login");
  });
});



// home login
router.get("/home", secureMiddleware, (req, res) => {
  res.render("home", { user: req.session.user });
});

export default router;
