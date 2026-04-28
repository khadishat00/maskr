const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");

form.addEventListener("submit", function(e){
e.preventDefault();

const zoekTerm = input.value.toLowerCase();

const resultaat = songs.find(song =>
song.artist.toLowerCase().includes(zoekTerm) ||
song.title.toLowerCase().includes(zoekTerm)
);

if(resultaat){
window.location.href = "song.html?song=" + encodeURIComponent(resultaat.title);
}else{
alert("Geen nummer gevonden");
}

});