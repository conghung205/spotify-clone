import renderPlaylistItem from "./renderPlaylistItem.js";
function renderPlaylistSidebar(playlists) {
    console.log(playlists);

    const container = document.querySelector(".library-content");

    const html = playlists
        .map((playlist) => renderPlaylistItem(playlist))
        .join("");

    container.insertAdjacentHTML("beforeend", html);
}

export default renderPlaylistSidebar;
