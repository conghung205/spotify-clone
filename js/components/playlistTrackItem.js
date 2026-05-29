import formatDuration from "../utils/formatDuration.js";
import formatDate from "../utils/formatDate.js";

function playlistTrackItem(track, index) {
    const title = track.track_title || track.title || "Unknown Title";
    const imageUrl =
        track.track_image_url ||
        track.image_url ||
        track.album_cover_image_url ||
        "";
    const duration = track.track_duration || track.duration || 0;
    const audioUrl = track.track_audio_url || track.audio_url || "";

    return `
    <tr class="playlist-row" 
        data-index="${index}" 
        data-id="${track.track_id || track.id || ""}" 
        data-audio="${audioUrl}"
        data-duration="${track.track_duration || track.duration || 0}">
        
        <td class="pl-cell-number">
            <span class="track-num-text">${index + 1}</span>
            <div><i class="fa-solid fa-volume-high playing-icon"></i></div>
        </td>
        
        <td class="pl-cell-title">
            <div class="pl-title-container">
                <div class="pl-image">
                    ${imageUrl ? `<img src="${imageUrl}?height=40&width=40" alt="${title}" />` : '<div class="pl-no-image"></div>'}
                </div>
                <div class="pl-info">
                    <div class="pl-name">${title}</div>
                    <div class="pl-artist">${track.artist_name || "Unknown Artist"}</div>
                </div>
            </div>
        </td>
        
        <td class="pl-cell-date">
            ${formatDate(track.added_at)}
        </td>
        
        <td class="pl-cell-duration">
            ${formatDuration(duration)}
        </td>
        
        <td class="pl-cell-menu">
            <button class="pl-menu-btn"><i class="fas fa-ellipsis-h"></i></button>
        </td>
        
    </tr>`;
}

export default playlistTrackItem;
