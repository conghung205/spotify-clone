import renderPlaylistItem from "./renderPlaylistItem.js";
function renderPlaylistSidebar(
    items,
    isAppend = false,
    wrapper = ".library-content",
) {
    const container =
        typeof wrapper === "string" ? document.querySelector(wrapper) : wrapper;

    if (!container) return;

    const html = items.map((item) => renderPlaylistItem(item)).join("");

    if (isAppend) {
        container.innerHTML += html;
    } else {
        container.innerHTML = html;
    }
}

export default renderPlaylistSidebar;
