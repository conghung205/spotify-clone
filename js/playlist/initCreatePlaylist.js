import createPlaylist from "./createPlaylist.js";

function initCreatePlaylist() {
    const createBtn = document.querySelector(".create-btn");

    if (!createBtn) return;

    createBtn.addEventListener("click", async () => {
        await createPlaylist();
    });
}

export default initCreatePlaylist;
