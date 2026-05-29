import httpRequest from "./httpRequest.js";

export async function getPlaylist(id) {
    return await httpRequest.get(`/playlists/${id}`);
}

export async function updatePlaylist(id, data) {
    return await httpRequest.put(`/playlists/${id}`, data);
}

export async function createPlaylist(data) {
    return await httpRequest.post("/playlists", data);
}

export async function getMyPlaylists() {
    return await httpRequest.get("/me/playlists");
}
export async function deletePlaylist(id) {
    return await httpRequest.del(`/playlists/${id}`);
}

export async function getPlaylistTracks(id) {
    return await httpRequest.get(`/playlists/${id}/tracks`);
}
export async function addTracktoPlaylist(id, data) {
    return await httpRequest.post(`/playlists/${id}/tracks`, data);
}
export async function removeTrackFromPlaylist(playlistId, trackId) {
    return await httpRequest.del(`/playlists/${playlistId}/tracks/${trackId}`);
}
