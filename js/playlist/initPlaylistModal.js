import updatePlaylistHeader from "./updatePlaylistHeader.js";
import { handleUpdatePlaylistFlow } from "./playlistService.js";
import updatePlaylistItemInSidebar from "./updatePlaylistItemInSidebar.js";
import {
    closePlaylistModal,
    setupModalCloseEvents,
} from "./modalController.js";

function initPlaylistModal(playlist) {
    const modal = document.getElementById("playlist-modal");
    if (!modal) return;

    // Dom Elements
    const playlistImage = modal.querySelector(".playlist-form-image");
    const btnCloseModal = modal.querySelector(".playlist-modal-close");
    const playlistName = modal.querySelector(".playlist-name-input");
    const playlistDesc = modal.querySelector(".playlist-description-input");
    const playlistImageInput = modal.querySelector(".playlist-image-input");
    const previewImage = modal.querySelector(".playlist-preview-image");
    const playlistForm = modal.querySelector(".playlist-form");

    // Khởi tạo giá trị ban đầu cho Form
    const DEFAULT_PLAYLIST_IMAGE = "path/to/your/default-playlist-cover.png";
    playlistName.value = playlist.name;
    playlistDesc.value = playlist.description;
    previewImage.src = playlist.image_url;

    if (playlist.image_url) {
        playlistImage.classList.add("has-image");
    } else {
        playlistImage.classList.remove("has-image");
    }

    let selectedFile = null;

    // Gán các sự kiện đóng modal cơ bản từ controller
    setupModalCloseEvents(modal, btnCloseModal);

    // Click trigger chọn file ảnh
    playlistImageInput.addEventListener("click", (e) => e.stopPropagation());
    playlistImage.addEventListener("click", (e) => {
        if (e.target !== playlistImageInput) playlistImageInput.click();
    });

    // Sự kiện lắng nghe khi người dùng chọn ảnh mới để Preview
    playlistImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        selectedFile = file;
        const reader = new FileReader();
        reader.onload = (event) => {
            previewImage.src = event.target.result;
            playlistImage.classList.add("has-image");
        };
        reader.readAsDataURL(file);
    });

    // Sự kiện Submit Form
    playlistForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formDataFields = {
            name: playlistName.value,
            description: playlistDesc.value,
        };

        try {
            // Gọi hàm xử lý luồng API đã bóc tách
            const res = await handleUpdatePlaylistFlow(
                playlist.id,
                playlist.image_url,
                formDataFields,
                selectedFile,
            );

            // Cập nhật lại giao diện
            updatePlaylistHeader(res.playlist);
            updatePlaylistItemInSidebar(res.playlist);

            // Reset và đóng modal
            selectedFile = null;
            closePlaylistModal();
        } catch (error) {
            console.error("=== LỖI TRONG QUY TRÌNH ===");
            console.error("Chi tiết lỗi:", error.response || error.message);
        }
    });
}

export default initPlaylistModal;
