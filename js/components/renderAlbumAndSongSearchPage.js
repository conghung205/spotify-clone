import albumAndSongItemSearchPage from "./albumAndSongItemSearchPage.js";

function renderAlbumAndSongSearchPage(items, isAppend = false) {
    const container = document.querySelector(".search-page-content");

    if (!container) return;

    const html = items.map((item) => albumAndSongItemSearchPage(item)).join("");

    if (isAppend) {
        container.innerHTML += html;
    } else {
        container.innerHTML = html;
    }
}

export default renderAlbumAndSongSearchPage;
