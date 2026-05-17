import httpRequest from "../api/httpRequest.js";
import popularAlbumItem from "./popularAlbumItem.js";

async function popularAlbums() {
    const popularAlbumsContainer = document.querySelector(".hits-grid");

    const res = await httpRequest.get("/albums/popular?limit=20");
    const albums = res.albums;

    const html = albums.map((album) => popularAlbumItem(album)).join("");

    popularAlbumsContainer.innerHTML = html;

    // event listener
    popularAlbumsContainer.addEventListener("click", (e) => {
        const albumItem = e.target.closest(".hit-card");

        if (albumItem) {
            const albumId = albumItem.dataset.id;
            window.location.hash = `/albums/${albumId}`;
        }
    });
}
export default popularAlbums;
