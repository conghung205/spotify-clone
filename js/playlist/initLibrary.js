import httpRequest from "../api/httpRequest.js";
import renderPlaylistSidebar from "./renderPlaylistSidebar.js";

async function initLibrary() {
    try {
        const res = await httpRequest.get("/me/playlists");

        renderPlaylistSidebar(res.playlists);
    } catch (error) {
        if (error?.status === 401 || error?.response?.status === 401) {
            renderPlaylistSidebar([]);
        } else {
            console.error(error);
        }
    }
}
export default initLibrary;
