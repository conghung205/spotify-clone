import suggestTrackItem from "./suggestTrackItem.js";
function playlistSearchResult(tracks) {
    return `
    
        <div class="search-results-list">
            ${tracks.map((track) => suggestTrackItem(track)).join("")}
        </div>
    `;
}
export default playlistSearchResult;
