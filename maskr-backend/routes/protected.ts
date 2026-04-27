import express, { Router } from "express";
import { secureMiddleware } from "../secureMiddleware";
import { editUser } from "../database";

const router: Router = express.Router();

router.get("/home", secureMiddleware, (request, response) => {
  response.render("home", { user: request.session.user });
});

router.get("/profiel", secureMiddleware, (request, response) => {
  response.render("profiel", { user: request.session.user });
});

router.get("/profiel/edit", secureMiddleware, (request, response) => {
  response.render("profiel_edit", { user: request.session.user });
});

router.post("/profiel/edit", secureMiddleware, async (request, response) => {
  const id = request.session.user?._id;
  //console.log(id);
  const email = request.body.email;
  const image = "";
  const username = request.body.username;
  const oudeWachtwoord = request.body.oudeWachtwoord;
  const nieuweWachtwoord = request.body.nieuweWachtwoord;

  try {
    let success = await editUser(
      id,
      email,
      image,
      username,
      oudeWachtwoord,
      nieuweWachtwoord,
    );

    if (success) {
      request.session.destroy(() => {
        response.redirect("/login");
      });
    } else {
      console.log("werkt niet");
      response.render("profiel_edit", { user: request.session.user });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
