const songs = [
{
title:"Blinding Lights",
artist:"The Weeknd",
popularity:95,
energy:80,
dance:75,
tempo:171,
mood:70,
acoustic:20
},
{
title:"Shape of You",
artist:"Ed Sheeran",
popularity:92,
energy:65,
dance:83,
tempo:96,
mood:93,
acoustic:58
},
{
title:"STAY",
artist:"The Kid LAROI",
popularity:91,
energy:88,
dance:79,
tempo:170,
mood:60,
acoustic:15
},
{
title:"Watermelon Sugar",
artist:"Harry Styles",
popularity:90,
energy:72,
dance:80,
tempo:95,
mood:85,
acoustic:30
},
{
title:"Heat Waves",
artist:"Glass Animals",
popularity:89,
energy:60,
dance:70,
tempo:81,
mood:75,
acoustic:40
},
{
title:"Levitating",
artist:"Dua Lipa",
popularity:88,
energy:78,
dance:85,
tempo:103,
mood:82,
acoustic:25
}
];

const song1 = document.getElementById("song1");
const song2 = document.getElementById("song2");

song1.innerHTML = "";
song2.innerHTML = "";

songs.forEach(s => {
    const o1 = document.createElement("option");
    o1.value = s.title;
    o1.textContent = s.title + " - " + s.artist;

    const o2 = document.createElement("option");
    o2.value = s.title;
    o2.textContent = s.title + " - " + s.artist;

    song1.appendChild(o1);
    song2.appendChild(o2);
});

function icon(valA, valB) {
    return valA > valB
        ? " +"
        : valA < valB
        ? " -"
        : "";
}

function update() {
    const a = songs.find(s => s.title === song1.value);
    const b = songs.find(s => s.title === song2.value);

    if (!a || !b) return;

    document.getElementById("title1").textContent = a.title;
    document.getElementById("title2").textContent = b.title;

    document.getElementById("pop1").textContent = a.popularity + icon(a.popularity, b.popularity);
    document.getElementById("pop2").textContent = b.popularity + icon(b.popularity, a.popularity);

    document.getElementById("energy1").textContent = a.energy + icon(a.energy, b.energy);
    document.getElementById("energy2").textContent = b.energy + icon(b.energy, a.energy);

    document.getElementById("dance1").textContent = a.dance + icon(a.dance, b.dance);
    document.getElementById("dance2").textContent = b.dance + icon(b.dance, a.dance);

    document.getElementById("tempo1").textContent = a.tempo + " BPM" + icon(a.tempo, b.tempo);
    document.getElementById("tempo2").textContent = b.tempo + " BPM" + icon(b.tempo, a.tempo);

    document.getElementById("mood1").textContent = a.mood + icon(a.mood, b.mood);
    document.getElementById("mood2").textContent = b.mood + icon(b.mood, a.mood);

    document.getElementById("acoustic1").textContent = a.acoustic + icon(a.acoustic, b.acoustic);
    document.getElementById("acoustic2").textContent = b.acoustic + icon(b.acoustic, a.acoustic);
}

song1.addEventListener("change", update);
song2.addEventListener("change", update);