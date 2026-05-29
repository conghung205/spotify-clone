function suggestTrackItem(track) {
    return `
    <div class="track-item search-track-item" data-id="${track.track_id}">
        <div class="track-image">
            <img
                src="${track.track_image_url || "./assets/default-cover.png"}?height=40&width=40"
                alt="${track.track_title}"
            />
        </div>
        <div class="track-info">
            <div class="track-name">${track.track_title}</div>
            <div class="track-artist" style="font-size: 0.85rem; color: #b3b3b3; margin-top: 4px;">
                ${track.artist_name || "Unknown Artist"}
            </div>
        </div>
        
        <div class="track-actions" style="margin-left: auto; padding-right: 16px;">
            <button class="btn-add-track" data-id="${track.track_id}" 
                style="background: transparent; color: #fff; border: 1px solid #727272; padding: 4px 16px; border-radius: 50px; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s;">
                Add
            </button>
        </div>
    </div>`;
}

export default suggestTrackItem;
