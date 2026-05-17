import httpRequest from "../api/httpRequest.js";
import artistPage from "./artistPage.js";
import artistHero from "../components/artistHero.js";
import artistTracks from "../components/artistTracks.js";
import playTrack from "../player/playTrack.js";

async function initArtistPage(artistId) {
    const contentContainer = document.getElementById("content-container");
    contentContainer.innerHTML = artistPage();

    const heroContainer = document.querySelector(".hero-artist-container");
    const tracksContainer = document.querySelector(".artist-tracks-container");

    const artist = await httpRequest.get(`/artists/${artistId}`);
    const tracksRes = await httpRequest.get(
        `/artists/${artistId}/tracks/popular`,
    );
    const tracksList = tracksRes.tracks;

    heroContainer.innerHTML = artistHero(artist);
    tracksContainer.innerHTML = artistTracks(tracksList);

    // addEventListener
    tracksContainer.addEventListener("click", (e) => {
        const trackItem = e.target.closest(".track-item");

        if (!trackItem) return;

        const index = trackItem.dataset.index;

        const track = tracksList[index];

        playTrack(track);
    });
}
export default initArtistPage;
