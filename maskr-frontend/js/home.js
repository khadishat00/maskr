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

const grid = document.getElementById("popularSongsGrid");

// Alleen uitvoeren als we op de homepagina zijn (waar het grid bestaat)
if (grid) {
    songs.forEach(song => {
        const col = document.createElement("div");
        col.className = "col";

        col.innerHTML = `
            <div class="card song-card p-2 border-2" 
                 style="cursor:pointer" 
                 onclick="openSong('${song.title}')">
                
                <img src="${song.cover}" class="song-img">
                
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
                
                <div class="popularity-bar">
                    <div class="popularity-fill" style="width:${song.popularity}%"></div>
                </div>
                
                <div class="text-end small mt-1">${song.popularity}%</div>
            </div>
        `;

        grid.appendChild(col);
    });
}

// Functie detailpagina 
function openSong(title) {
    window.location.href = "song.html?song=" + encodeURIComponent(title);
}

// actief als je op song page bent
if (window.location.pathname.includes("song.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const songTitle = urlParams.get('song');

    // Zoek het liedje in de lijst bovenin
    const selectedSong = songs.find(s => s.title === songTitle);

    if (selectedSong) {
        const titleEl = document.getElementById('songTitle');
        const artistEl = document.getElementById('songArtist');
        const coverEl = document.getElementById('songCover');
        const popEl = document.getElementById('songPopularity');

        if (titleEl) titleEl.textContent = selectedSong.title;
        if (artistEl) artistEl.textContent = selectedSong.artist;
        if (coverEl) coverEl.src = selectedSong.cover;
        if (popEl) popEl.textContent = selectedSong.popularity + "%";
    }
}
