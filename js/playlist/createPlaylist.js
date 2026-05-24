import httpRequest from "../api/httpRequest.js";
import renderPlaylistItem from "./renderPlaylistItem.js";

async function createPlaylist() {
    try {
        const container = document.querySelector(".library-content");
        const resPlaylists = await httpRequest.get("/me/playlists");
        const playlists = resPlaylists.playlists;
        const playlistCount = playlists.length + 1;

        const res = await httpRequest.post("/playlists", {
            name: `My Playlist #${playlistCount}`,
        });
        const playlist = res.playlist;

        container.insertAdjacentHTML("beforeend", renderPlaylistItem(playlist));

        window.location.hash = `/playlists/${res.playlist.id}`;
    } catch (error) {
        console.log(error);
    }
}

export default createPlaylist;
