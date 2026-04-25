import express, { Router } from "express";
import { createuser, login } from "../database";
import { error } from "node:console";

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
  const image: string = "";
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
    await createuser(username, email, password, image);
    //maak session aan

    //home page
    return response.render("signin", { error: error });
  } catch (e) {
    console.log(e);
    return response.render("signin", { error: "Probeer het opnieuw" });
  }
});

router.get("/login", (request, response) => {
  response.render("login", { error: error });
});

router.post("/login", async (request, response) => {
  const email: string = request.body.email;
  const password: string = request.body.password;

  try {
    await login(email, password);
  } catch (e) {
    console.log(e);
  }

  response.render("login", { error: error });
});

module.exports = router;
