import httpRequest from "./httpRequest.js";

export async function getMySavedAlbums() {
    return await httpRequest.get("/me/albums/liked?limit=20&offset=0");
}
