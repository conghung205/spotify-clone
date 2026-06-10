import profilePage from "./profilePage.js";
import httpRequest from "../api/httpRequest.js";
import { toast } from "../components/toast.js";
import authState from "../auth/authState.js";
import { initSidebarController } from "../pages/initSidebarController.js";
import { sanitize } from "../utils/sanitize.js";

let currentEditType = null;
let currentSelectedFile = null;

async function initProfilePage() {
    const contentContainer = document.getElementById("content-container");
    if (!contentContainer) return;

    try {
        const res = await httpRequest.get("/users/me");
        const user = res.user;

        contentContainer.innerHTML = profilePage(user);

        // Modal elements
        const infoGroupBox = document.querySelector(".info-group-box");
        const modal = document.getElementById("profile-edit-modal");
        const modalBody = document.getElementById("profile-modal-body");
        const modalTitle = document.getElementById("modal-title");

        if (!infoGroupBox || !modal || !modalBody) return;

        infoGroupBox.addEventListener("click", (e) => {
            const row = e.target.closest(".info-row");
            if (!row) return;

            const rowId = row.getAttribute("id");
            modal.style.display = "flex";

            if (rowId === "row-display-name") {
                currentEditType = "display_name";
                modalTitle.textContent = "Edit display name";
                modalBody.innerHTML = `
                    <div class="input-group">
                        <label>New display name</label>
                        <input type="text" id="input-profile-edit" value="${sanitize(user.display_name) || ""}" placeholder="Nhập tên hiển thị của bạn..." />
                    </div>
                `;
            } else if (rowId === "row-avatar") {
                currentEditType = "avatar";
                currentSelectedFile = null;
                modalTitle.textContent = "Update your profile picture";
                modalBody.innerHTML = `
                    <div class="avatar-upload-box">
                        <div class="modal-avatar-preview">
                            <img src="${user.avatar_url || "placeholder.svg?height=32&width=32"}" id="modal-preview-img" />
                        </div>
                        <label for="modal-file-input" class="btn-select-file">Select a photo from your device</label>
                        <input type="file" id="modal-file-input" accept="image/*" style="display: none;" />
                    </div>
                `;

                // Xử lý xem trước ảnh ngay lập tức khi user chọn file
                const fileInput = document.getElementById("modal-file-input");
                fileInput.addEventListener("change", (event) => {
                    const file = event.target.files[0];
                    if (file) {
                        currentSelectedFile = file;
                        const previewImg =
                            document.getElementById("modal-preview-img");
                        previewImg.src = URL.createObjectURL(file);
                    }
                });
            }
        });

        // closeModal
        const closeModal = () => {
            modal.style.display = "none";
            modalBody.innerHTML = "";
            currentEditType = null;
            currentSelectedFile = null;
        };

        document.getElementById("btn-close-profile-modal").onclick = closeModal;
        document.getElementById("btn-cancel-profile-modal").onclick =
            closeModal;

        // save
        document.getElementById("btn-save-profile-modal").onclick =
            async () => {
                if (!currentEditType) return;

                try {
                    // display_name or username
                    if (currentEditType === "display_name") {
                        const inputValue = document
                            .getElementById("input-profile-edit")
                            .value.trim();
                        if (!inputValue) {
                            toast({
                                type: "error",
                                title: "Error",
                                message:
                                    "Please do not leave any information blank!",
                            });
                            return;
                        }

                        // update display_name or username
                        await httpRequest.put("/users/me", {
                            [currentEditType]: sanitize(inputValue),
                        });
                    }
                    // upload file image Avatar
                    else if (currentEditType === "avatar") {
                        if (!currentSelectedFile) {
                            toast({
                                type: "error",
                                title: "error",
                                message:
                                    "You haven't selected any new photos yet.",
                            });
                            return;
                        }

                        // gửi file lên api để lấy link url
                        const formData = new FormData();
                        formData.append("avatar", currentSelectedFile);

                        const uploadRes = await httpRequest.post(
                            "/upload/avatar",
                            formData,
                        );

                        // nhận link ảnh
                        const relativePath = uploadRes.file?.url;

                        if (!relativePath) {
                            throw new Error(
                                "Không nhận được URL ảnh từ server upload!",
                            );
                        }

                        // Ghép thêm Domain Server để thành một Absolute URL hợp lệ
                        const uploadedImageUrl = `https://spotify.f8team.dev${relativePath}`;

                        // update info user
                        await httpRequest.put("/users/me", {
                            avatar_url: uploadedImageUrl,
                        });

                        toast({
                            type: "success",
                            title: "Success",
                            message:
                                "You have successfully updated your profile picture.",
                        });
                    }

                    // Đóng modal và re-init lại trang để lấy data mới từ server về render lại UI
                    closeModal();

                    const freshUser = await initProfilePage();

                    if (typeof initSidebarController === "function") {
                        await initSidebarController();
                    }

                    // update state
                    authState.setUser(freshUser);

                    // update header
                    const userAvatarEl = document.getElementById("user-avatar");

                    if (userAvatarEl)
                        userAvatarEl.src =
                            freshUser.avatar_url ||
                            "placeholder.svg?height=32&width=32";
                } catch (apiError) {
                    console.error(apiError);
                }
            };

        return user;
    } catch (error) {
        console.log(error);
    }
}

export default initProfilePage;
