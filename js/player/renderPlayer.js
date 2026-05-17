import formatDuration from "../utils/formatDuration.js";
function renderPlayer(track) {
    const image = document.querySelector(".player-image");
    const title = document.querySelector(".player-title");
    const artist = document.querySelector(".player-artist");
    const timeStart = document.querySelector(".time-start");
    const timeEnd = document.querySelector(".time-end");
    const progress = document.querySelector(".progress-fill");

    image.src = track.image_url;
    title.textContent = track.title;
    artist.textContent = track.artist_name;
    timeEnd.textContent = formatDuration(track.duration);
    timeStart.textContent = formatDuration(0);
    progress.style.width = "0";
}
export default renderPlayer;
