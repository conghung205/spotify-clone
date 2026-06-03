import artistItem from "./artistItem.js";

function renderArtistSidebar(
    artists,
    isAppend = false,
    wrapper = ".library-content",
) {
    const container =
        typeof wrapper === "string" ? document.querySelector(wrapper) : wrapper;

    if (!container) return;

    const html = artists.map((artist) => artistItem(artist)).join("");

    if (isAppend) {
        container.innerHTML += html;
    } else {
        container.innerHTML = html;
    }
}

export default renderArtistSidebar;
