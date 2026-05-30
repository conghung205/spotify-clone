import renderPlaylistItem from "./renderPlaylistItem.js";
function renderPlaylistSidebar(items, isAppend = false) {
    const container = document.querySelector(".library-content");

    const html = items.map((item) => renderPlaylistItem(item)).join("");

    if (isAppend) {
        container.innerHTML += html;
    } else {
        container.innerHTML = html;
    }
}

export default renderPlaylistSidebar;
