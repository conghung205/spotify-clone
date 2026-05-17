import albumControls from "../components/albumControls.js";

function albumPage() {
    return `
    <div class="content-wrapper">
        <div class="hero-album-container"></div>
        ${albumControls()}
        <div class="album-tracks-container"></div>
    </div>`;
}

export default albumPage;
