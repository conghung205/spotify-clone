import httpRequest from "../api/httpRequest.js";
import renderPlaylistSidebar from "./renderPlaylistSidebar.js";
import initLibraryNavigation from "./initLibraryNavigation.js";

async function initLibrary() {
    try {
        const res = await httpRequest.get("/me/playlists");

        renderPlaylistSidebar(res.playlists);
        initLibraryNavigation();
    } catch (error) {
        console.log(error);
    }
}
export default initLibrary;
