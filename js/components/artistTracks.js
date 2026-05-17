import tracksItem from "./tracksItem.js";

function artistTracks(tracksList) {
    return `
    <section class="popular-section">
        <h2 class="section-title">Popular</h2>
        <div class="track-list">
            ${tracksList.map((tracks, index) => tracksItem(tracks, index)).join("")}
        </div>
    </section>`;
}

export default artistTracks;
