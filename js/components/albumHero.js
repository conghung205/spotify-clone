function albumHero(album) {
    return `
    <section class="album-hero">
        <div class="album-img">
            <img
                src="${album?.artist_image_url}"
                alt="${album?.title}"
            />
        </div>
        <div class="hero-content">
            <p>album</p>
            <h1 class="artist-name">${album?.title}</h1>
            <p>
                <a href="">${album?.artist_name}</a> • 2023 • ${album.total_tracks} songs ,
                56 min 24 sec
            </p>
        </div>
    </section>`;
}

export default albumHero;
