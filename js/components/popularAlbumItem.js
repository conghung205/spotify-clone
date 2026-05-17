function popularAlbumItem({ id, artist_name, title, artist_image_url }) {
    return `
        <div class="hit-card" data-id="${id}">
            <div class="hit-card-cover">
                <img
                    src="${artist_image_url}"
                    alt="Flowers"
                />
                <button class="hit-play-btn">
                    <i class="fas fa-play"></i>
                </button>
            </div>
            <div class="hit-card-info">
                <h3 class="hit-card-title">${title}</h3>
                <p class="hit-card-artist">${artist_name}</p>
            </div>
        </div>
    `;
}

export default popularAlbumItem;
