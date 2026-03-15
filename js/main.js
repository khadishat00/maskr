function toonNummers(nummers) {
    const grid = document.getElementById('popularSongsGrid');
    grid.innerHTML = nummers.map(n => `
        <div class="col">
            <div class="card h-100 p-3 track-card shadow-sm">
                <div class="track-img-container mb-3">
                    <img src="${n.cover}" alt="${n.titel}">
                </div>
                <h4 class="h6 fw-bold mb-1 text-truncate">${n.titel}</h4>
                <p class="small text-purple-900 mb-2 text-truncate">${n.artiest}</p>
                <div class="d-flex align-items-center gap-2">
                    <div class="flex-grow-1 popularity-progress">
                        <div class="popularity-fill" style="width: ${n.populariteit}%"></div>
                    </div>
                    <span class="small fw-bold text-purple-900">${n.populariteit}%</span>
                </div>
            </div>
        </div>
    `).join('');
}