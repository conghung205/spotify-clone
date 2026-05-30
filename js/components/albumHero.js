import { formatDurationFullText } from "../utils/formatDuration.js";
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
            <p>Album</p>
            <h1 class="artist-name">${album?.title}</h1>
            <p>
                <a href="">${album?.artist_name}</a> • 2023 • ${album.total_tracks} songs ,
                ${formatDurationFullText(album.total_duration)}
            </p>
        </div>
    </section>`;
}

export default albumHero;
