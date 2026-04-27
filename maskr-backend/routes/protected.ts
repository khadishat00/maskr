import express, { Router } from "express";
import { secureMiddleware } from "../secureMiddleware";
import { editUser } from "../database";
import { avatars } from "../assets";

const router: Router = express.Router();

router.get("/home", secureMiddleware, (request, response) => {
  response.render("home", { user: request.session.user });
});

router.get("/profiel", secureMiddleware, (request, response) => {
  response.render("profiel", { user: request.session.user });
});

router.get("/profiel/edit", secureMiddleware, (request, response) => {
  response.render("profiel_edit", { user: request.session.user, avatars });
});

router.post("/profiel/edit", secureMiddleware, async (request, response) => {
  const id = request.session.user?._id;
  const email = request.body.email;
  const image = request.body.image;
  const username = request.body.username;
  const oudeWachtwoord = request.body.oudeWachtwoord;
  const nieuweWachtwoord = request.body.nieuweWachtwoord;

  console.log("image: " + image);
  console.log("email: " + email);

  const { success, passwordChanged } = await editUser(
    id,
    email,
    image,
    username,
    oudeWachtwoord,
    nieuweWachtwoord,
  );

  if (success && passwordChanged) {
    request.session.destroy(() => {
      response.render("login", {
        error: "Wachtwoord gewijzigd, log opnieuw in",
      });
    });
  } else if (success) {
    request.session.user = { ...request.session.user, username, image, email };
    response.redirect("/profiel");
  } else {
    response.render("profiel_edit", { user: request.session.user });
  }
});

module.exports = router;
