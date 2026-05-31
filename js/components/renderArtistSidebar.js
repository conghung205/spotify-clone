import artistItem from "./artistItem.js";

function renderArtistSidebar(artists, isAppend = false) {
    const container = document.querySelector(".library-content");

    if (!container) return;

    const html = artists.map((artist) => artistItem(artist)).join("");

    if (isAppend) {
        container.innerHTML += html;
    } else {
        container.innerHTML = html;
    }
}

export default renderArtistSidebar;
