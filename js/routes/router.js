import initHomePage from "../pages/initHomePage.js";
import initAlbumPage from "../pages/initAlbumPage.js";
import initArtistPage from "../pages/initArtistPage.js";
import initPlaylistPage from "../pages/initPlaylistPage.js";

function router() {
    const hash = window.location.hash || "#/";

    // homepage
    if (hash === "#/") {
        initHomePage();
    }

    // album detail
    else if (hash.startsWith("#/albums/")) {
        const parts = hash.split("/");

        const albumId = parts[2];

        initAlbumPage(albumId);
    }
    // artist detail
    else if (hash.startsWith("#/artists/")) {
        const parts = hash.split("/");

        const artistId = parts[2];

        initArtistPage(artistId);
    } else if (hash.startsWith("#/playlists/")) {
        const parts = hash.split("/");

        const playlistId = parts[2];

        initPlaylistPage(playlistId);
    }
}

export default router;
