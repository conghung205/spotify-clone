import formatDuration from "../utils/formatDuration.js";
function renderPlayer(track) {
    const image = document.querySelector(".player-image");
    const title = document.querySelector(".player-title");
    const artist = document.querySelector(".player-artist");
    const timeEnd = document.querySelector(".time-end");

    image.src = track.image_url;
    title.textContent = track.title;
    artist.textContent = track.artist_name;
    timeEnd.textContent = formatDuration(track.duration);
}
export default renderPlayer;
