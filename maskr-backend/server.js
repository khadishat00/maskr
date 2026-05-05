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
    title: "Guess the Song"
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

app.get("/api/song", async function (req, res) {
  const mood = req.query.mood || "chill";

  const moodQueries = {
    chill: "chill popular songs",
    happy: "happy popular songs",
    sad: "sad popular songs",
    energy: "energetic popular songs",
    focus: "focus music songs"
  };

  const query = moodQueries[mood] || moodQueries.chill;

  try {
    await initYoutubeMusic();

    const result = await youtubeApi.search(query, "song");

    if (!result.content || result.content.length === 0) {
      return res.status(404).json({ error: "No song found" });
    }

    const randomIndex = Math.floor(Math.random() * result.content.length);
    const song = result.content[randomIndex];

    res.json({
      title: song.name || song.title || "Unknown Song",
      artist: getArtistName(song),
      image: getBestThumbnail(song.thumbnails),
      videoId: song.videoId
    });
  } catch (error) {
    console.log("Song API error:", error.message);
    res.status(500).json({ error: "Could not load song" });
  }
});

function getArtistName(song) {
  if (song.artist && song.artist.name) {
    return song.artist.name;
  }

  if (song.artists && song.artists.length > 0) {
    return song.artists[0].name;
  }

  return "Unknown Artist";
}

function getBestThumbnail(thumbnails) {
  if (!thumbnails || thumbnails.length === 0) {
    return "";
  }

  return thumbnails[thumbnails.length - 1].url;
}

app.listen(3000, function () {
  console.log("Server draait op http://localhost:3000");
});
