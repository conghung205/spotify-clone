function popularArtistItem({ name, image_url, id }) {
    return `
    <div class="artist-card" data-id="${id}">
        <div class="artist-card-cover">
            <img
                src="${image_url}?height=160&width=160"
                alt="Đen"
            />
            <button class="artist-play-btn">
                <i class="fas fa-play"></i>
            </button>
        </div>
        <div class="artist-card-info">
            <h3 class="artist-card-name">${name}</h3>
            <p class="artist-card-type">Artist</p>
        </div>
    </div>`;
}
export default popularArtistItem;
