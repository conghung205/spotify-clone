import httpRequest from "../api/httpRequest.js";
import { updatePlaylist } from "../api/playlist.js";

export async function handleUpdatePlaylistFlow(
    playlistId,
    currentImageUrl,
    formDataFields,
    selectedFile,
) {
    const updateData = {
        name: formDataFields.name,
        description: formDataFields.description,
        image_url: currentImageUrl,
    };

    // Upload ảnh nếu có file mới
    if (selectedFile) {
        const formData = new FormData();
        formData.append("cover", selectedFile);

        const uploadData = await httpRequest.post(
            `/upload/playlist/${playlistId}/cover`,
            formData,
        );

        if (uploadData && uploadData.file && uploadData.file.url) {
            updateData.image_url = `https://spotify.f8team.dev${uploadData.file.url}`;
        } else {
            console.warn(
                "Upload thành công nhưng cấu trúc trả về thiếu file.url",
            );
        }
    }

    const res = await updatePlaylist(playlistId, updateData);
    return res;
}
