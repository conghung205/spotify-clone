import { updatePlaylist } from "../api/playlist.js";
import { toast } from "../components/toast.js";

export function openRenameModal(playlistId, currentName, onSuccessCallback) {
    const modal = document.getElementById("rename-playlist-modal");
    const input = modal.querySelector(".rename-playlist-input");
    const btnSave = modal.querySelector(".btn-rename-save");
    const btnCancel = modal.querySelector(".btn-rename-cancel");

    if (!modal || !input) return;

    input.value = currentName;
    modal.classList.add("show");
    input.focus();

    const closeRenameModal = () => {
        modal.classList.remove("show");

        btnSave.onclick = null;
        btnCancel.onclick = null;
    };

    // Save
    btnSave.onclick = async () => {
        const newName = input.value.trim();

        if (!newName) return;

        // Nếu không thay đổi gì thì đóng modal
        if (newName === currentName) {
            closeRenameModal();
            return;
        }

        try {
            // Gọi API lưu tên mới lên server
            await updatePlaylist(playlistId, { name: newName });

            // Bắn dữ liệu về cho nơi gọi để update UI
            if (typeof onSuccessCallback === "function") {
                onSuccessCallback(newName);
            }

            closeRenameModal();
            toast({
                type: "success",
                title: "Success",
                message: "Name change successful",
            });
        } catch (error) {
            console.error("Error renaming playlist:", error);
        }
    };

    // Cancel
    btnCancel.onclick = closeRenameModal;

    // click ngoài vùng content
    modal.onclick = (e) => {
        if (e.target === modal) closeRenameModal();
    };
}
