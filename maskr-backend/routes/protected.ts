import express, { Router } from "express";
import { secureMiddleware } from "../secureMiddleware";
import { editUser } from "../database";

const router: Router = express.Router();

// 👇 avatars
const avatars = [
  "/assets/avatar01.png",
  "/assets/avatar02.png",
  "/assets/avatar03.png",
  "/assets/avatar04.png",
  "/assets/avatar05.png",
  "/assets/avatar06.png",
  "/assets/avatar07.png",
  "/assets/avatar08.png",
  "/assets/avatar09.png",
  "/assets/avatar10.png",
  "/assets/avatar11.png",
  "/assets/avatar12.png",
];

// HOME
router.get("/home", secureMiddleware, (req, res) => {
  res.render("home", { user: req.session.user });
});

// PROFIEL
router.get("/profiel", secureMiddleware, (req, res) => {
  res.render("profiel", { user: req.session.user });
});

// EDIT PAGE
router.get("/profiel/edit", secureMiddleware, (req, res) => {
  res.render("profiel_edit", {
    user: req.session.user,
    avatars,
  });
});

// SAVE EDIT
router.post("/profiel/edit", secureMiddleware, async (req, res) => {
  const user = req.session.user;

  if (!user) {
    return res.redirect("/login");
  }

  const id = user._id;

  const email = req.body.email;
  const image = req.body.image;
  const username = req.body.username;
  const oudeWachtwoord = req.body.oudeWachtwoord;
  const nieuweWachtwoord = req.body.nieuweWachtwoord;

  console.log("gekozen avatar:", image);

  const { success, passwordChanged } = await editUser(
    id,
    email,
    image,
    username,
    oudeWachtwoord,
    nieuweWachtwoord,
  );

  if (success && passwordChanged) {
    req.session.destroy(() => {
      res.render("login", {
        error: "Wachtwoord gewijzigd, log opnieuw in",
      });
    });
    return;
  }

  if (success) {
    req.session.user = {
      ...user,
      username,
      email,
      image: image || user.image || "/assets/avatar01.png",
    };

    return res.redirect("/profiel");
  }

  return res.render("profiel_edit", {
    user,
    avatars,
  });
});

module.exports = router;
