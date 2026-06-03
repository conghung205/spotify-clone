import createPlaylist from "./createPlaylist.js";

function initCreatePlaylist() {
    document.addEventListener("click", async (e) => {
        if (e.target.closest(".create-btn, #nav-create-mobile")) {
            e.preventDefault();
            await createPlaylist();
        }
    });
}

export default initCreatePlaylist;
