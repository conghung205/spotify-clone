import httpRequest from "./httpRequest.js";

export async function getMyLikeTracks() {
    return await httpRequest.get("/me/tracks/liked?limit=20&offset=0");
}
