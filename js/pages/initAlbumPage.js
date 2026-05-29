import httpRequest from "../api/httpRequest.js";
import albumPage from "./albumPage.js";
import albumHero from "../components/albumHero.js";
import albumTracks from "../components/albumTracks.js";
import playTrack from "../player/playTrack.js";
import { syncUIState } from "../utils/syncUIState.js";

async function initAlbumPage(albumId) {
    const contentContainer = document.getElementById("content-container");

    contentContainer.innerHTML = albumPage();

    syncUIState();

    // options display
    const options = document.querySelector(".options");
    const btnShuffle = document.querySelector("#btn-shuffle-album");
    const btnAddPlaylist = document.querySelector("#btn-add-playlist");


    btnAddPlaylist.addEventListener("click", () => {
        btnAddPlaylist.classList.toggle("active");
    });

    options.addEventListener("click", (e) => {
        e.stopPropagation();
        options.classList.add("show");
    });
    window.addEventListener("click", (e) => {
        if (!options.contains(e.target)) {
            options.classList.remove("show");
        }
    });

    const heroContainer = document.querySelector(".hero-album-container");
    const tracksContainer = document.querySelector(".album-tracks-container");

    const album = await httpRequest.get(`/albums/${albumId}`);
    const tracksRes = await httpRequest.get(`/albums/${albumId}/tracks`);
    const tracksList = tracksRes.tracks;

    heroContainer.innerHTML = albumHero(album);
    tracksContainer.innerHTML = albumTracks(tracksList);

    // addEventListener
    tracksContainer.addEventListener("click", (e) => {
        const trackItem = e.target.closest(".track-item");

        if (!trackItem) return;

        const index = Number(trackItem.dataset.index);

        playTrack(tracksList, index);
    });
}

export default initAlbumPage;
