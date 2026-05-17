import httpRequest from "../api/httpRequest.js";
import artistPage from "./artistPage.js";
import artistHero from "../components/artistHero.js";
import artistTracks from "../components/artistTracks.js";

async function initArtistPage(artistId) {
    const app = document.getElementById("app");
    app.innerHTML = artistPage();

    const heroContainer = document.querySelector(".hero-artist-container");
    const tracksContainer = document.querySelector(".artist-tracks-container");

    const artist = await httpRequest.get(`/artists/${artistId}`);
    const tracksRes = await httpRequest.get(
        `/artists/${artistId}/tracks/popular`,
    );
    const tracksList = tracksRes.tracks;

    heroContainer.innerHTML = artistHero(artist);
    tracksContainer.innerHTML = artistTracks(tracksList);
}
export default initArtistPage;
