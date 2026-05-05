let score = 0;
let currentMood = "chill";
let currentSong = null;

const moodSelect = document.getElementById("moodSelect");
const scoreText = document.getElementById("score");
const resetButton = document.getElementById("resetButton");
const moodBadge = document.getElementById("moodBadge");
const coverImage = document.getElementById("coverImage");
const playButton = document.getElementById("playButton");
const statusText = document.getElementById("statusText");
const guessForm = document.getElementById("guessForm");
const guessInput = document.getElementById("guessInput");
const submitButton = document.getElementById("submitButton");
const message = document.getElementById("message");

startApp();

function startApp() {
  moodSelect.addEventListener("change", changeMood);
  resetButton.addEventListener("click", resetScore);
  playButton.addEventListener("click", openSong);
  guessInput.addEventListener("input", checkInput);
  guessForm.addEventListener("submit", checkAnswer);

  loadSong(currentMood);
}

async function loadSong(mood) {
  statusText.textContent = "Loading song...";
  message.textContent = "";
  playButton.disabled = true;
  submitButton.disabled = true;

  try {
    const response = await fetch("/api/song?mood=" + encodeURIComponent(mood));
    const song = await response.json();

    if (!response.ok || !song.title) {
      statusText.textContent = "No song found.";
      return;
    }

    currentSong = song;
    coverImage.src = song.image || "";
    statusText.textContent = "Open the song and guess the title or artist.";
    playButton.disabled = false;
  } catch (error) {
    statusText.textContent = "Could not load song from YouTube Music.";
  }
}

function openSong() {
  if (!currentSong || !currentSong.videoId) {
    statusText.textContent = "No song link available.";
    return;
  }

  const songUrl = "https://music.youtube.com/watch?v=" + currentSong.videoId;
  window.open(songUrl, "_blank");
  statusText.textContent = "Song opened in YouTube Music. Listen and guess.";
}

function checkAnswer(event) {
  event.preventDefault();

  if (!currentSong) {
    return;
  }

  const userGuess = guessInput.value.trim().toLowerCase();
  const songTitle = currentSong.title.toLowerCase();
  const artistName = currentSong.artist.toLowerCase();

  if (userGuess === "") {
    return;
  }

  const correct =
    songTitle.includes(userGuess) ||
    artistName.includes(userGuess) ||
    userGuess.includes(songTitle) ||
    userGuess.includes(artistName);

  if (correct) {
    score = score + 10;
    scoreText.textContent = score;
    message.textContent = "Juist antwoord! +10";
    guessInput.value = "";
    loadSong(currentMood);
  } else {
    message.textContent = "Verkeerde gok. Probeer het opnieuw.";
    guessInput.value = "";
    submitButton.disabled = true;
  }
}

function resetScore() {
  score = 0;
  scoreText.textContent = score;
  message.textContent = "Score reset.";
}

function changeMood() {
  currentMood = moodSelect.value;

  const moodName = currentMood.charAt(0).toUpperCase() + currentMood.slice(1);
  moodBadge.textContent = "Current Mood: " + moodName;

  guessInput.value = "";
  loadSong(currentMood);
}

function checkInput() {
  submitButton.disabled = guessInput.value.trim() === "";
}
