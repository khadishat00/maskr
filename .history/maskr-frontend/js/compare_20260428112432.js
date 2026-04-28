const songs = [
{
title:"Blinding Lights",
artist:"The Weeknd",
popularity:95,
cover:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300"
},
{
title:"Shape of You",
artist:"Ed Sheeran",
popularity:92,
cover:"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300"
},
{
title:"STAY",
artist:"The Kid LAROI",
popularity:91,
cover:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300"
},
{
title:"Watermelon Sugar",
artist:"Harry Styles",
popularity:90,
cover:"https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=300"
},
{
title:"Heat Waves",
artist:"Glass Animals",
popularity:89,
cover:"https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300"
},
{
title:"Levitating",
artist:"Dua Lipa",
popularity:88,
cover:"https://images.unsplash.com/photo-1518972559570-7cc1309f3229?w=300"
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