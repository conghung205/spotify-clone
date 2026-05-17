import artistControls from "../components/artistControls.js";
function artistPage() {
    return `
     <div class="content-wrapper">
        <div class="hero-artist-container"></div>
        ${artistControls()}
        <div class="artist-tracks-container"></div>
    </div>`;
}

export default artistPage;
