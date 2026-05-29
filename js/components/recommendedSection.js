import suggestTrackItem from "./suggestTrackItem.js";

export default function recommendedSection(tracks) {
    return `
        <div id="recommended-wrapper" class="recommended-wrapper">
            <h3 class="recommended-title">Recommended</h3>
            <p class="recommended-subtitle">Based on what's in this playlist</p>
            <div class="suggest-tracks-list">
                ${tracks.map((track) => suggestTrackItem(track)).join("")}
            </div>
        </div>
    `;
}
