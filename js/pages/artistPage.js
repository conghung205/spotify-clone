import artistControls from "../components/artistControls.js";
function artistPage(artist) {
    return `
     <div class="content-wrapper">
        <div class="hero-artist-container"></div>
        ${artistControls(artist)}
        <div class="artist-tracks-container"></div>
    </div>`;
}

export default artistPage;
