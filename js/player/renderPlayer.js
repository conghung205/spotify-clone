import formatDuration from "../utils/formatDuration.js";
function renderPlayer(track) {
    const image = document.querySelector(".player-image");
    const title = document.querySelector(".player-title");
    const artist = document.querySelector(".player-artist");
    const timeEnd = document.querySelector(".time-end");

    const trackTitle = track.track_title || track.title || "Unknown Title";
    const trackImage =
        track.track_image_url ||
        track.image_url ||
        track.album_cover_image_url ||
        "";
    const trackDuration = track.track_duration || track.duration || 0;

    if (image) image.src = trackImage;
    if (title) title.textContent = trackTitle;
    if (artist) artist.textContent = track.artist_name || "Unknown Artist";
    if (timeEnd) timeEnd.textContent = formatDuration(trackDuration);
}
export default renderPlayer;
