import { formatDurationFullText } from "../utils/formatDuration.js";
function playlistHeader(playlist) {
    const totalSongs = playlist.total_tracks;

    const hasImage =
        playlist.image_url &&
        playlist.image_url !== "null" &&
        playlist.image_url !== "";

    return `
    <section class="playlist-header">

        <div class="playlist-image-wrapper ${hasImage ? "has-image" : ""}">
            <input
                type="file"
                id="playlist-file"
                hidden
            />

            <div class="playlist-form-none-image">
                <button><i class="fa-brands fa-itunes-note"></i></button>
            </div>

             <div class="playlist-image-hover">
                <div class="playlist-image-hover-content">
                    <i class="bi bi-pencil"></i>
                    <p>Choose photo</p>
                </div>
            </div>

            ${
                hasImage
                    ? `
                <img
                    class="playlist-preview-image"
                    src="${playlist.image_url}"
                    alt="${playlist.name}"
                />
            `
                    : ""
            }
        </div>

        <div class="playlist-info">
            <span>Playlist</span>

            <h1
                class="playlist-title"
                data-id="${playlist.id}"
            >
                ${playlist.name}
            </h1>

            <p class="playlist-description">
                ${playlist.description || ""}
            </p>
            <p class="playlist-description">
                <a href="#/me" class="playlist-username">${playlist.user_display_name || "me"}</a> • ${totalSongs} 
                ${totalSongs > 1 ? "songs" : "song"}, ${formatDurationFullText(playlist.total_duration)}
            </p>
        </div>

    </section>
    `;
}

export default playlistHeader;
