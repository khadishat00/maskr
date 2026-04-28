// compare.js

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

const select1 = document.getElementById("song1");
const select2 = document.getElementById("song2");

// dropdown vullen
songs.forEach(song => {
    const option1 = document.createElement("option");
    option1.value = song.title;
    option1.textContent = `${song.title} - ${song.artist}`;
    select1.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = song.title;
    option2.textContent = `${song.title} - ${song.artist}`;
    select2.appendChild(option2);
});

// update functie
function updateComparison() {
    const songA = songs.find(s => s.title === select1.value);
    const songB = songs.find(s => s.title === select2.value);

    if (songA) {
        document.getElementById("cover1").src = songA.cover;
        document.getElementById("title1").textContent = songA.title;
        document.getElementById("artist1").textContent = songA.artist;
        document.getElementById("pop1").textContent = songA.popularity;
    }

    if (songB) {
        document.getElementById("cover2").src = songB.cover;
        document.getElementById("title2").textContent = songB.title;
        document.getElementById("artist2").textContent = songB.artist;
        document.getElementById("pop2").textContent = songB.popularity;
    }
}

select1.addEventListener("change", updateComparison);
select2.addEventListener("change", updateComparison);