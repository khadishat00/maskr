const express = require("express");
const YoutubeMusicApi = require("youtube-music-api");

const app = express();
const youtubeApi = new YoutubeMusicApi();

let youtubeReady = false;

app.set("view engine", "ejs");
app.use(express.static("public"));

async function initYoutubeMusic() {
  if (!youtubeReady) {
    await youtubeApi.initalize();
    youtubeReady = true;
  }
}

app.get("/", function (req, res) {
  res.redirect("/collection");
});

app.get("/collection", function (req, res) {
  res.render("collection", {
    title: "Collection",
    user: null,
    message: "Loading music...",
    playlists: []
  });
});

app.get("/game", function (req, res) {
  res.render("game", {
    title: "Raad het liedje"
  });
});

app.get("/api/music/search", async function (req, res) {
  const query = req.query.q || "";
  const type = req.query.type || "song";

  if (query.trim() === "") {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    await initYoutubeMusic();

    const result = await youtubeApi.search(query, type);
    res.json(result);
  } catch (error) {
    console.log("YouTube Music API error:", error.message);
    res.status(500).json({ error: "Could not load YouTube Music data" });
  }
});

app.listen(3000, function () {
  console.log("Server draait op http://localhost:3000");
});
