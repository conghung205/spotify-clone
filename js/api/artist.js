import httpRequest from "./httpRequest.js";

export async function getUserFollowArtists() {
    return await httpRequest.get("/me/following?limit=20&offset=0");
}
