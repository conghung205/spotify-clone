import initHomePage from "../pages/initHomePage.js";
import initAlbumPage from "../pages/initAlbumPage.js";
import initArtistPage from "../pages/initArtistPage.js";
import initPlaylistPage from "../pages/initPlaylistPage.js";
import { initSearchPage } from "../pages/initSearchPage.js";
import initCollectionPage from "../pages/initCollectionPage.js";

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
    } else if (hash.startsWith("#/search")) {
        // vd: "#/search?q=yêu" => ["#/search", "q=yêu"]
        const parts = hash.split("?");

        let query = "";

        if (parts[1]) {
            const urlParams = new URLSearchParams(parts[1]);
            query = urlParams.get("q") || "";
        }

        initSearchPage(query);
    } else if (hash.startsWith("#/collection/")) {
        initCollectionPage();
    }
}

export default router;
