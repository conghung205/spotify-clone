import { formatDurationFullText } from "../utils/formatDuration.js";
function heroCollection(data) {
    console.log(data);

    return `
        <section class="collection-hero">
            <div class="collection-icon">
                <i class="fas fa-heart"></i>
            </div>
            <div class="collection-content">
                <p>Playlist</p>
                <h1 class="artist-name">Liked Songs</h1>
                <p class="collection-desc">
                    <a href="#/me" class="collection-username">${data.userName}</a> • ${data.totalSongs} ${data.totalSongs > 1 ? "songs" : "song"},
                    ${formatDurationFullText(data.duration)}
                </p>
            </div>
        </section>`;
}

export default heroCollection;
