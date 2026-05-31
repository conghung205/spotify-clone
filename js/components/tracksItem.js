import formatDuration from "../utils/formatDuration.js";
function tracksItem(track, index) {
    return `
    <div class="track-item" data-index="${index}">
        <div class="track-number">${index + 1}</div>
        <div class="track-image">
            <img
                src="${track.image_url}?height=40&width=40"
                alt="${track.title}"
            />
        </div>
        <div class="track-info">
            <div class="track-name">
                ${track.title}
            </div>
        </div>
        <div class="track-plays">27,498,341</div>
        <div class="track-duration">${formatDuration(track.duration)}</div>
        <button 
            class="btn-like-track ${track.is_liked ? "liked" : ""}"
            data-id="${track.id}" 
            data-type="song">
            ${
                track.is_liked
                    ? '<i class="bi bi-check-circle-fill icon-check"></i>'
                    : '<i class="bi bi-plus-circle icon-like"></i>'
            }
        </button>
        
    </div>`;
}
export default tracksItem;
