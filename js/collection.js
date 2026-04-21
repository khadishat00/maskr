let musicItems = [];
let currentType = "playlist";
let currentSearch = "";
let currentSort = "recent";
let recentNumber = 0;

const playlistList = document.getElementById("playlistList");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const messageText = document.getElementById("messageText");
const filterButtons = document.querySelectorAll(".filter-button");
const createButton = document.getElementById("createButton");
const modalBackground = document.getElementById("modalBackground");
const createForm = document.getElementById("createForm");
const cancelButton = document.getElementById("cancelButton");
const titleInput = document.getElementById("titleInput");
const typeInput = document.getElementById("typeInput");
const creatorInput = document.getElementById("creatorInput");

const fallbackImages = [
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=400&q=80"
];

const starterItems = [
  { title: "Liked Songs", query: "liked songs chill", type: "playlist", creator: "Pulse" },
  { title: "Your Episodes", query: "podcast motivation", type: "podcast", creator: "Pulse" },
  { title: "Chill Vibes", query: "chill vibes", type: "playlist", creator: "Deezer" },
  { title: "Worship Mix", query: "worship mix", type: "playlist", creator: "Deezer" },
  { title: "Afro Combo", query: "afro hits", type: "artist", creator: "Deezer" },
  { title: "Prayer Songs", query: "prayer songs", type: "album", creator: "Deezer" }
];

addEvents();
loadMusic();

function addEvents() {
  searchInput.addEventListener("input", function () {
    currentSearch = searchInput.value.toLowerCase();
    showMusic();
  });

  sortSelect.addEventListener("change", function () {
    currentSort = sortSelect.value;
    showMusic();
  });

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      currentType = button.dataset.type;

      filterButtons.forEach(function (item) {
        item.classList.remove("active");
      });

      button.classList.add("active");
      showMusic();
    });
  });

  createButton.addEventListener("click", function () {
    modalBackground.classList.remove("hidden");
  });

  cancelButton.addEventListener("click", function () {
    modalBackground.classList.add("hidden");
    createForm.reset();
  });

  modalBackground.addEventListener("click", function (event) {
    if (event.target === modalBackground) {
      modalBackground.classList.add("hidden");
      createForm.reset();
    }
  });

  createForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newTitle = titleInput.value.trim();
    const newType = typeInput.value;
    const newCreator = creatorInput.value.trim() || "You";

    if (newTitle === "") {
      return;
    }

    recentNumber = recentNumber + 1;

    const newItem = {
      title: newTitle,
      type: newType,
      creator: newCreator,
      subtitle: firstLetterBig(newType) + " - " + newCreator,
      image: fallbackImages[recentNumber % fallbackImages.length],
      recent: recentNumber
    };

    musicItems.push(newItem);
    currentType = newType;
    currentSearch = "";
    currentSort = "recent";
    searchInput.value = "";
    sortSelect.value = "recent";

    filterButtons.forEach(function (button) {
      button.classList.remove("active");
      if (button.dataset.type === newType) {
        button.classList.add("active");
      }
    });

    modalBackground.classList.add("hidden");
    createForm.reset();
    messageText.textContent = "Added " + newTitle;
    showMusic();
  });
}

async function loadMusic() {
  messageText.textContent = "Loading music...";

  for (let i = 0; i < starterItems.length; i++) {
    const result = await getMusicFromDeezer(starterItems[i], i);
    musicItems.push(result);
  }

  recentNumber = musicItems.length;
  showMusic();
}

async function getMusicFromDeezer(item, index) {
  const url = "https://api.deezer.com/search?q=" + encodeURIComponent(item.query) + "&limit=1&output=jsonp";

  try {
    const data = await getJsonp(url);

    if (data.data && data.data.length > 0) {
      const song = data.data[0];
      let image = fallbackImages[index % fallbackImages.length];

      if (song.album && song.album.cover_big) {
        image = song.album.cover_big;
      } else if (song.artist && song.artist.picture_big) {
        image = song.artist.picture_big;
      }

      return {
        title: item.title,
        type: item.type,
        creator: item.creator,
        subtitle: firstLetterBig(item.type) + " - " + item.creator,
        image: image,
        recent: starterItems.length - index
      };
    }
  } catch (error) {
    console.log("Could not load Deezer data");
  }

  return {
    title: item.title,
    type: item.type,
    creator: item.creator,
    subtitle: firstLetterBig(item.type) + " - " + item.creator,
    image: fallbackImages[index % fallbackImages.length],
    recent: starterItems.length - index
  };
}

function getJsonp(url) {
  return new Promise(function (resolve, reject) {
    const callbackName = "myCallback" + Math.floor(Math.random() * 1000000);
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

function showMusic() {
  playlistList.innerHTML = "";

  let filteredItems = musicItems.filter(function (item) {
    return item.type === currentType;
  });

  filteredItems = filteredItems.filter(function (item) {
    const text = (item.title + " " + item.subtitle + " " + item.creator).toLowerCase();
    return text.includes(currentSearch);
  });

  if (currentSort === "az") {
    filteredItems.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
  } else if (currentSort === "za") {
    filteredItems.sort(function (a, b) {
      return b.title.localeCompare(a.title);
    });
  } else {
    filteredItems.sort(function (a, b) {
      return b.recent - a.recent;
    });
  }

  if (filteredItems.length === 0) {
    playlistList.innerHTML = "<p>No items found</p>";
    messageText.textContent = "0 items";
    return;
  }

  for (let i = 0; i < filteredItems.length; i++) {
    const item = filteredItems[i];

    const card = document.createElement("div");
    card.className = "card";

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.title;

    const cardText = document.createElement("div");
    cardText.className = "card-text";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const subtitle = document.createElement("p");
    subtitle.textContent = item.subtitle;

    const typeLabel = document.createElement("div");
    typeLabel.className = "type-label";
    typeLabel.textContent = firstLetterBig(item.type);

    cardText.appendChild(title);
    cardText.appendChild(subtitle);

    card.appendChild(image);
    card.appendChild(cardText);
    card.appendChild(typeLabel);

    playlistList.appendChild(card);
  }

  messageText.textContent = filteredItems.length + " item(s)";
}

function firstLetterBig(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
