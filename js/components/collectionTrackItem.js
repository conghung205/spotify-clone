import formatDate from "../utils/formatDate.js";
import formatDuration from "../utils/formatDuration.js";
function collectionTrackItem(track, index) {
    // console.log(track);

    const title = track.track_title || track.title || "Unknown Title";
    const imageUrl =
        track.track_image_url ||
        track.image_url ||
        track.album_cover_image_url ||
        "";
    const duration = track.track_duration || track.duration || 0;
    const audioUrl = track.track_audio_url || track.audio_url || "";

    return `
        <tr class="collection-row" 
            data-index="${index}" 
            data-id="${track.track_id || track.id || ""}" 
            data-audio="${audioUrl}"
            data-duration="${track.track_duration || track.duration || 0}">
            
            <td class="cl-cell-number">
                <span class="track-num-text">${index + 1}</span>
                <div><i class="fa-solid fa-volume-high playing-icon"></i></div>
            </td>
            
            <td class="cl-cell-title">
                <div class="cl-title-container">
                    <div class="cl-image">
                        ${imageUrl ? `<img src="${imageUrl}?height=40&width=40" alt="${title}" />` : '<div class="pl-no-image"></div>'}
                    </div>
                    <div class="pl-info">
                        <div class="cl-name">${title}</div>
                        <div class="cl-artist">${track.artist_name || "Unknown Artist"}</div>
                    </div>
                </div>
            </td>
            
            <td class="cl-cell-date">
                ${formatDate(track.saved_at)}
            </td>
            
            <td class="cl-cell-duration">
                ${formatDuration(duration)}
            </td>
            
            <td class="cl-cell-menu">
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
            </td>
            
        </tr>`;
}

export default collectionTrackItem;
