import profilePage from "./profilePage.js";
import httpRequest from "../api/httpRequest.js";

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
                        <input type="text" id="input-profile-edit" value="${user.display_name || ""}" placeholder="Nhập tên hiển thị của bạn..." />
                    </div>
                `;
            } else if (rowId === "row-username") {
                currentEditType = "username";
                modalTitle.textContent = "Edit username";
                modalBody.innerHTML = `
                    <div class="input-group">
                        <label>New username</label>
                        <input type="text" id="input-profile-edit" value="${user.username || ""}" placeholder="Ví dụ: conghung_205..." />
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

                // Xử lý xem trước ảnh (Preview) ngay lập tức khi user chọn file
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

        // LOGIC ĐÓNG MODAL
        const closeModal = () => {
            modal.style.display = "none";
            modalBody.innerHTML = "";
            currentEditType = null;
            currentSelectedFile = null;
        };

        document.getElementById("btn-close-profile-modal").onclick = closeModal;
        document.getElementById("btn-cancel-profile-modal").onclick =
            closeModal;

        // 5. LOGIC GỬI DỮ LIỆU LÊN API KHI BẤM NÚT LƯU
        document.getElementById("btn-save-profile-modal").onclick =
            async () => {
                if (!currentEditType) return;

                try {
                    // Trường hợp sửa Text (display_name hoặc username)
                    if (
                        currentEditType === "display_name" ||
                        currentEditType === "username"
                    ) {
                        const inputValue = document
                            .getElementById("input-profile-edit")
                            .value.trim();
                        if (!inputValue) {
                            alert("Vui lòng không để trống thông tin!");
                            return;
                        }

                        // Gọi API cập nhật dạng JSON thông thường
                        await httpRequest.put("/users/me", {
                            [currentEditType]: inputValue,
                        });
                    }
                    // Trường hợp upload file ảnh Avatar
                    else if (currentEditType === "avatar") {
                        if (!currentSelectedFile) {
                            alert("Bạn chưa chọn ảnh mới nào cả!");
                            return;
                        }

                        // --- BƯỚC 1: GỬI FILE LÊN API UPLOAD ĐỂ LẤY LINK URL ---
                        const formData = new FormData();
                        formData.append("avatar", currentSelectedFile); // key 'avatar' phải khớp với yêu cầu của backend/multer

                        // Gọi API POST tới endpoint upload từ Postman của bạn
                        // (Lưu ý: tùy thuộc vào cách bạn viết helper httpRequest, endpoint có thể là "/upload/avatar" hoặc "/api/upload/avatar")
                        const uploadRes = await httpRequest.post(
                            "/upload/avatar",
                            formData,
                        );

                        // Giả sử API upload thành công trả về object có chứa link ảnh, ví dụ: uploadRes.fileUrl hoặc uploadRes.url
                        // Bạn hãy check lại log hoặc Postman xem key trả về chính xác tên là gì nhé, ở đây mình ví dụ là uploadRes.url
                        const relativePath = uploadRes.file?.url;

                        if (!relativePath) {
                            throw new Error(
                                "Không nhận được URL ảnh từ server upload!",
                            );
                        }

                        // Ghép thêm Domain Server của bạn vào để biến nó thành một Absolute URL hợp lệ
                        const uploadedImageUrl = `https://spotify.f8team.dev${relativePath}`;

                        // --- BƯỚC 2: CÓ URL RỒI, GỬI TIẾP API CẬP NHẬT THÔNG TIN USER ---
                        await httpRequest.put("/users/me", {
                            avatar_url: uploadedImageUrl,
                        });
                    }

                    // Thành công -> Đóng modal và re-init lại trang để lấy data mới tinh từ server về render lại UI
                    closeModal();
                    await initProfilePage();

                    const freshRes = await httpRequest.get("/users/me");
                    const freshUser = freshRes.user;

                    // Bước 3: Tìm các phần tử trên Header và cập nhật trực tiếp giá trị mới
                    const userNameEl = document.getElementById("user-name");
                    const userAvatarEl = document.getElementById("user-avatar");

                    if (userNameEl)
                        userNameEl.textContent =
                            freshUser.display_name || freshUser.username;
                    if (userAvatarEl)
                        userAvatarEl.src =
                            freshUser.avatar_url ||
                            "placeholder.svg?height=32&width=32";
                } catch (apiError) {
                    console.error(apiError);
                }
            };
    } catch (error) {
        console.log(error);
    }
}

export default initProfilePage;
