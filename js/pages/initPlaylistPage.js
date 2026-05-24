import playlistPage from "./playlistPage.js";
import initPlaylistHeader from "../playlist/initPlaylistHeader.js";
import initPlaylistModal from "../playlist/initPlaylistModal.js";
import { getPlaylist } from "../api/playlist.js";
import { syncSidebarActiveState } from "../playlist/initLibraryNavigation.js";

async function initPlaylistPage(playlistId) {
    const contentContainer = document.getElementById("content-container");

    const playlist = await getPlaylist(playlistId);

    contentContainer.innerHTML = playlistPage(playlist);

    initPlaylistHeader(playlist);
    initPlaylistModal(playlist);
    syncSidebarActiveState();
}

export default initPlaylistPage;
