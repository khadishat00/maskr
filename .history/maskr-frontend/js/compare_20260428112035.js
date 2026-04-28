// compare.js

const songs = [
{
title: "Blinding Lights",
artist: "The Weeknd",
popularity: 95,
energy: 80,
dance: 75,
tempo: 171,
mood: 70,
acoustic: 20
},
{
title: "Shape of You",
artist: "Ed Sheeran",
popularity: 92,
energy: 65,
dance: 83,
tempo: 96,
mood: 93,
acoustic: 58
},
{
title: "STAY",
artist: "The Kid LAROI",
popularity: 91,
energy: 88,
dance: 79,
tempo: 170,
mood: 60,
acoustic: 15
}
];

const song1 = document.getElementById("song1");
const song2 = document.getElementById("song2");

/* dropdown vullen */
songs.forEach(song => {
    let option1 = document.createElement("option");
    option1.value = song.title;
    option1.textContent = `${song.title} - ${song.artist}`;
    song1.appendChild(option1);

    let option2 = document.createElement("option");
    option2.value = song.title;
    option2.textContent = `${song.title} - ${song.artist}`;
    song2.appendChild(option2);
});

/* vergelijking updaten */
function updateCompare() {
    const first = songs.find(s => s.title === song1.value);
    const second = songs.find(s => s.title === song2.value);

    if (first) {
        document.getElementById("title1").textContent = first.title;
        document.getElementById("pop1").textContent = first.popularity;
        document.getElementById("energy1").textContent = first.energy;
        document.getElementById("dance1").textContent = first.dance;
        document.getElementById("tempo1").textContent = first.tempo + " BPM";
        document.getElementById("mood1").textContent = first.mood;
        document.getElementById("acoustic1").textContent = first.acoustic;
    }

    if (second) {
        document.getElementById("title2").textContent = second.title;
        document.getElementById("pop2").textContent = second.popularity;
        document.getElementById("energy2").textContent = second.energy;
        document.getElementById("dance2").textContent = second.dance;
        document.getElementById("tempo2").textContent = second.tempo + " BPM";
        document.getElementById("mood2").textContent = second.mood;
        document.getElementById("acoustic2").textContent = second.acoustic;
    }
}

song1.addEventListener("change", updateCompare);
song2.addEventListener("change", updateCompare);