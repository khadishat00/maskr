import express from "express";
import YTMusic from "ytmusic-api";

const router = express.Router();
const ytmusic = new YTMusic();

async function init() {
    await ytmusic.initialize();
}

init();

router.get("/", async (req, res) => {
    try {
        const songs = await ytmusic.searchSongs("Blinding Lights");

        res.render("song", {
            songs
        });
    } catch (error) {
        console.log(error);
        res.send("Error loading songs");
    }
});

export default router;
