import albumControls from "../components/albumControls.js";

function albumPage(album) {
    return `
    <div class="content-wrapper">
        <div class="hero-album-container"></div>
        ${albumControls(album)}
        <div class="album-tracks-container"></div>
    </div>`;
}

export default albumPage;
