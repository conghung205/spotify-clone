import playlistHeader from "../components/playlistHeader.js";

function updatePlaylistHeader(playlist) {
    const container = document.querySelector(".playlist-header-container");

    container.innerHTML = playlistHeader(playlist);
}

export default updatePlaylistHeader;
