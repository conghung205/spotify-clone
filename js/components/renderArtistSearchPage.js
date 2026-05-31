import artistItemSearchPage from "./artistItemSearchPage.js";

function renderArtistSearchPage(artists, isAppend = false) {
    const container = document.querySelector(".search-page-content");
    if (!container) return;

    const html = artists.map((artist) => artistItemSearchPage(artist)).join("");

    if (isAppend) {
        // Chỉ append chuỗi lớn này đúng 1 lần duy nhất thay vì lặp đi lặp lại
        container.insertAdjacentHTML("beforeend", html);
    } else {
        container.innerHTML = html;
    }
}

export default renderArtistSearchPage;
