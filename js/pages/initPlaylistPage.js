import playlistPage from "./playlistPage.js";
import initPlaylistHeader from "../playlist/initPlaylistHeader.js";
import initPlaylistModal from "../playlist/initPlaylistModal.js";
import { getPlaylist, getPlaylistTracks } from "../api/playlist.js";
import httpRequest from "../api/httpRequest.js";
import { syncSidebarActiveState } from "../playlist/syncSidebarActiveState.js";
import playlistContentTracks from "../components/playlistContentTracks.js";
import { initPlaylistSearch } from "../playlist/initPlaylistSearch.js";
import initPlayTrack from "../playlist/initPlayTrack.js";
import { syncUIState } from "../utils/syncUIState.js";
import initPlaylistContextMenu from "../playlist/initPlaylistContextMenu.js";

async function initPlaylistPage(playlistId) {
    const contentContainer = document.getElementById("content-container");

    try {
        const [playlist, tracksResponse] = await Promise.all([
            getPlaylist(playlistId),
            getPlaylistTracks(playlistId),
        ]);

        let currentTracks = tracksResponse.tracks || [];

        contentContainer.innerHTML = playlistPage(playlist);

        initPlaylistHeader(playlist);
        initPlaylistModal(playlist);
        syncSidebarActiveState();

        renderMainTracks(currentTracks);

        initPlaylistContextMenu((deletedTrackId) => {
            currentTracks = currentTracks.filter(
                (track) => track.track_id !== deletedTrackId,
            );

            renderMainTracks(currentTracks);
        });

        // Kích hoạt module Search & Recommended
        initPlaylistSearch(playlistId, currentTracks, async (playlistTrack) => {
            const freshTrackObj = await httpRequest.get(
                `/tracks/${playlistTrack.track_id}`,
            );

            const formattedTrack = {
                track_id: freshTrackObj.id,
                track_title: freshTrackObj.title,
                track_image_url: freshTrackObj.image_url,
                artist_name: freshTrackObj.artist_name,
                track_duration: freshTrackObj.duration,
                track_album: freshTrackObj.album_title,
                added_at: playlistTrack.added_at,
                track_audio_url:
                    freshTrackObj.audio_url ||
                    freshTrackObj.track_audio_url ||
                    "",
            };

            currentTracks.push(formattedTrack);

            // Render
            renderMainTracks(currentTracks);
        });
    } catch (error) {
        console.error("Lỗi khi khởi tạo trang playlist:", error);
        contentContainer.innerHTML = `<div class="error-msg" style="color: red; padding: 20px;">Đã xảy ra lỗi khi tải dữ liệu playlist.</div>`;
    }
}

function renderMainTracks(tracks) {
    const playlistContent = document.querySelector(".playlist-content");
    if (!playlistContent) return;

    if (tracks.length === 0) {
        playlistContent.innerHTML = `<div class="no-songs">No songs yet</div>`;
        return;
    }

    playlistContent.innerHTML = playlistContentTracks(tracks);
    initPlayTrack();
    syncUIState();
}

export default initPlaylistPage;
