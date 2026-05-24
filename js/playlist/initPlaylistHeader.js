import { openPlaylistModal } from "./modalController.js";

function initPlaylistHeader(playlist) {
    const header = document.querySelector(".playlist-header-container");

    if (!header) return;

    header.addEventListener("click", (e) => {
        // click image
        const image = e.target.closest(".playlist-image-wrapper");

        if (image) {
            openPlaylistModal(playlist);

            const fileInput = document.querySelector("#playlist-file");

            fileInput.click();

            return;
        }

        // click title
        const title = e.target.closest(".playlist-title");

        if (title) {
            openPlaylistModal(playlist);
        }
    });
}

export default initPlaylistHeader;
