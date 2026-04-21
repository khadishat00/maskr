const moodMap = {
  chill: "chill",
  happy: "happy hits",
  party: "party",
  focus: "focus"
};

let score = 0;
let currentMood = "chill";
let currentSong = null;
let audio = null;

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
  playButton.addEventListener("click", playSongPreview);
  guessInput.addEventListener("input", checkInput);
  guessForm.addEventListener("submit", checkAnswer);

  loadSong(currentMood);
}

async function loadSong(mood) {
  stopAudio();
  statusText.textContent = "Loading song...";
  message.textContent = "";
  playButton.disabled = true;

  const query = moodMap[mood];
  const url = "https://api.deezer.com/search?q=" + encodeURIComponent(query) + "&limit=25&output=jsonp";

  try {
    const data = await getJsonp(url);
    const songs = data.data;
    const songsWithPreview = [];

    for (let i = 0; i < songs.length; i++) {
      if (songs[i].preview) {
        songsWithPreview.push(songs[i]);
      }
    }

    if (songsWithPreview.length === 0) {
      statusText.textContent = "No song preview found.";
      return;
    }

    const randomNumber = Math.floor(Math.random() * songsWithPreview.length);
    const song = songsWithPreview[randomNumber];

    currentSong = song;
    coverImage.src = song.album.cover_medium;
    statusText.textContent = "Press play and guess the song.";
    playButton.disabled = false;
  } catch (error) {
    statusText.textContent = "Could not load song from Deezer.";
  }
}

function playSongPreview() {
  if (!currentSong || !currentSong.preview) {
    statusText.textContent = "No preview available.";
    return;
  }

  stopAudio();

  audio = new Audio(currentSong.preview);
  audio.play();
  statusText.textContent = "Preview is playing...";

  setTimeout(function () {
    stopAudio();
    statusText.textContent = "Preview ended. Enter your guess.";
  }, 15000);
}

function checkAnswer(event) {
  event.preventDefault();

  if (!currentSong) {
    return;
  }

  const userGuess = guessInput.value.trim().toLowerCase();
  const songTitle = currentSong.title.toLowerCase();
  const artistName = currentSong.artist.name.toLowerCase();

  if (userGuess === "") {
    return;
  }

  const correct =
    songTitle.includes(userGuess) ||
    artistName.includes(userGuess) ||
    userGuess.includes(songTitle) ||
    userGuess.includes(artistName);

  if (correct) {
    score = score + 1;
    scoreText.textContent = score;
    message.textContent = "Correct answer!";
    guessInput.value = "";
    submitButton.disabled = true;
    loadSong(currentMood);
  } else {
    message.textContent = "Wrong guess. Try again.";
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
  submitButton.disabled = true;
  loadSong(currentMood);
}

function checkInput() {
  if (guessInput.value.trim() === "") {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}

function stopAudio() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    audio = null;
  }
}

function getJsonp(url) {
  return new Promise(function (resolve, reject) {
    const callbackName = "deezerCallback" + Math.floor(Math.random() * 1000000);
    const script = document.createElement("script");

    window[callbackName] = function (data) {
      resolve(data);
      document.body.removeChild(script);
      delete window[callbackName];
    };

    script.onerror = function () {
      reject();
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      delete window[callbackName];
    };

    script.src = url + "&callback=" + callbackName;
    document.body.appendChild(script);
  });
}
